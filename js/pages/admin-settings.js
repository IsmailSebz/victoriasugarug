const SUPABASE_URL='https://ffsddbbtgoxbqlrnvcrm.supabase.co';
const SUPABASE_SERVICE_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmc2RkYmJ0Z294YnFscm52Y3JtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjY0MTMxNCwiZXhwIjoyMDk4MjE3MzE0fQ.OJVRH623HKsMbGah9Zj3zfHLQZOgAR1zNy6fHqJ-3JA';
const SUPABASE_ANON_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmc2RkYmJ0Z294YnFscm52Y3JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI2NDEzMTQsImV4cCI6MjA5ODIxNzMxNH0.EYNEFQqUR7ZV63XCHKo_RuS2tIJRxN1VfF6Tx3BAb3I';
const {createClient}=supabase;const db=createClient(SUPABASE_URL,SUPABASE_ANON_KEY);const dbAdmin=createClient(SUPABASE_URL,SUPABASE_SERVICE_KEY);
async function checkAuth(){const{data:{session}}=await db.auth.getSession();if(!session){window.location.href='/admin/login.html';return null;}return session;}
document.getElementById("logout-btn").addEventListener("click",async()=>{await db.auth.signOut();window.location.href="/admin/login.html";});
(async()=>{const s=await checkAuth();if(s)document.getElementById("admin-user").textContent=s.user.email;})();

async function loadAcct() {
  const { data: { user } } = await db.auth.getUser();
  if (user) document.getElementById('acct-info').innerHTML =
    '<strong>Email:</strong> ' + user.email + '<br><strong>Role:</strong> Admin<br><strong>Last Sign In:</strong> ' + (user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : '—');
}

document.getElementById('pw-form').addEventListener('submit', async e => {
  e.preventDefault();
  const msg = document.getElementById('pw-msg');
  const fd = new FormData(e.target);
  if (fd.get('new') !== fd.get('confirm')) { msg.style.color='#dc2626'; msg.textContent='Passwords do not match.'; msg.style.display='block'; return; }
  const { error } = await db.auth.updateUser({ password: fd.get('new') });
  if (error) { msg.style.color='#dc2626'; msg.textContent=error.message; }
  else { msg.style.color='#1b5e20'; msg.textContent='Password updated successfully.'; e.target.reset(); }
  msg.style.display='block';
});

checkAuth().then(s => { if (s) loadAcct(); });
