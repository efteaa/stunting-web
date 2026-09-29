# StuntAware — demo website skripsi

Website simulasi untuk proposal **Pengembangan Sistem Klasifikasi Risiko Stunting Berbasis Website dengan Pendekatan Edukasi Preventif Menggunakan Machine Learning** (Bab 1–3, versi 16 September 2026).

## Coba langsung

Buka [`demo.html`](demo.html) di browser. Form, hasil, edukasi, dan riwayat lokal bekerja tanpa instalasi atau akun. Ini cocok untuk menunjukkan alur pada bimbingan. Data riwayat tersimpan **hanya di browser/perangkat yang dipakai**, bukan di server; gunakan data contoh, bukan identitas anak sungguhan.

## Struktur

- `frontend/`: antarmuka Next.js; beranda, form, hasil, edukasi, riwayat, halaman login.
- `backend/`: API FastAPI. Selama belum ada model, memakai ambang panjang/tinggi menurut umur WHO untuk simulasi. Adapter model tersedia untuk integrasi kemudian.
- `supabase/schema.sql`: rancangan tabel dan RLS untuk fase berikutnya; belum diperlukan untuk demo dan **belum terhubung** ke riwayat.
- `docs/`: pemetaan Bab 1–3 dan skenario black-box.

## Jalankan versi Next.js + API

Terminal 1:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Terminal 2:

```bash
cd frontend
npm install
npm run dev
```

Buka http://localhost:3000. Dokumentasi API: http://localhost:8000/docs. `NEXT_PUBLIC_API_URL` dapat diatur untuk alamat API lain. Tanpa backend, gunakan `demo.html`.

## Saat model dari tim data sudah siap

Sepakati nama kolom, satuan, encoding, rentang data, label kelas, dan preprocessing dengan tim EDA. Simpan **pipeline preprocessing + estimator** sebagai `backend/model/stunting_model.joblib`, lalu sesuaikan peta label pada `backend/app/predictor.py`. Jangan menaruh model tak tepercaya di server: file joblib dapat menjalankan kode ketika dimuat. Jalankan pengujian end-to-end, metrik accuracy/precision/recall/F1, serta kalibrasi interpretasi “risiko” sebelum menyebut hasil sebagai prediksi ML.

## Batas demo

Label rendah/sedang/tinggi saat ini hanya memetakan posisi panjang/tinggi terhadap ambang WHO (≥−2 SD, <−2 SD, <−3 SD), **bukan probabilitas stunting di masa depan**. Berat badan dicatat, tetapi tidak digunakan dalam kategori WHO ini. Stunting berbeda dari underweight. Hasil perlu dikonfirmasi tenaga kesehatan dan bukan diagnosis.

Acuan: [WHO length/height-for-age](https://www.who.int/tools/child-growth-standards/standards/length-height-for-age), [WHO malnutrition](https://www.who.int/health-topics/malnutrition).
