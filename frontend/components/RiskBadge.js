const labels = { low: "Kategori Rendah", medium: "Kategori Sedang", high: "Kategori Tinggi" };
export default function RiskBadge({level}){
  return <span className={`risk-badge risk-${level}`}>{labels[level] || level}</span>
}
