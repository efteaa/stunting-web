"use client";
import { useEffect,useState } from "react";
import Link from "next/link";
import RiskBadge from "../../components/RiskBadge";

const growthLabel={severely_stunted_range:"Di bawah −3 SD",stunted_range:"Di bawah −2 SD",not_stunted_by_hfa_cutoff:"Tidak di bawah −2 SD",ml_risk_classification:"Klasifikasi model ML"};
export default function Result(){
 const [data,setData]=useState(null); useEffect(()=>{try{setData(JSON.parse(sessionStorage.getItem("stuntaware_latest")||"null"))}catch{}},[]);
 if(!data) return <div className="container result-shell"><div className="empty"><h3>Belum ada hasil screening</h3><p>Isi data anak terlebih dahulu.</p><Link className="btn btn-primary" href="/screening">Mulai screening</Link></div></div>;
 const {input,result}=data; const ref=result.who_screening?.reference; const usingML=!!result.ml_prediction;
 return <div className="container result-shell">
  <div className="result-hero">
   <div className="result-row"><div><span className="kicker">{usingML?"Klasifikasi model":"Simulasi berdasarkan acuan WHO"}</span><h2 style={{marginTop:7}}>{input.child_name}</h2><p className="subtle">{input.age_month} bulan · {input.gender==="female"?"Perempuan":"Laki-laki"}</p></div><RiskBadge level={result.risk_level}/></div>
   <div className="metrics"><div className="metric"><small>Tinggi/panjang</small><strong>{input.height_cm} cm</strong></div><div className="metric"><small>Berat</small><strong>{input.weight_kg} kg</strong></div><div className="metric"><small>Interpretasi</small><strong style={{fontSize:16}}>{growthLabel[result.growth_status]||result.growth_status}</strong></div></div>
   <div className="card" style={{marginTop:20,background:"#f7fbf8"}}><h3>Apa artinya?</h3><p>{result.recommendation}</p>{ref && <p className="helper">Acuan WHO untuk usia/jenis kelamin ini: ambang −3 SD {ref.minus_3_sd_cm} cm, ambang −2 SD {ref.minus_2_sd_cm} cm, median {ref.median_cm} cm. Berat badan tidak digunakan dalam kategori demo ini.</p>}</div>
   <div className="notice" style={{marginTop:16}}>{result.disclaimer}</div>
  </div>
  <div className="grid-2" style={{marginTop:20}}>
   <div className="card"><span className="tag">Sumber hasil</span><h3 style={{marginTop:12}}>{usingML?"Model machine learning":"Acuan WHO untuk demo"}</h3><p className="subtle">{usingML?"Backend menggunakan pipeline model yang dipasang sebagai klasifikasi utama.":"Kategori rendah/sedang/tinggi pada demo memetakan rentang panjang/tinggi menurut umur, bukan peluang anak akan mengalami stunting di masa depan. Model ML dan evaluasinya masih dalam pengerjaan."}</p><a href="https://www.who.int/tools/child-growth-standards/standards/length-height-for-age" target="_blank" rel="noreferrer" className="helper">Lihat tabel pertumbuhan WHO ↗</a></div>
   <div className="card"><span className="tag">Stunting ≠ underweight</span><h3 style={{marginTop:12}}>Indikatornya berbeda</h3><p className="subtle">Stunting berkaitan dengan tinggi/panjang badan menurut umur, sedangkan underweight berkaitan dengan berat badan menurut umur. Berat badan rendah tidak otomatis berarti anak stunting.</p><Link href="/education" className="btn btn-secondary">Baca edukasi</Link></div>
  </div>
  <div className="actions"><Link href="/screening" className="btn btn-primary">Screening lagi</Link><Link href="/history" className="btn btn-secondary">Lihat riwayat</Link></div>
 </div>
}
