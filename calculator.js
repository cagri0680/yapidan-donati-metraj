/* Bağımsız eğitim örneği. Standart/ürün uygunluğu denetimi değildir. */
(function (root) {
  'use strict';
  const DENSITY = 7850;
  function number(value, label) {
    if (typeof value === 'number') {
      if (!Number.isFinite(value)) throw new Error(label + ': sonlu bir sayı girin.');
      return value;
    }
    if (typeof value !== 'string' || value.trim() === '') throw new Error(label + ': alan boş bırakılamaz.');
    const raw = value.trim();
    if (!/^[+-]?(?:\d+(?:[.,]\d+)?|[.,]\d+)$/.test(raw)) {
      throw new Error(label + ': binlik ayırıcı kullanmadan sayı girin. Ondalık için virgül veya nokta kullanın.');
    }
    if (/^[+-]?[1-9]\d{0,2}[.,]\d{3}$/.test(raw)) {
      const bin = raw.replace(/[.,]/g, '');
      const ond = String(Number(raw.replace(',', '.'))).replace('.', ',');
      const ondTemiz = !/^[+-]?[1-9][0-9]{0,2}[.,][0-9]{3}$/.test(ond);
      throw new Error(label + ': "' + raw + '" belirsiz. Bin için ' + bin +
        (ondTemiz ? ', ondalık için ' + ond : ', ondalık için daha küçük birim') + ' yazın.');
    }
    const n = Number(raw.replace(',', '.'));
    if (!Number.isFinite(n)) throw new Error(label + ': geçerli bir sayı girin.');
    return n;
  }
  function calculate(input) {
    if (!input || typeof input !== 'object') throw new Error('Girdi nesnesi gerekli.');
    const d = number(input.diameter_mm, 'Çap');
    const length = number(input.length, 'Boy');
    const count = number(input.count, 'Adet');
    const factors = {mm: 0.001, cm: 0.01, m: 1};
    if (!Object.prototype.hasOwnProperty.call(factors, input.length_unit)) throw new Error('Boy birimi m, cm veya mm olmalıdır.');
    const length_m = length * factors[input.length_unit];
    if (d <= 0 || d > 1000) throw new Error('Bu eğitim demosunda çap 0’dan büyük ve en fazla 1.000 mm olmalıdır.');
    if (length_m <= 0 || length_m > 10000) throw new Error('Bu eğitim demosunda boy 0’dan büyük ve en fazla 10.000 m olmalıdır.');
    if (!Number.isInteger(count) || count < 1 || count > 1000000) throw new Error('Adet 1 ile 1.000.000 arasında tam sayı olmalıdır.');
    const diameter_m = d / 1000;
    const area_m2 = Math.PI * diameter_m * diameter_m / 4;
    const kg_per_m = area_m2 * DENSITY;
    const single_kg = kg_per_m * length_m;
    const total_kg = single_kg * count;
    if (![diameter_m, area_m2, kg_per_m, single_kg, total_kg].every(x => Number.isFinite(x) && x > 0)) throw new Error('Hesap aralığı aşıldı; değerler gösterilemeyecek kadar küçük veya büyük.');
    return {diameter_mm:d, diameter_m, length_m, count, density_kg_m3:DENSITY, area_m2, kg_per_m, single_kg, total_kg, origin:'synthetic_calculated', model_version:'1.0.0'};
  }
  const api = Object.freeze({calculate, number, DENSITY});
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.RebarDemo = api;
})(typeof window !== 'undefined' ? window : globalThis);
