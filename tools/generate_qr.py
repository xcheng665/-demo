from PIL import Image


URL = "https://demo3-bxp.pages.dev/"
OUT = "public/demo3-bxp-qr.png"
VERSION = 3
EC_CODEWORDS = 15
DATA_CODEWORDS = 55
SIZE = VERSION * 4 + 17


def gf_mul(x: int, y: int) -> int:
    z = 0
    for i in range(8):
        if (y >> i) & 1:
            z ^= x << i
    for i in range(14, 7, -1):
        if (z >> i) & 1:
            z ^= 0x11D << (i - 8)
    return z


def rs_generator(degree: int) -> list[int]:
    result = [0] * (degree - 1) + [1]
    root = 1
    for _ in range(degree):
        for j in range(degree):
            result[j] = gf_mul(result[j], root)
            if j + 1 < degree:
                result[j] ^= result[j + 1]
        root = gf_mul(root, 0x02)
    return result


def rs_remainder(data: list[int], degree: int) -> list[int]:
    divisor = rs_generator(degree)
    result = [0] * degree
    for byte in data:
        factor = byte ^ result.pop(0)
        result.append(0)
        for i, coef in enumerate(divisor):
            result[i] ^= gf_mul(coef, factor)
    return result


def append_bits(bits: list[int], value: int, count: int) -> None:
    for i in range(count - 1, -1, -1):
        bits.append((value >> i) & 1)


def data_codewords(text: str) -> list[int]:
    payload = text.encode("utf-8")
    bits: list[int] = []
    append_bits(bits, 0b0100, 4)
    append_bits(bits, len(payload), 8)
    for byte in payload:
        append_bits(bits, byte, 8)
    append_bits(bits, 0, min(4, DATA_CODEWORDS * 8 - len(bits)))
    while len(bits) % 8:
        bits.append(0)

    result = []
    for i in range(0, len(bits), 8):
        byte = 0
        for bit in bits[i : i + 8]:
            byte = (byte << 1) | bit
        result.append(byte)

    for pad in [0xEC, 0x11] * DATA_CODEWORDS:
        if len(result) >= DATA_CODEWORDS:
            break
        result.append(pad)
    return result


matrix: list[list[bool | None]] = [[None for _ in range(SIZE)] for _ in range(SIZE)]
reserved = [[False for _ in range(SIZE)] for _ in range(SIZE)]


def set_function(x: int, y: int, dark: bool) -> None:
    if 0 <= x < SIZE and 0 <= y < SIZE:
        matrix[y][x] = dark
        reserved[y][x] = True


def draw_finder(x: int, y: int) -> None:
    for dy in range(-1, 8):
        for dx in range(-1, 8):
            xx, yy = x + dx, y + dy
            if 0 <= xx < SIZE and 0 <= yy < SIZE:
                dark = (
                    0 <= dx <= 6
                    and 0 <= dy <= 6
                    and (dx in (0, 6) or dy in (0, 6) or (2 <= dx <= 4 and 2 <= dy <= 4))
                )
                set_function(xx, yy, dark)


def draw_alignment(cx: int, cy: int) -> None:
    for dy in range(-2, 3):
        for dx in range(-2, 3):
            set_function(cx + dx, cy + dy, max(abs(dx), abs(dy)) != 1)


draw_finder(0, 0)
draw_finder(SIZE - 7, 0)
draw_finder(0, SIZE - 7)
draw_alignment(22, 22)

for i in range(SIZE):
    if not reserved[6][i]:
        set_function(i, 6, i % 2 == 0)
    if not reserved[i][6]:
        set_function(6, i, i % 2 == 0)

set_function(8, 4 * VERSION + 9, True)

for i in range(9):
    if matrix[8][i] is None:
        reserved[8][i] = True
    if matrix[i][8] is None:
        reserved[i][8] = True
for i in range(8):
    reserved[SIZE - 1 - i][8] = True
for i in range(8):
    reserved[8][SIZE - 1 - i] = True

codewords = data_codewords(URL)
codewords += rs_remainder(codewords, EC_CODEWORDS)
bits = [(byte >> i) & 1 for byte in codewords for i in range(7, -1, -1)]

i = 0
x = SIZE - 1
upward = True
while x > 0:
    if x == 6:
        x -= 1
    rows = range(SIZE - 1, -1, -1) if upward else range(SIZE)
    for y in rows:
        for xx in (x, x - 1):
            if not reserved[y][xx]:
                dark = i < len(bits) and bits[i] == 1
                if (xx + y) % 2 == 0:
                    dark = not dark
                matrix[y][xx] = dark
                i += 1
    upward = not upward
    x -= 2


def format_bits() -> int:
    data = (0b01 << 3) | 0
    rem = data
    for _ in range(10):
        rem <<= 1
        if (rem >> 10) & 1:
            rem ^= 0x537
    return ((data << 10) | rem) ^ 0x5412


fbits = format_bits()
positions_a = (
    [(8, i) for i in range(6)]
    + [(8, 7), (8, 8), (7, 8)]
    + [(14 - i, 8) for i in range(9, 15)]
)
positions_b = [(SIZE - 1 - i, 8) for i in range(8)] + [(8, SIZE - 15 + i) for i in range(8, 15)]
for bit_index, (x, y) in enumerate(positions_a):
    matrix[y][x] = ((fbits >> bit_index) & 1) == 1
for bit_index, (x, y) in enumerate(positions_b):
    matrix[y][x] = ((fbits >> bit_index) & 1) == 1

scale = 24
quiet = 4
img_size = (SIZE + quiet * 2) * scale
img = Image.new("RGB", (img_size, img_size), "white")
px = img.load()
for y in range(SIZE):
    for x in range(SIZE):
        if matrix[y][x]:
            left = (x + quiet) * scale
            top = (y + quiet) * scale
            for yy in range(top, top + scale):
                for xx in range(left, left + scale):
                    px[xx, yy] = (10, 10, 11)

img.save(OUT)
print(OUT)
