import Link from "next/link";

export default function Home(){
  return <>
    <section className="hero"><div className="container hero-grid">
      <div>
        <span className="eyebrow">● Screening awal + edukasi preventif</span>
        <h1>Pahami pertumbuhan anak dengan lebih jelas.</h1>
        <p className="lead">StuntAware membantu orang tua melakukan screening awal risiko stunting berdasarkan data pertumbuhan anak, sekaligus menjelaskan perbedaan stunting dan underweight dengan bahasa yang mudah dipahami.</p>
        <div className="actions">
          <Link className="btn btn-primary" href="/screening">Mulai screening →</Link>
          <Link className="btn btn-secondary" href="/education">Pelajari stunting</Link>
        </div>
        <p className="helper" style={{marginTop:16}}>Untuk anak usia 0–60 bulan. Hasil bukan diagnosis medis.</p>
      </div>
      <div className="hero-card" aria-label="Ilustrasi hasil screening">
        <div className="orb one"></div><div className="orb two"></div>
        <div className="mock">
          <span className="tag">Ringkasan pertumbuhan</span>
          <h3 style={{marginTop:16}}>Data anak sudah siap dianalisis</h3>
          <div className="mock-line w85"></div><div className="mock-line w70"></div><div className="mock-line w45"></div>
          <div className="mock-pill"><strong>Yang dinilai untuk stunting</strong><p className="subtle" style={{marginBottom:0}}>Tinggi/panjang badan menurut umur — bukan berat badan saja.</p></div>
        </div>
      </div>
    </div></section>

    <section className="section soft"><div className="container">
      <div className="section-head"><span className="kicker">Cara kerja</span><h2>Screening sederhana, hasil yang mudah dipahami.</h2><p className="lead">Alur dibuat singkat agar sesuai target pengguna masyarakat umum dan prinsip usability pada proposal.</p></div>
      <div className="grid-3">
        <div className="card"><div className="iconbox">1</div><h3>Isi data anak</h3><p className="subtle">Masukkan umur, jenis kelamin, tinggi/panjang badan, dan berat badan. Faktor tambahan dapat diisi bila tersedia.</p></div>
        <div className="card"><div className="iconbox">2</div><h3>Proses klasifikasi</h3><p className="subtle">Data dikirim ke backend. Jika model ML final tersedia, pipeline model digunakan; jika belum, prototype memakai screening tinggi menurut umur WHO.</p></div>
        <div className="card"><div className="iconbox">3</div><h3>Lihat hasil & edukasi</h3><p className="subtle">Hasil disertai penjelasan, anjuran tindak lanjut umum, dan penegasan bahwa underweight tidak sama dengan stunting.</p></div>
      </div>
    </div></section>

    <section className="section"><div className="container grid-2">
      <div><span className="kicker">Kenapa fitur edukasi penting?</span><h2>Berat badan rendah tidak otomatis berarti stunting.</h2><p className="lead">Stunting menilai panjang/tinggi badan menurut umur. Underweight menilai berat badan menurut umur. Keduanya dapat terjadi bersamaan, tetapi indikatornya berbeda.</p><Link className="btn btn-secondary" href="/education">Baca penjelasan →</Link></div>
      <div className="card"><h3>Catatan penggunaan</h3><div className="notice">Website ini adalah alat bantu screening awal dan media edukasi. Jika hasil menunjukkan risiko sedang/tinggi, atau orang tua khawatir terhadap pertumbuhan anak, lakukan pengukuran ulang dan konsultasi ke tenaga kesehatan.</div></div>
    </div></section>
  </>
}
