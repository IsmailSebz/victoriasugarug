const SUPABASE_URL='https://ffsddbbtgoxbqlrnvcrm.supabase.co';
const SUPABASE_SERVICE_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmc2RkYmJ0Z294YnFscm52Y3JtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjY0MTMxNCwiZXhwIjoyMDk4MjE3MzE0fQ.OJVRH623HKsMbGah9Zj3zfHLQZOgAR1zNy6fHqJ-3JA';
const SUPABASE_ANON_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmc2RkYmJ0Z294YnFscm52Y3JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI2NDEzMTQsImV4cCI6MjA5ODIxNzMxNH0.EYNEFQqUR7ZV63XCHKo_RuS2tIJRxN1VfF6Tx3BAb3I';
const {createClient}=supabase;const db=createClient(SUPABASE_URL,SUPABASE_ANON_KEY);const dbAdmin=createClient(SUPABASE_URL,SUPABASE_SERVICE_KEY);
async function checkAuth(){const{data:{session}}=await db.auth.getSession();if(!session){window.location.href='/admin/login.html';return null;}return session;}
document.getElementById("logout-btn").addEventListener("click",async()=>{await db.auth.signOut();window.location.href="/admin/login.html";});
(async()=>{const s=await checkAuth();if(s)document.getElementById("admin-user").textContent=s.user.email;})();

async function loadSubscribers() {
  const { data, count } = await dbAdmin.from('newsletter_subscribers').select('*', {count:'exact'}).order('subscribed_at', {ascending: false});
  document.getElementById('sub-count').textContent = (count || 0) + ' subscribers';
  const tb = document.getElementById('nl-body');
  if (!data || !data.length) { tb.innerHTML = '<tr><td colspan="3" style="text-align:center;padding:2rem;color:#9ca3af;">No subscribers yet.</td></tr>'; return; }
  tb.innerHTML = data.map(s =>
    '<tr style="border-top:1px solid #f3f4f6;">' +
    '<td style="padding:.75rem;font-size:.875rem;color:#1f2937;">' + s.email + '</td>' +
    '<td style="padding:.75rem;font-size:.75rem;color:#9ca3af;">' + (s.subscribed_at ? new Date(s.subscribed_at).toLocaleDateString() : '') + '</td>' +
    '<td style="padding:.75rem;text-align:right;"><button onclick="removeSubscriber('' + s.id + '','' + s.email.replace(/'/g,'') + '')" style="color:#dc2626;font-size:.8125rem;font-weight:500;background:none;border:none;cursor:pointer;">Remove</button></td>' +
    '</tr>'
  ).join('');
}
async function removeSubscriber(id, email) {
  if (!confirm('Remove ' + email + ' from the newsletter?')) return;
  await dbAdmin.from('newsletter_subscribers').delete().eq('id', id);
  loadSubscribers();
}
checkAuth().then(s => { if (s) loadSubscribers(); });
