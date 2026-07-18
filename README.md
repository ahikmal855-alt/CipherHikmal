# CipherHikmal
CipherHikmal adalah aplikasi web statis untuk mensimulasikan empat algoritma kriptografi simetris:

- Data Encryption Standard (DES)
- Simplified DES (S-DES)
- Advanced Encryption Standard 128-bit (AES-128)
- Simplified AES (S-AES)

Aplikasi menyediakan mode enkripsi dan dekripsi, validasi input, output akhir, pembentukan subkey/round key, serta tampilan perhitungan langkah demi langkah. Tema terang dan gelap dapat dipilih dari tombol pada bagian kanan atas dan pilihan disimpan di browser.

## Fitur utama

- Satu landing page dengan navigasi ke empat modul.
- DES menerima input biner 64-bit atau heksadesimal 16 digit.
- S-DES menerima input biner 8-bit dan kunci biner 10-bit.
- AES-128 menerima input heksadesimal 32 digit; tersedia juga input teks satu blok.
- S-AES menerima input heksadesimal 4 digit atau biner 16-bit.
- Tombol enkripsi/dekripsi, proses, reset, data contoh, dan detail solusi.
- Tampilan responsif untuk desktop dan perangkat mobile.
- Tidak memerlukan database atau backend.

## Data contoh terintegrasi

| Algoritma | Plaintext | Kunci | Ciphertext |
|---|---|---|---|
| DES | `A1B2C3D4E5F60718` | `0F1571C947D9E859` | `D1E4A966815BFC44` |
| S-DES | `11010111` | `1010000010` | `10101000` |
| AES-128 | `6BC1BEE22E409F96E93D7E117393172A` | `2B7E151628AED2A6ABF7158809CF4F3C` | `3AD77BB40D7A3660A89ECAF32466EF97` |
| S-AES | `D728` | `4AF5` | `24EC` |

Gunakan data yang sama pada dokumen perhitungan manual agar output aplikasi dapat dibandingkan secara langsung.

## Struktur proyek

```text
CipherHikmal/
├── index.html
├── 404.html
├── README.md
├── assets/
│   ├── simple.css
│   ├── suite.css
│   └── theme.js
├── des/
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   └── test.js
├── sdes/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── test.js
├── aes/
│   ├── index.html
│   ├── style.css
│   ├── aes.js
│   ├── app.js
│   └── test.js
└── saes/
    ├── index.html
    ├── style.css
    ├── app.js
    └── test.js
```

## Menjalankan secara lokal

Aplikasi dapat dibuka langsung dari `index.html`. Penggunaan server statis disarankan agar perilaku browser konsisten.

```bash
python -m http.server 8000
```

Buka `http://localhost:8000` pada browser.
