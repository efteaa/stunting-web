"use client";
import {useState} from "react";
import {supabase} from "../../lib/supabase";

export default function Login(){
 const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [message,setMessage]=useState("");
 const login=async(e)=>{e.preventDefault();setMessage(""); if(!supabase){setMessage("Supabase belum dikonfigurasi. Isi NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY pada .env.local.");return;} const {error}=await supabase.auth.signInWithPassword({email,password}); setMessage(error?error.message:"Login berhasil.");};
 return <div className="container login-box"><div className="form-head"><span className="kicker">Akun pengguna</span><h2>Masuk</h2><p className="subtle">Login disiapkan untuk Supabase Auth sesuai rancangan skripsi.</p></div><form className="form-card" onSubmit={login}><div className="field"><label>Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></div><div className="field" style={{marginTop:16}}><label>Password</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/></div>{message&&<div className="notice" style={{marginTop:16}}>{message}</div>}<button className="btn btn-primary" style={{width:"100%",marginTop:20}}>Masuk</button></form></div>
}
