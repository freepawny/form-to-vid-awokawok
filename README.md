# Video Generator Workspace (Remotion + Three.js)

Workspace ini dirancang dengan **arsitektur modular & steril** serta mendukung **Mode Wawancara Otomatis (`[mode: video-plan]`)**:
- **`engine/` (Core Engine):** Engine Remotion, React Three Fiber, dan shader 3D tetap bersih (*sterile*) dan tidak perlu disentuh saat membuat video baru.
- **`projects/` (Isolated Workspaces):** Setiap video memiliki folder terisolasi sendiri. Kamu cukup memasukkan file aset ke folder `input/`, dan video `.mp4` akan otomatis masuk ke folder `output/`.
- **`projects/video-plan-triger.md` (Mode Tanya-Jawab Agent):** Cukup minta AI Agent membaca file pemicu ini, dan Agent akan memandu kamu dengan pertanyaan bertahap sampai video selesai di-render.

---

## 🚀 Cara Termudah Membuat Video Baru (Mode Tanya-Jawab `video-plan`)

Kamu **tidak perlu** mengisi form panjang, mengedit JSON manual, ataupun mengetik perintah `npm` di terminal:

1. Buat sesi chat baru dengan AI Agent di dalam folder `video-generator` ini.
2. Ketik perintah singkat ke Agent:
   > **"Baca file `projects/video-plan-triger.md`"** (atau mention `@[projects/video-plan-triger.md]`).
3. Agent akan langsung aktif dalam **`[mode: video-plan]`** dan menanyakan kebutuhan videomu satu per satu lengkap dengan **persentase progres & checklist** (mulai dari judul, konteks materi, art style, warna, naskah, perlakuan file tambahan di `input/assets/`, hingga ruang klarifikasi/pertanyaan tambahan di akhir tiap iterasi).
4. **Penting:** Di setiap balasanmu saat tanya-jawab berlangsung, selalu akhiri pesanmu dengan menyertakan **`@[projects/video-plan-triger.md]`** (atau `@[projects/video-plan-trigger.md]`) agar Agent selalu mengingat aturan mode ini di setiap iterasi.
5. Jawab pertanyaan Agent sampai progres mencapai **100%** $\rightarrow$ Agent akan otomatis membuat folder, menyusun konfigurasi, dan merender video `.mp4` ke folder `output/`.
6. Jika ingin membatalkan mode wawancara kapan saja, cukup ketik: **`exit-video-plan`**.

---

## Struktur Folder

```
video-generator/
│
├── projects/                        <-- [RUANG KERJA KONTEN]
│   ├── video-plan-triger.md         <-- [FILE PEMICU MODE VIDEO-PLAN]
│   ├── template/                    <-- [CETAK BIRU FOLDER PROJECT BARU]
│   ├── _shared/                     <-- Musik/aset bersama (misal sample-bgm.wav)
│   └── 01-normalisasi-basisdata/
│       ├── input/                   <-- HANYA MASUKKAN ASET DI SINI
│       │   ├── config.json          (Judul, volume, durasi video)
│       │   ├── captions.json        (Timestamp subtitle kata per kata)
│       │   ├── voiceover.mp3/.wav   (Rekaman suara narator)
│       │   └── assets/              (Gambar diagram, SFX tambahan, model 3D)
│       │
│       └── output/                  <-- HASIL RENDER AKAN JADI DI SINI
│           └── short.mp4            (Video 9:16 siap upload ke IG Reels / TikTok / Shorts)
│
├── engine/                          <-- [CORE ENGINE STERIL]
│   ├── src/                         (Scene3D, CaptionsOverlay, AudioTrack, Root)
│   └── scripts/project-manager.mjs  (Automated project sync & runner)
│
└── package.json                     <-- Script perintah utama
```

---

## Referensi Perintah CLI (Opsional / Dijalankan Otomatis oleh Agent)

```bash
# Buat folder project baru dari template
npm run project:new "02-nama-topik-video"

# Preview interaktif di browser (Remotion Studio)
npm run project:dev "02-nama-topik-video"

# Render video vertikal (9:16 untuk Reels / TikTok / Shorts)
npm run project:render "02-nama-topik-video"

# Render video landscape (16:9 untuk YouTube)
npm run project:render:landscape "02-nama-topik-video"
```
