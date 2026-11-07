# Template Folder Proyek Video

Folder ini adalah **cetak biru (blueprint)** untuk setiap video baru.

## Struktur:
- `input/`
  - `config.json` : Pengaturan dasar video (judul, volume, durasi).
  - `captions.json`: Format data subtitle per kata (opsional).
  - `assets/`     : Taruh gambar diagram, logo, SFX khusus, atau model 3D di sini.
  - `script.md`   : (Opsional) Letakkan naskah buatanmu di sini jika sudah ada. Jika belum, minta Agent untuk membuatkan naskah baru dengan durasi & pola yang ideal sesuai topikmu.
- `output/`       : Folder tempat video `.mp4` hasil render akan disimpan.

> **Tips:** Kamu tidak perlu mengubah file-file konfigurasi di sini secara manual! Cukup isi formulir di `PROMPT-TEMPLATE.md` dan kirimkan ke AI Agent, maka agent yang akan mengurus semuanya.
