# Studi Kasus: Normalisasi Basis Data Sistem Pesanan Penjualan

| Parameter    | Keterangan                                                             |
| ------------ | ---------------------------------------------------------------------- |
| **Tujuan**   | Menghilangkan anomali (_Insert_, _Update_, _Delete_) & redundansi data |
| **Tahapan**  | UNF -> 1NF -> 2NF -> 3NF                                               |
| **Platform** | Oracle Database (PL/SQL)                                               |

---

## Tahap 0: Unnormalized Form (UNF)

### Karakteristik Masalah

- **Nilai non-atomik pada `No_Telepon**`: Menyimpan multi-value (2 nomor telepon digabung dalam 1 baris/string).
- **Nilai non-atomik pada `Alamat_Lengkap**`: Komposit dari beberapa elemen data (nama jalan, kota, dan kode pos).
- **Tingkat redundansi tinggi**: Tidak adanya batasan _Primary Key_ formal.

### Skrip DDL & DML (UNF)

```sql
CREATE TABLE Pesanan_Penjualan (
    No_Pesanan      VARCHAR2(20),
    Tgl_Pesanan     DATE,
    Nama_Pelanggan  VARCHAR2(100),
    Alamat_Lengkap  VARCHAR2(255),
    No_Telepon      VARCHAR2(100),
    Kode_Produk     VARCHAR2(20),
    Nama_Produk     VARCHAR2(100),
    Kategori        VARCHAR2(50),
    Harga_Satuan    NUMBER(12, 0),
    Qty             NUMBER(5)
);

-- Simulasi Data UNF:
-- Pelanggan 'Budi Santoso' memiliki multi-value nomor telepon dalam 1 field string
INSERT INTO Pesanan_Penjualan VALUES (
    'ORD-001', DATE '2026-03-01', 'Budi Santoso',
    'Jl. Mawar No. 12, Bandung, 40123', '08123456789, 08198765432',
    'P01', 'Mouse Wireless', 'Aksesoris', 150000, 2
);

INSERT INTO Pesanan_Penjualan VALUES (
    'ORD-001', DATE '2026-03-01', 'Budi Santoso',
    'Jl. Mawar No. 12, Bandung, 40123', '08123456789, 08198765432',
    'P02', 'Keyboard Mech', 'Aksesoris', 500000, 1
);

INSERT INTO Pesanan_Penjualan VALUES (
    'ORD-002', DATE '2026-03-02', 'Siti Aminah',
    'Jl. Melati No. 5, Surabaya, 60111', '08211122233',
    'P01', 'Mouse Wireless', 'Aksesoris', 150000, 1
);

INSERT INTO Pesanan_Penjualan VALUES (
    'ORD-003', DATE '2026-03-03', 'Budi Santoso',
    'Jl. Mawar No. 12, Bandung, 40123', '08123456789, 08198765432',
    'P03', 'Monitor 24 Inch', 'Elektronik', 1800000, 1
);

COMMIT;

```

---

## Tahap 1: First Normal Form (1NF)

### Syarat 1NF

1. **Semua kolom bernilai atomik**: Tidak ada _repeating groups_ maupun nilai gabungan (_composite values_).

- Kolom `Alamat_Lengkap` dipecah menjadi: `Alamat_Jalan`, `Kota`, dan `Kode_Pos`.
- Kolom `No_Telepon` dipisah per baris data individual.

2. **Definisi Primary Key unik**: Membentuk _Composite Primary Key_ dari `(No_Pesanan, Kode_Produk, No_Telepon)`.

### Skrip DDL & DML (1NF)

