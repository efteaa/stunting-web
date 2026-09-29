# Pemetaan website ke Pre-Thesis Bab 1–3

## Bab 1 — Pendahuluan

Website dibuat untuk menjawab tiga kebutuhan yang tertulis di rumusan masalah:

1. **Klasifikasi/screening objektif** dari data antropometri anak.
2. **Membedakan stunting dan underweight**, sehingga berat badan rendah tidak otomatis dianggap stunting.
3. **Edukasi preventif** yang mudah diakses masyarakat umum, khususnya orang tua/calon orang tua.

Ruang lingkup teknologi yang dipakai di source code mengikuti proposal:
- Frontend: **Next.js**.
- Backend: **Python + FastAPI**.
- Database/Auth: **Supabase (skema dan hook disiapkan; belum diaktifkan untuk demo)**.
- Machine learning: endpoint sudah siap menerima pipeline model final.

## Bab 2 — Landasan teori yang muncul di implementasi

- Antropometri: input umur, jenis kelamin, tinggi/panjang badan, berat badan.
- Stunting vs underweight: halaman edukasi dan penjelasan hasil.
- Machine learning: `backend/app/predictor.py`.
- OOAD/UML-ready: struktur entitas users/children/measurements/predictions/articles dapat dipakai untuk class diagram, sequence diagram, dan ERD.
- Data dictionary/ERD: `supabase/schema.sql`.
- Evaluasi UI: desain sengaja menerapkan konsistensi, feedback, error message yang jelas, tombol reset, alur berakhir pada hasil, dan beban ingatan rendah.
- Black-box testing: `backend/tests/test_api.py` plus skenario valid/invalid.

## Bab 3 — Waterfall

### Requirements Definition
Fitur yang diimplementasikan:
- Login / Supabase Auth hook.
- Input data anak.
- Validasi data.
- Screening berbasis acuan WHO untuk simulasi; klasifikasi risiko ML menunggu model final.
- Hasil + rekomendasi edukasi.
- Riwayat screening.
- Halaman edukasi.

### System and Software Design
Arsitektur:

`Browser / Next.js → FastAPI → Acuan WHO (demo)`  
`                              ↳ ML pipeline (saat tersedia)`

Riwayat demo tersimpan di browser. Skema Supabase dan login adalah rancangan untuk tahap integrasi, belum menjadi penyimpanan riwayat server.

### Implementation and Unit Testing
- Next.js: folder `frontend`.
- FastAPI: folder `backend`.
- Supabase: folder `supabase`.
- Tests: folder `backend/tests`.

### Integration and System Testing
Endpoint utama:
- `GET /health`
- `POST /predict`

Frontend mengirim data screening ke `/predict` dan menampilkan hasil.

### Operation and Maintenance / Evaluation
Demo statis dapat dibuka sekarang. Deploy aplikasi lengkap memerlukan konfigurasi API dan keputusan alur akun. Riwayat saat demo memakai localStorage agar dapat dipresentasikan tanpa database.

## Catatan metodologis penting

Dokumen proposal menyebut model final akan diperoleh dari EDA, preprocessing, training, dan evaluasi beberapa algoritma. Karena artifact model training (`.joblib/.pkl`) belum tersedia di file yang ditemukan, source code **tidak mengarang model atau nilai akurasi**.

Sebelum model final dipasang, backend memakai fallback transparan berdasarkan ambang tinggi/panjang menurut umur WHO hanya untuk membuat prototype berfungsi. Setelah pipeline ML final tersedia, simpan ke:

`backend/model/stunting_model.joblib`

Backend akan menggunakan prediksi model tersebut sebagai label risiko utama. Pastikan preprocessing dan classifier tersimpan sebagai satu pipeline agar input di API sama dengan saat training.
