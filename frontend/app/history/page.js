"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import RiskBadge from "../../components/RiskBadge";
import {getHistory,clearHistory} from "../../lib/storage";

export default function History(){
 const [items,setItems]=useState([]); useEffect(()=>setItems(getHistory()),[]);
 const clear=()=>{clearHistory();setItems([])};
 return <div className="container form-shell"><div className="result-row"><div className="form-head"><span className="kicker">Riwayat</span><h2>Pemantauan screening</h2><p className="subtle">Mode demo menyimpan riwayat pada browser. Saat Supabase diaktifkan, penyimpanan dapat dipindahkan ke database.</p></div>{items.length>0&&<button className="btn btn-secondary" onClick={clear}>Hapus riwayat lokal</button>}</div>
 {items.length===0?<div className="empty"><h3>Belum ada riwayat</h3><p>Hasil screening yang disimpan akan muncul di sini.</p><Link className="btn btn-primary" href="/screening">Mulai screening</Link></div>:<div className="history-list">{items.map((x,i)=><div className="history-item" key={x.result.screening_id||i}><div><strong>{x.input.child_name}</strong><div className="helper">{x.input.age_month} bulan · {x.input.height_cm} cm · {new Date(x.saved_at).toLocaleString("id-ID")}</div></div><RiskBadge level={x.result.risk_level}/></div>)}</div>}
 </div>
}