```sql
CREATE TABLE Pesanan_Penjualan_1NF (
    No_Pesanan      VARCHAR2(20)  NOT NULL,
    Tgl_Pesanan     DATE          NOT NULL,
    Nama_Pelanggan  VARCHAR2(100) NOT NULL,
    Alamat_Jalan    VARCHAR2(150) NOT NULL,
    Kota            VARCHAR2(50)  NOT NULL,
    Kode_Pos        VARCHAR2(10)  NOT NULL,
    No_Telepon      VARCHAR2(20)  NOT NULL,
    Kode_Produk     VARCHAR2(20)  NOT NULL,
    Nama_Produk     VARCHAR2(100) NOT NULL,
    Kategori        VARCHAR2(50)  NOT NULL,
    Harga_Satuan    NUMBER(12, 0) NOT NULL,
    Qty             NUMBER(5)     NOT NULL,
    CONSTRAINT PK_Pesanan_Penjualan_1NF PRIMARY KEY (No_Pesanan, Kode_Produk, No_Telepon)
);

-- ORD-001: Item P01 dipecah menjadi 2 baris untuk memisahkan 2 nomor telepon
INSERT INTO Pesanan_Penjualan_1NF VALUES (
    'ORD-001', DATE '2026-03-01', 'Budi Santoso',
    'Jl. Mawar No. 12', 'Bandung', '40123', '08123456789',
    'P01', 'Mouse Wireless', 'Aksesoris', 150000, 2
);

INSERT INTO Pesanan_Penjualan_1NF VALUES (
    'ORD-001', DATE '2026-03-01', 'Budi Santoso',
    'Jl. Mawar No. 12', 'Bandung', '40123', '08198765432',
    'P01', 'Mouse Wireless', 'Aksesoris', 150000, 2
);

-- ORD-001: Item P02 dipecah menjadi 2 baris untuk memisahkan 2 nomor telepon
INSERT INTO Pesanan_Penjualan_1NF VALUES (
    'ORD-001', DATE '2026-03-01', 'Budi Santoso',
    'Jl. Mawar No. 12', 'Bandung', '40123', '08123456789',
    'P02', 'Keyboard Mech', 'Aksesoris', 500000, 1
);

INSERT INTO Pesanan_Penjualan_1NF VALUES (
    'ORD-001', DATE '2026-03-01', 'Budi Santoso',
    'Jl. Mawar No. 12', 'Bandung', '40123', '08198765432',
    'P02', 'Keyboard Mech', 'Aksesoris', 500000, 1
);

-- ORD-002: Pelanggan tunggal dengan 1 nomor telepon
INSERT INTO Pesanan_Penjualan_1NF VALUES (
    'ORD-002', DATE '2026-03-02', 'Siti Aminah',
    'Jl. Melati No. 5', 'Surabaya', '60111', '08211122233',
    'P01', 'Mouse Wireless', 'Aksesoris', 150000, 1
);

-- ORD-003: Item P03 dipecah menjadi 2 baris untuk memisahkan 2 nomor telepon
INSERT INTO Pesanan_Penjualan_1NF VALUES (
    'ORD-003', DATE '2026-03-03', 'Budi Santoso',
    'Jl. Mawar No. 12', 'Bandung', '40123', '08123456789',
    'P03', 'Monitor 24 Inch', 'Elektronik', 1800000, 1
);

INSERT INTO Pesanan_Penjualan_1NF VALUES (
    'ORD-003', DATE '2026-03-03', 'Budi Santoso',
    'Jl. Mawar No. 12', 'Bandung', '40123', '08198765432',
    'P03', 'Monitor 24 Inch', 'Elektronik', 1800000, 1
);

COMMIT;

```

---

## Tahap 2: Second Normal Form (2NF)

### Syarat 2NF

1. Memenuhi seluruh aturan **1NF**.
2. **Menghilangkan Ketergantungan Parsial (_Partial Functional Dependency_)**: Seluruh atribut _non-key_ wajib bergantung secara penuh pada seluruh komponen _Primary Key_, bukan hanya sebagian elemen komposit.

### Pemisahan Entitas

- **`Produk_2NF`**: Bergantung langsung pada `Kode_Produk`.
- **`Pesanan_2NF`**: Bergantung langsung pada `No_Pesanan`.
- **`Pesanan_Telepon_2NF`**: Menampung multi-value nomor kontak per pesanan.
- **`Detail_Pesanan_2NF`**: Bergantung penuh pada kunci gabungan `(No_Pesanan, Kode_Produk)`.

### Skrip DDL & DML (2NF)

