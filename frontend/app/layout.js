import "./globals.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export const metadata = {
  title: "StuntAware — Screening Awal Risiko Stunting",
  description: "Prototype skripsi klasifikasi risiko stunting berbasis website dan edukasi preventif."
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
