"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { runScreening } from "../../lib/api";
import { saveHistory } from "../../lib/storage";

const initial = { child_name:"", age_month:"", gender:"", height_cm:"", weight_kg:"", birth_weight_kg:"", birth_length_cm:"", breastfeeding:"unknown", parent_education:"", economic_index:"" };

export default function Screening(){
  const [form,setForm]=useState(initial); const [error,setError]=useState(""); const [loading,setLoading]=useState(false); const router=useRouter();
  const set=(k,v)=>setForm(x=>({...x,[k]:v}));
  const submit=async(e)=>{ e.preventDefault(); setError("");
    if(!form.child_name || form.age_month==="" || !form.gender || !form.height_cm || !form.weight_kg){ setError("Lengkapi semua field wajib sebelum melanjutkan."); return; }
    const age=Number(form.age_month); if(age<0 || age>60){ setError("Usia anak harus berada pada rentang 0–60 bulan."); return; }
    setLoading(true);
    try{
      const payload={...form,age_month:age,height_cm:Number(form.height_cm),weight_kg:Number(form.weight_kg)};
      ["birth_weight_kg","birth_length_cm","economic_index"].forEach(k=> payload[k] = form[k]==="" ? null : Number(form[k]));
      payload.parent_education = form.parent_education || null;
      const result=await runScreening(payload);
      const bundle={input:payload,result}; sessionStorage.setItem("stuntaware_latest",JSON.stringify(bundle)); saveHistory(bundle); router.push("/result");
    }catch(err){ setError(`Tidak dapat memproses screening: ${err.message}`); } finally{setLoading(false);}
  };
  return <div className="container form-shell">
    <div className="form-head"><span className="kicker">Screening awal</span><h2>Masukkan data pertumbuhan anak</h2><p className="subtle">Field bertanda * wajib diisi. Pastikan pengukuran tinggi/panjang dan berat dilakukan dengan benar.</p></div>
    <form className="form-card" onSubmit={submit}>
      <div className="progress"><span className="active"></span><span className="active"></span><span></span></div>
      <div className="form-grid">
        <div className="field full"><label htmlFor="child_name">Nama anak *</label><input id="child_name" required value={form.child_name} onChange={e=>set("child_name",e.target.value)} placeholder="Contoh: Aira" maxLength={80}/></div>
        <div className="field"><label htmlFor="age_month">Usia dalam bulan *</label><input id="age_month" required type="number" min="0" max="60" step="1" value={form.age_month} onChange={e=>set("age_month",e.target.value)} placeholder="Contoh: 24"/><span className="helper">Rentang demo: 0–60 bulan.</span></div>
        <div className="field"><label htmlFor="gender">Jenis kelamin *</label><select id="gender" required value={form.gender} onChange={e=>set("gender",e.target.value)}><option value="">Pilih</option><option value="female">Perempuan</option><option value="male">Laki-laki</option></select></div>
        <div className="field"><label htmlFor="height_cm">Panjang / tinggi badan (cm) *</label><input id="height_cm" required type="number" min="30.1" max="139.9" step="0.1" value={form.height_cm} onChange={e=>set("height_cm",e.target.value)} placeholder="Contoh: 85.0"/><span className="helper">Ukur panjang badan berbaring untuk &lt;24 bulan; tinggi badan berdiri mulai 24 bulan.</span></div>
        <div className="field"><label htmlFor="weight_kg">Berat badan (kg) *</label><input id="weight_kg" required type="number" min="1.1" max="49.9" step="0.1" value={form.weight_kg} onChange={e=>set("weight_kg",e.target.value)} placeholder="Contoh: 11.2"/><span className="helper">Berat dicatat untuk model kelak, tetapi tidak menentukan kategori stunting pada demo.</span></div>
        <div className="field"><label>Berat lahir (kg)</label><input type="number" step="0.01" value={form.birth_weight_kg} onChange={e=>set("birth_weight_kg",e.target.value)} placeholder="Opsional"/></div>
        <div className="field"><label>Panjang lahir (cm)</label><input type="number" step="0.1" value={form.birth_length_cm} onChange={e=>set("birth_length_cm",e.target.value)} placeholder="Opsional"/></div>
        <div className="field"><label>ASI eksklusif</label><select value={form.breastfeeding} onChange={e=>set("breastfeeding",e.target.value)}><option value="unknown">Tidak diketahui</option><option value="exclusive">Ya</option><option value="non_exclusive">Tidak</option></select></div>
        <div className="field"><label>Pendidikan orang tua</label><input value={form.parent_education} onChange={e=>set("parent_education",e.target.value)} placeholder="Opsional"/></div>
      </div>
      {error && <div className="error" role="alert">{error}</div>}
      <div className="notice" style={{marginTop:20}}>Data ini digunakan untuk screening awal. Prototype tidak menggantikan penilaian tenaga kesehatan dan tidak boleh dipakai sebagai diagnosis mandiri.</div>
      <div className="form-actions"><button type="button" className="btn btn-secondary" onClick={()=>setForm(initial)}>Reset</button><button disabled={loading} className="btn btn-primary" type="submit">{loading?"Memproses...":"Lihat hasil →"}</button></div>
    </form>
  </div>
}
