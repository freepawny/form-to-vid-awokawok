# SCRIPT FORGE — VIDEO PRODUCTION SCRIPT (V2)

**Topic:** Bahaya Desain Database UNF & Seni Normalisasi (1NF - 3NF+)  
**Target Audience:** Pemula & Mahasiswa IT Belajar Basis Data  
**Format:** Vertikal 9:16 (TikTok / IG Reels / Shorts)  
**Estimated Runtime:** ≈1,5 Menit (90 Detik)  
**Style/Tone:** Dinamis (Serius di masalah → Satir/Humor di dampak → Flowstate di solusi)  
**Reference Data:** `input/assets/rujukan-ddl-database.md` (Oracle DB: `Pesanan_Penjualan`)

---

### 1. HOOK (0:00 - 0:08)

`[NARRATION]`  
*(Nada serius, tatap kamera, volume mantap)*  
Pernah nggak kepikiran... *(pause)* satu kesalahan sepele pas kamu bikin tabel database, bisa bikin seluruh aplikasimu runtuh pas penggunanya mulai ramai?

`[VISUAL]`  
Close-up grafik server crash dengan indikator merah blinking "500 SERVER ERROR", bertransisi cepat ke tumpukan tabel database yang retak dan bergetar dramatis.

---

### 2. SETUP: JEBAKAN UNF (0:08 - 0:25)

`[NARRATION]`  
*(Tone analitis, sedikit heran tapi serius)*  
Banyak pemula mendesain database pakai konsep 'asal jalan' kayak spreadsheet Excel: semua data dipaksain numpuk di satu tabel raksasa `Pesanan_Penjualan`. *(pause)*  
Dua nomor HP Budi dijejali ke dalam satu kolom, alamat jalan sampai kode pos dicampur aduk jadi satu string, dan nggak ada *Primary Key* yang jelas.  
Kondisi gado-gado dan semrawut ini dinamakan: **UNF**—*Unnormalized Form*.

`[VISUAL]`  
Animasi 2D UI spreadsheet Excel yang dipaksa di-drag & drop ke ikon server database. Kolom `No_Telepon` di-zoom in memperlihatkan teks bertumpuk "08123456789, 08198765432" berkedip warna kuning tanda peringatan non-atomik.

---

### 3. MAIN BODY: DAMPAK ANOMALI MEMATIKAN (0:25 - 0:45)

`[NARRATION]`  
*(Tone satir, tersenyum sarkas, tempo lebih lincah dan relate)*  
Kelihatannya praktis, kan? Tapi tunggu sampai Budi pindah rumah!  
Pas kamu jalanin query update alamat Budi, eh kurirmu malah nyasar nganter paket keyboard gaming ke rumah mantan Budi di Surabaya! *(pause)*  
Terus, pas mau nambah produk baru ke katalog? Databasemu bakal nolak: *"Maaf banget, harus ada pembeli dulu baru barangnya boleh didaftarkan!"*—kan kocak ya?  
Dan puncaknya: pas ada satu transaksi belanja dibatalkan dan dihapus... eh data master produknya ikut lenyap ke alam gaib! *(pause)*  
Selamat! Kamu baru aja kena tiga kutukan anomali database: *Update, Insert,* dan *Delete Anomaly*.

`[VISUAL]`  
Animasi karakter kurir motor bingung melihat peta GPS dengan tanda tanya besar. Lalu muncul pop-up error database kartun bertuliskan *"INSERT DENIED: No Customer Found"*, disusul ikon produk monitor terhapus menjadi asap abu-abu (Delete Anomaly).

---

### 4. MAIN BODY: SOLUSI MENGALIR — SENI NORMALISASI (0:45 - 1:15)

`[NARRATION]`  
*(Tone tenang, mengalir halus, nada meyakinkan layaknya mentor membimbing flowstate)*  
Obatnya cuma satu: **Normalisasi**.  
Pertama, kita bawa ke **1NF**: kolom gado-gado wajib dibersihkan! Nilainya harus atomik. Alamat dipecah rapi jadi jalan, kota, dan kode pos. Nomor telepon dipisah per baris, lalu dikunci pakai *Composite Primary Key*. *(pause)*  
Lanjut ke **2NF**: buang ketergantungan parsial! Data yang cuma 'numpang lewat' kita cabut ke tabel master `Produk` dan `Detail_Pesanan`. Sekarang katalogmu bisa ditambah kapan aja tanpa nunggu transaksi. *(pause)*  
Masuk ke level **3NF**: putus ketergantungan transitif! Alamat dan telepon itu nempelnya ke identitas orang, bukan ke nomor faktur! Makanya kita amankan ke tabel master `Pelanggan`. Begitu Budi pindah rumah, cukup update satu baris di tabel pelanggan, semua riwayat belanja masa lalu tetap utuh dan konsisten!

`[VISUAL]`  
Transisi animasi 'pemecahan sel' elegan: dari 1 tabel besar terbelah mulus menjadi beberapa kartu tabel mini berwarna neon (Tabel `Produk`, `Pesanan`, `Pelanggan`, `Detail_Pesanan`) yang terhubung oleh garis relasi Foreign Key bercahaya biru-cyan.

---

### 5. PAYOFF & OUTRO (1:15 - 1:30)

`[NARRATION]`  
*(Tone penasaran, antusias, membangun hype)*  
Tabelmu sekarang udah bersih, efisien, dan anti-anomali.  
Tapi... kamu kira normalisasi cuma mandek di 3NF doang? *(pause)*  
Di arsitektur sistem enterprise raksasa, masih ada **BCNF, 4NF, bahkan sampai 6NF!**  
Kira-kira kasus serumit apa ya yang bikin kita wajib pakai 4NF? *(pause)* Coba kamu kepoin, atau tulis di kolom komentar biar kita bedah bareng di part dua! Jangan lupa follow dan save video ini biar struktur databasemu nggak meledak!

`[VISUAL]`  
Tampilan diagram jenjang piramida normalisasi: 1NF → 2NF → 3NF (tercentang hijau), lalu level atasnya (BCNF, 4NF, 5NF, 6NF) menyala keemasan dengan efek siluet gembok misterius. Diakhiri tombol interaktif animasi "Follow & Bookmark".

---

### PRODUCTION METADATA

#### 3 Alternative Title Options:
1. **Bahaya Desain Database UNF & Cara Beresinnya!**
2. **Jangan Asal Bikin Tabel Database! (Normalisasi 1NF - 3NF)**
3. **Kenapa Database Pemula Sering Jebol? Pahami UNF!**

#### Thumbnail Text Idea:
**AWAS DB JEBOL!** *(atau: **STOP BIKIN UNF!**)*

#### 5 Relevant Tags / Keywords:
`#basisdata` `#normalisasi` `#sqltips` `#belajarcoding` `#labit`

#### Word Count & Estimated Runtime:
- **Total Kata Narasi:** 236 kata
- **Estimasi Kecepatan Bicara:** 150 kata/menit (dengan jeda/pause alami)
- **Estimasi Runtime:** 90 detik (1 menit 30 detik)

---
*Want edits, a different tone, a Shorts version (60s), or a new topic?*
