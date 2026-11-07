# Script Konten TikTok: Bahaya Desain Database UNF & Seni Normalisasi (1NF - 3NF+)

**Target Audiens:** Pemula yang baru belajar Basis Data  
**Estimasi Durasi:** 1,5 Menit (90 Detik)  
**Format:** Vertikal 9:16 (TikTok / Reels / Shorts)  
**Referensi:** `input/assets/rujukan-ddl-database.md` (Studi Kasus Oracle: `Pesanan_Penjualan`)  
**Dinamika Emosi:** Serius di masalah -> Satir/Bercanda di dampak -> Mengalir lancar (Flowstate) di solusi.

---

### 1. Hook (00:00 - 00:08)
*(Ekspresi: Serius, tatap kamera, nada misterius)*  
> **"Pernah nggak kepikiran... satu kesalahan sepele pas bikin tabel database, bisa bikin seluruh aplikasimu runtuh pas penggunanya mulai ramai?"**

---

### 2. Masalah: Jebakan UNF (00:08 - 00:25)
*(Ekspresi: Serius & Analitis)*  
Banyak pemula mendesain database pakai konsep 'asal jadi' kayak spreadsheet Excel: semua data ditumpuk di satu tabel raksasa `Pesanan_Penjualan`.
Dua nomor HP Budi dijejali di satu kolom, alamat jalan sampai kode pos dicampur aduk, dan nggak ada *Primary Key* yang jelas.
Kondisi semrawut ini disebut **UNF**—*Unnormalized Form*.

---

### 3. Dampak: Anomali Mematikan (00:25 - 00:45)
*(Ekspresi: Sedikit tertawa sarkas / bercanda, relate)*  
Kelihatannya praktis, kan? Tapi tunggu sampai Budi pindah rumah!
Pas kamu update alamat Budi, eh kurirmu malah nyasar nganter barang ke rumah mantan Budi.
Mau nambah produk baru ke katalog? Databasemu bakal nolak: *"Maaf ya, harus ada pembeli dulu baru barangnya boleh didaftarkan!"*—kan kocak!
Dan yang paling horor: pas satu transaksi dibatalkan dan dihapus, eh data master produknya ikut lenyap ke alam gaib.
Selamat, kamu baru saja kena tiga kutukan anomali database!

---

### 4. Solusi Mengalir: Seni Normalisasi (00:45 - 01:15)
*(Ekspresi: Tenang, runtut, mengalir mulus bikin penonton fokus)*  
Solusinya cuma satu: **Normalisasi**.
- **Tahap 1NF:** Kolom gado-gado wajib dibersihkan! Alamat kita urai jadi jalan, kota, kode pos. Nomor telepon kita pisahkan per baris, dan kita kunci dengan *Composite Key*.
- **Tahap 2NF:** Buang ketergantungan parsial! Data yang cuma 'numpang lewat' kayak info produk kita amankan ke tabel master `Produk`. Sekarang nambah barang baru nggak perlu nunggu ada yang belanja.
- **Tahap 3NF:** Putus ketergantungan transitif! Alamat dan kontak itu melekat ke orangnya, bukan ke nomor fakturnya. Begitu entitas `Pelanggan` dipisah, update alamat Budi cukup sekali sentuh tanpa merusak riwayat transaksi.

---

### 5. Teaser 4NF+ & Penutup (01:15 - 01:30)
*(Ekspresi: Tersenyum penasaran, antusias)*  
Tabelmu sekarang udah rapi dan bebas redundansi.
Tapi kamu kira normalisasi cuma mandek di 3NF?
Di sistem enterprise raksasa, masih ada **BCNF, 4NF, bahkan sampai 6NF!**
Kira-kira kasus rumit apa ya yang bikin kita butuh sampai level 4NF? Coba kalian kepoin, atau tulis di komentar kalau mau kita bahas di part dua! Jangan lupa save video ini biar nggak kena anomali lagi!
