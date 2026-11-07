# Script Konten TikTok: Bahaya Tabel UNF & Tahapan Normalisasi Database (1NF - 3NF+)

**Target Audiens:** Pemula yang baru belajar Basis Data  
**Format:** Vertikal 9:16 (TikTok / Reels / Shorts)  
**Referensi Teknis:** `input/assets/rujukan-ddl-database.md` (Studi Kasus `Pesanan_Penjualan` - Oracle Database)

---

### 1. Hook (00:00 - 00:05)
> **"Masih suka gabungin semua data ke satu tabel database raksasa kayak di Excel? Hati-hati, itu bom waktu yang bikin aplikasimu hancur!"**

---

### 2. Masalah & Definisi UNF (00:05 - 00:18)
Banyak pemula nggak sadar membiarkan tabelnya dalam kondisi **UNF (*Unnormalized Form*)**—alias tabel mentah yang belum dinormalisasi.

Contohnya di tabel `Pesanan_Penjualan`:
- **Non-Atomik (Multi-value):** Budi punya 2 nomor HP (`0812... , 0819...`), tapi dijejali sekaligus dalam satu kolom `No_Telepon`.
- **Non-Atomik (Komposit):** Jalan, kota, dan kode pos digabung mentah-mentah di kolom `Alamat_Lengkap`.
- **Tanpa Primary Key & Redundansi Tinggi:** Setiap kali Budi beli barang baru, nama, alamat, dan nomor teleponnya diketik ulang terus!

**Bahayanya apa?** Muncul 3 Anomali Mematikan:
1. **Update Anomaly:** Pas Budi pindah rumah, kalau ada satu baris aja yang kelewat di-update, data langsung bentrok!
2. **Insert Anomaly:** Nggak bisa input produk baru ke katalog kalau belum ada pembeli yang memesan.
3. **Delete Anomaly:** Hapus satu riwayat pesanan, eh data master produknya ikut lenyap!

---

### 3. Tahap 1: First Normal Form / 1NF (00:18 - 00:30)
**Aturan 1NF:** Semua kolom wajib bernilai **atomik (tunggal)** dan punya **Primary Key**.
- Pecah `Alamat_Lengkap` jadi kolom terpisah: `Alamat_Jalan`, `Kota`, dan `Kode_Pos`.
- Pisahkan multi-value `No_Telepon` menjadi baris-baris individual.
- Pasang *Composite Primary Key* gabungan dari `(No_Pesanan, Kode_Produk, No_Telepon)`.

---

### 4. Tahap 2: Second Normal Form / 2NF (00:30 - 00:43)
**Aturan 2NF:** Lolos 1NF + hilangkan **Ketergantungan Parsial (*Partial Dependency*)**.
Semua kolom non-kunci harus bergantung penuh pada seluruh Primary Key, bukan cuma numpang di sebagian kunci!
- Kita pecah jadi 4 tabel:
  1. `Produk_2NF` (khusus menyimpan `Kode_Produk`, nama, kategori, harga).
  2. `Pesanan_2NF` (menyimpan info order & pelanggan).
  3. `Pesanan_Telepon_2NF` (menyimpan nomor kontak per pesanan).
  4. `Detail_Pesanan_2NF` (mencatat `Qty` per produk dalam pesanan).

---

### 5. Tahap 3: Third Normal Form / 3NF (00:43 - 00:55)
**Aturan 3NF:** Lolos 2NF + hilangkan **Ketergantungan Transitif (*Transitive Dependency*)**.
Di `Pesanan_2NF`, alamat itu sebenarnya nempel ke `Nama_Pelanggan`, bukan ke `No_Pesanan` (`No_Pesanan -> Nama_Pelanggan -> Alamat`).
- Solusinya: Pisahkan entitas pembeli ke tabel master `Pelanggan_3NF` (pakai `ID_Pelanggan`) dan `Pelanggan_Telepon_3NF`.
- Hasilnya: Tabel `Pesanan_3NF` sekarang super bersih, cukup simpan `No_Pesanan`, `Tgl_Pesanan`, dan Foreign Key `ID_Pelanggan`!

---

### 6. Teaser / Spill Tahap Lanjutan & CTA (00:55 - 01:05)
Dengan 3NF, database kamu udah bebas redundansi dan aman dari anomali!

**Tapi tunggu dulu...** kamu kira normalisasi berhenti di 3NF doang?
Ternyata **TIDAK!** Buat sistem berskala besar dan relasi super kompleks, masih ada **BCNF (Boyce-Codd Normal Form), 4NF, 5NF, hingga 6NF!**

Penasaran kapan kita harus pakai 4NF dan seterusnya? Coba *browsing* atau tulis di kolom komentar kalau mau kita bahas di part selanjutnya! Jangan lupa *save* & *share* ke temen ngodingmu!
