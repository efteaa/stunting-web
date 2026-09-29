const KEY = "stuntaware_history";
export function saveHistory(item){
  if(typeof window === "undefined") return;
  const current = JSON.parse(localStorage.getItem(KEY) || "[]");
  localStorage.setItem(KEY, JSON.stringify([{...item, saved_at:new Date().toISOString()}, ...current].slice(0,50)));
}
export function getHistory(){
  if(typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}
export function clearHistory(){ if(typeof window!=="undefined") localStorage.removeItem(KEY); }
