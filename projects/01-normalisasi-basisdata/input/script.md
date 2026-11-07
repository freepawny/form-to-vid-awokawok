**# Script Konten: Bahaya Desain Database UNF \& Solusi Normalisasi**



**---**



**### 1. Hook**

**> "Jangan asal copas tabel Excel ke database, atau aplikasimu bakal jebol di masa depan!"**



**---**



**### 2. Masalah**

**Bayangin kamu bikin database belanja online pakai satu tabel doang, namanya `pesanan\_penjualan`.** 



**Suatu hari, kurirmu nyasar gara-gara alamat Budi di orderan hari ini beda sama orderan kemarin. Pas dicek, bukan kurirnya yang salah—tapi databasemu yang cacat.**



**---**



**### 3. Bedah Masalah (Ciri-Ciri UNF)**

**Tabel gado-gado gini disebut \*\*UNF (\*Unnormalized Form\*)\*\* alias belum dinormalisasi. Ciri-cirinya:**



**\* \*\*Multivalue:\*\* Satu kolom nomor HP dijejali dua nomor sekaligus.**

**\* \*\*Komposit:\*\* Alamat jalan, kota, dan kode pos dicampur aduk dalam satu kolom.**

**\* \*\*Redundansi:\*\* Nama pembeli dan nama produk diketik ulang terus-menerus di tiap transaksi.**

**\* \*\*Tanpa Primary Key:\*\* Nggak ada identitas (ID) unik yang jelas.**



**---**



**### 4. Counter-Argumen**

**Efeknya terasa pas Budi pindah rumah dan kamu harus memperbarui alamatnya.**



**Mungkin kamu mikir:**

**> \*"Tinggal jalanin query `UPDATE ... WHERE nama = 'Budi'`, beres kan?"\***



**\*\*Eits, jangan salah!\*\* Nama itu bukan kunci unik (\*unique key\*). Kalau ada Budi di Bandung dan Budi di Surabaya, alamat dua-duanya bakal ikut kerubah secara keliru!**



**---**



**### 5. Langkah Solusi: Normalisasi**



**#### Tahap 1: 1NF (First Normal Form)**

**\* \*\*Aturan:\*\* Isi setiap sel/kolom wajib bernilai tunggal (\*atomic value\*).**

**\* \*\*Eksekusi:\*\***

&#x20; **\* Alamat dipecah menjadi kolom terpisah: `Jalan`, `Kota`, dan `Kode Pos`.**

&#x20; **\* Nomor HP dipisah menjadi baris tersendiri.**

&#x20; **\* Tetapkan kunci gabungan (\*composite key\*): gabungan `nomor order`, `kode produk`, dan `nomor telepon` agar setiap baris bersifat unik.**



**#### Tahap 2: 2NF (Second Normal Form)**

**\* \*\*Aturan:\*\* Hilangkan ketergantungan parsial; keluarkan data yang cuma "numpang lewat".**

**\* \*\*Eksekusi:\*\***

&#x20; **\* Data master produk dicabut ke tabel tersendiri: `Produk`.**

&#x20; **\* Rincian belanjaan dipisah ke tabel: `Detail\_Pesanan`.**

&#x20; **\* Nomor telepon dipindah ke tabel: `Telepon`.**

&#x20; **\* \*\*Hasil:\*\* Mau nambah barang baru ke katalog sekarang nggak perlu nunggu ada transaksi pembeli dulu.**



**#### Tahap 3: 3NF (Third Normal Form)**

**\* \*\*Aturan:\*\* Hilangkan ketergantungan transitif; pisahkan atribut yang bergantung pada kolom non-kunci.**

**\* \*\*Eksekusi:\*\***

&#x20; **\* Pisahkan profil pembeli ke tabel tersendiri: `Pelanggan` (dilengkapi `ID\_Pelanggan`).**

&#x20; **\* Nomor telepon dihubungkan ke `ID\_Pelanggan`.**

&#x20; **\* Pada tabel transaksi, kita cukup mencatat relasi `ID\_Pelanggan`-nya saja.**



**---**



**### 6. Hasil Akhir**

**Pas Budi pindah rumah, kamu cuma perlu \*update\* satu baris di tabel `Pelanggan` berdasarkan ID-nya.** 



**\* Riwayat belanja lama tetap aman.**

**\* Laporan omzet nggak bakal terhitung ganda (\*duplicate data\*).**

**\* Kurir nggak bakal salah alamat lagi.**



**---**



**### 7. Penutup (Call to Action)**

**Normalisasi itu intinya cuma dua: \*\*hapus data ganda\*\* dan \*\*jaga data tetap konsisten\*\*.**



**\* Mau lihat konten edukasi database lainnya? Pantau terus tagar \*\*#labitedukasibasisdata\*\*.**

**\* \*Share\* video ini ke temenmu yang masih jadi "raja copas" tabel mentah-mentah!**