```sql
-- 1. Master Produk (Isolasi data spesifikasi barang)
CREATE TABLE Produk_2NF (
    Kode_Produk     VARCHAR2(20)  NOT NULL,
    Nama_Produk     VARCHAR2(100) NOT NULL,
    Kategori        VARCHAR2(50)  NOT NULL,
    Harga_Satuan    NUMBER(12, 0) NOT NULL,
    CONSTRAINT PK_Produk_2NF PRIMARY KEY (Kode_Produk)
);

-- 2. Header Pesanan (Menghilangkan anomali pengulangan tanggal & data penerima)
CREATE TABLE Pesanan_2NF (
    No_Pesanan      VARCHAR2(20)  NOT NULL,
    Tgl_Pesanan     DATE          NOT NULL,
    Nama_Pelanggan  VARCHAR2(100) NOT NULL,
    Alamat_Jalan    VARCHAR2(150) NOT NULL,
    Kota            VARCHAR2(50)  NOT NULL,
    Kode_Pos        VARCHAR2(10)  NOT NULL,
    CONSTRAINT PK_Pesanan_2NF PRIMARY KEY (No_Pesanan)
);

-- 3. Relasi Telepon Pesanan (Resolusi multi-value contact per order)
CREATE TABLE Pesanan_Telepon_2NF (
    No_Pesanan      VARCHAR2(20) NOT NULL,
    No_Telepon      VARCHAR2(20) NOT NULL,
    CONSTRAINT PK_Pesanan_Telepon_2NF PRIMARY KEY (No_Pesanan, No_Telepon),
    CONSTRAINT FK_Pesanan_Telepon_2NF FOREIGN KEY (No_Pesanan)
        REFERENCES Pesanan_2NF (No_Pesanan) ON DELETE CASCADE
);

-- 4. Detail Item Pesanan (Menyimpan kuantitas pembelian per item transaksi)
CREATE TABLE Detail_Pesanan_2NF (
    No_Pesanan      VARCHAR2(20) NOT NULL,
    Kode_Produk     VARCHAR2(20) NOT NULL,
    Qty             NUMBER(5)    NOT NULL,
    CONSTRAINT PK_Detail_Pesanan_2NF PRIMARY KEY (No_Pesanan, Kode_Produk),
    CONSTRAINT FK_Detail_Pesanan_2NF FOREIGN KEY (No_Pesanan)
        REFERENCES Pesanan_2NF (No_Pesanan) ON DELETE CASCADE,
    CONSTRAINT FK_Detail_Produk_2NF FOREIGN KEY (Kode_Produk)
        REFERENCES Produk_2NF (Kode_Produk)
);

-- Seeding Data 2NF
INSERT INTO Produk_2NF VALUES ('P01', 'Mouse Wireless', 'Aksesoris', 150000);
INSERT INTO Produk_2NF VALUES ('P02', 'Keyboard Mech', 'Aksesoris', 500000);
INSERT INTO Produk_2NF VALUES ('P03', 'Monitor 24 Inch', 'Elektronik', 1800000);

INSERT INTO Pesanan_2NF VALUES ('ORD-001', DATE '2026-03-01', 'Budi Santoso', 'Jl. Mawar No. 12', 'Bandung', '40123');
INSERT INTO Pesanan_2NF VALUES ('ORD-002', DATE '2026-03-02', 'Siti Aminah', 'Jl. Melati No. 5', 'Surabaya', '60111');
INSERT INTO Pesanan_2NF VALUES ('ORD-003', DATE '2026-03-03', 'Budi Santoso', 'Jl. Mawar No. 12', 'Bandung', '40123');

INSERT INTO Pesanan_Telepon_2NF VALUES ('ORD-001', '08123456789');
INSERT INTO Pesanan_Telepon_2NF VALUES ('ORD-001', '08198765432');
INSERT INTO Pesanan_Telepon_2NF VALUES ('ORD-002', '08211122233');
INSERT INTO Pesanan_Telepon_2NF VALUES ('ORD-003', '08123456789');
INSERT INTO Pesanan_Telepon_2NF VALUES ('ORD-003', '08198765432');

INSERT INTO Detail_Pesanan_2NF VALUES ('ORD-001', 'P01', 2);
INSERT INTO Detail_Pesanan_2NF VALUES ('ORD-001', 'P02', 1);
INSERT INTO Detail_Pesanan_2NF VALUES ('ORD-002', 'P01', 1);
INSERT INTO Detail_Pesanan_2NF VALUES ('ORD-003', 'P03', 1);

COMMIT;

```

---

## Tahap 3: Third Normal Form (3NF)

### Syarat 3NF

1. Memenuhi seluruh aturan **2NF**.
2. **Menghilangkan Ketergantungan Transitif (_Transitive Dependency_)**: Atribut _non-key_ tidak boleh bergantung pada atribut _non-key_ lainnya.

$$\text{No\_Pesanan} \rightarrow \text{Nama\_Pelanggan} \rightarrow (\text{Alamat\_Jalan, Kota, Kode\_Pos})$$

### Solusi Pemisahan

Entitas pelanggan diisolasi ke dalam tabel master independen (`Pelanggan_3NF` dan `Pelanggan_Telepon_3NF`). Tabel transaksi `Pesanan_3NF` cukup mereferensikan kunci asing (_Foreign Key_) `ID_Pelanggan`.

### Skrip DDL & DML (3NF)

