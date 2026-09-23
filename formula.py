"""İdeal dairesel kesit için bağımsız eğitim referansı; SI dönüşümü açık."""
import math

def theoretical_mass(diameter_mm: float, length_m: float, count: int = 1) -> float:
    for name, value in (("diameter_mm", diameter_mm), ("length_m", length_m), ("count", count)):
        if isinstance(value, bool) or not isinstance(value, (int, float)) or not math.isfinite(value):
            raise ValueError(f"{name}: sonlu sayısal girdi gerekli")
    if not 0 < diameter_mm <= 1000 or not 0 < length_m <= 10000:
        raise ValueError("Bu örneğin çap/boy aralığı dışında")
    if int(count) != count or not 1 <= count <= 1000000:
        raise ValueError("Adet pozitif ve izinli aralıkta bir tam sayı olmalı")
    return math.pi / 4 * (diameter_mm / 1000) ** 2 * 7850 * length_m * count
