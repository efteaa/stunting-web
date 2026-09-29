# Rencana Black-box Testing

| No | Fitur | Skenario | Hasil yang diharapkan |
|---|---|---|---|
| 1 | Input data anak | Semua field wajib valid | Sistem menerima input dan memproses screening |
| 2 | Input data anak | Nama kosong | Sistem menampilkan pesan field wajib |
| 3 | Input usia | Usia > 60 bulan | Sistem menolak input dan menampilkan validasi |
| 4 | Input tinggi | Tinggi kosong/tidak numerik | Sistem menolak input |
| 5 | Klasifikasi | Data valid, model belum tersedia | Sistem menampilkan fallback WHO dan memberi label sumber klasifikasi |
| 6 | Klasifikasi | Data valid, model final tersedia | Sistem menampilkan hasil model ML dan mencatat sumber model |
| 7 | Hasil | Risiko sedang/tinggi | Sistem menampilkan anjuran tindak lanjut umum dan disclaimer |
| 8 | Riwayat | Setelah screening berhasil | Hasil muncul di halaman riwayat |
| 9 | Edukasi | Buka halaman edukasi | Informasi stunting vs underweight tampil |
| 10 | Login | Supabase belum dikonfigurasi | Sistem memberi feedback konfigurasi, tidak crash |
