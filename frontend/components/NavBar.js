"use client";
import Link from "next/link";

export default function NavBar(){
  return <div className="nav-shell"><div className="container nav">
    <Link href="/" className="brand"><span className="logo-dot">↗</span><span>StuntAware</span></Link>
    <nav className="nav-links">
      <Link href="/">Beranda</Link>
      <Link href="/education">Edukasi</Link>
      <Link href="/history">Riwayat</Link>
      <Link href="/login">Masuk</Link>
      <Link href="/screening" className="nav-cta">Mulai Screening</Link>
    </nav>
  </div></div>
}