```sql
-- 1. Master Pelanggan (Menghilangkan redundansi data profil pelanggan)
CREATE TABLE Pelanggan_3NF (
    ID_Pelanggan    VARCHAR2(20)  NOT NULL,
    Nama_Pelanggan  VARCHAR2(100) NOT NULL,
    Alamat_Jalan    VARCHAR2(150) NOT NULL,
    Kota            VARCHAR2(50)  NOT NULL,
    Kode_Pos        VARCHAR2(10)  NOT NULL,
    CONSTRAINT PK_Pelanggan_3NF PRIMARY KEY (ID_Pelanggan)
);

-- 2. Telepon Pelanggan (Kontak melekat ke entitas Pelanggan, bukan ke nomor transaksi)
CREATE TABLE Pelanggan_Telepon_3NF (
    ID_Pelanggan    VARCHAR2(20) NOT NULL,
    No_Telepon      VARCHAR2(20) NOT NULL,
    CONSTRAINT PK_Pelanggan_Telepon_3NF PRIMARY KEY (ID_Pelanggan, No_Telepon),
    CONSTRAINT FK_Telp_Pelanggan_3NF FOREIGN KEY (ID_Pelanggan)
        REFERENCES Pelanggan_3NF (ID_Pelanggan) ON DELETE CASCADE
);

-- 3. Master Produk (Katalog barang yang dijual)
CREATE TABLE Produk_3NF (
    Kode_Produk     VARCHAR2(20)  NOT NULL,
    Nama_Produk     VARCHAR2(100) NOT NULL,
    Kategori        VARCHAR2(50)  NOT NULL,
    Harga_Satuan    NUMBER(12, 0) NOT NULL,
    CONSTRAINT PK_Produk_3NF PRIMARY KEY (Kode_Produk)
);

-- 4. Header Transaksi Pesanan (Murni mencatat waktu order dan referensi pemesan)
CREATE TABLE Pesanan_3NF (
    No_Pesanan      VARCHAR2(20) NOT NULL,
    Tgl_Pesanan     DATE         NOT NULL,
    ID_Pelanggan    VARCHAR2(20) NOT NULL,
    CONSTRAINT PK_Pesanan_3NF PRIMARY KEY (No_Pesanan),
    CONSTRAINT FK_Pesanan_Pelanggan_3NF FOREIGN KEY (ID_Pelanggan)
        REFERENCES Pelanggan_3NF (ID_Pelanggan)
);

-- 5. Detail Item Transaksi Pesanan (Junction table transaksi dengan produk)
CREATE TABLE Detail_Pesanan_3NF (
    No_Pesanan      VARCHAR2(20) NOT NULL,
    Kode_Produk     VARCHAR2(20) NOT NULL,
    Qty             NUMBER(5)    NOT NULL,
    CONSTRAINT PK_Detail_Pesanan_3NF PRIMARY KEY (No_Pesanan, Kode_Produk),
    CONSTRAINT FK_Detail_Pesanan_3NF FOREIGN KEY (No_Pesanan)
        REFERENCES Pesanan_3NF (No_Pesanan) ON DELETE CASCADE,
    CONSTRAINT FK_Detail_Produk_3NF FOREIGN KEY (Kode_Produk)
        REFERENCES Produk_3NF (Kode_Produk)
);

-- Seeding Data Master 3NF
INSERT INTO Pelanggan_3NF VALUES ('CUST-01', 'Budi Santoso', 'Jl. Mawar No. 12', 'Bandung', '40123');
INSERT INTO Pelanggan_3NF VALUES ('CUST-02', 'Siti Aminah', 'Jl. Melati No. 5', 'Surabaya', '60111');

INSERT INTO Pelanggan_Telepon_3NF VALUES ('CUST-01', '08123456789');
INSERT INTO Pelanggan_Telepon_3NF VALUES ('CUST-01', '08198765432');
INSERT INTO Pelanggan_Telepon_3NF VALUES ('CUST-02', '08211122233');

INSERT INTO Produk_3NF VALUES ('P01', 'Mouse Wireless', 'Aksesoris', 150000);
INSERT INTO Produk_3NF VALUES ('P02', 'Keyboard Mech', 'Aksesoris', 500000);
INSERT INTO Produk_3NF VALUES ('P03', 'Monitor 24 Inch', 'Elektronik', 1800000);

-- Seeding Data Transaksional 3NF
INSERT INTO Pesanan_3NF VALUES ('ORD-001', DATE '2026-03-01', 'CUST-01');
INSERT INTO Pesanan_3NF VALUES ('ORD-002', DATE '2026-03-02', 'CUST-02');
INSERT INTO Pesanan_3NF VALUES ('ORD-003', DATE '2026-03-03', 'CUST-01');

INSERT INTO Detail_Pesanan_3NF VALUES ('ORD-001', 'P01', 2);
INSERT INTO Detail_Pesanan_3NF VALUES ('ORD-001', 'P02', 1);
INSERT INTO Detail_Pesanan_3NF VALUES ('ORD-002', 'P01', 1);
INSERT INTO Detail_Pesanan_3NF VALUES ('ORD-003', 'P03', 1);

COMMIT;

```
