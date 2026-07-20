const SUPABASE_URL = 'https://ffsddbbtgoxbqlrnvcrm.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmc2RkYmJ0Z294YnFscm52Y3JtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjY0MTMxNCwiZXhwIjoyMDk4MjE3MzE0fQ.OJVRH623HKsMbGah9Zj3zfHLQZOgAR1zNy6fHqJ-3JA';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmc2RkYmJ0Z294YnFscm52Y3JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI2NDEzMTQsImV4cCI6MjA5ODIxNzMxNH0.EYNEFQqUR7ZV63XCHKo_RuS2tIJRxN1VfF6Tx3BAb3I';
const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const dbAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

(async () => { const { data: { session } } = await db.auth.getSession(); if (session) window.location.href = "/admin/"; })();
document.getElementById("login-form").addEventListener("submit", async e => {
  e.preventDefault();
  const btn = document.getElementById("login-btn");
  const err = document.getElementById("login-error");
  btn.disabled=true; btn.textContent="Signing in..."; err.style.display="none";
  const { error } = await db.auth.signInWithPassword({ email: document.getElementById("email").value, password: document.getElementById("password").value });
  if (error) { err.textContent = error.message; err.style.display="block"; btn.disabled=false; btn.textContent="Sign In"; }
  else { window.location.href = "/admin/"; }
});
