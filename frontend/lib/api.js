export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function runScreening(payload){
  const res = await fetch(`${API_URL}/predict`, {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(payload)
  });
  if(!res.ok){
    let msg = "Data belum dapat diproses.";
    try { const body = await res.json(); msg = body.detail ? JSON.stringify(body.detail) : msg; } catch {}
    throw new Error(msg);
  }
  return res.json();
}
