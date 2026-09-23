# Donatı birim kontrolü — bağımsız eğitim örneği

`index.html` dosyasını tarayıcıda açabilirsiniz. Yerel sunucu için bu klasörde `python -m http.server 8000` komutunu kullanıp localhost:8000 adresine geçebilirsiniz. Uygulama internet veya API gerektirmez; kaynak bağlantısı dış siteye gider.

## Kullanım
Çap mm, boy m/cm/mm, adet pozitif tamsayıdır. Ondalık için nokta veya virgül kabul edilir. Binlik ayırıcı kabul edilmez. Çap üst sınırı 1000 mm, boy 10000 m, adet 1000000 bu eğitim arayüzünün sayısal sınırlarıdır. Binlik ayırıcı kabul edilmez; "1.000" gibi belirsiz yazımlar reddedilir ve nasıl yazılacağı söylenir; mühendislik tavsiyesi değildir.

Hesap `m = π/4 × (d/1000)² × 7850 × L × n`. Sonuç teorik kütledir. Ø12, 12 m, 1 adet için yaklaşık 10,6537690 kg; iki basamakta 10,65 kg. Yuvarlanmış kg/m tablosundan tekrar çarpıldığında farklı son basamak çıkması, aynı hassasiyet yöntemi kullanılmadığında beklenebilir. Gerçek ürün için geçerli standart/tolerans ve sertifika ayrıca değerlendirilir.

## İlgili kaynak
[Yapıdan donatı ağırlığı tablosu ve hesap aracı](https://yapidan.com/donati/agirlik)

## Lisans durumu
Bu teslimde özel bir açık kaynak lisansı tanımlanmamıştır. Kamuya açık görüntüleme, açık kaynak lisansı ile aynı şey değildir. package.json içindeki private:true paket siciline yanlışlıkla yayınlamayı önler.
