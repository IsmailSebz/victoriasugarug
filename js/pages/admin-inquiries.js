const SUPABASE_URL='https://ffsddbbtgoxbqlrnvcrm.supabase.co';
const SUPABASE_SERVICE_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmc2RkYmJ0Z294YnFscm52Y3JtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjY0MTMxNCwiZXhwIjoyMDk4MjE3MzE0fQ.OJVRH623HKsMbGah9Zj3zfHLQZOgAR1zNy6fHqJ-3JA';
const SUPABASE_ANON_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmc2RkYmJ0Z294YnFscm52Y3JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI2NDEzMTQsImV4cCI6MjA5ODIxNzMxNH0.EYNEFQqUR7ZV63XCHKo_RuS2tIJRxN1VfF6Tx3BAb3I';
const {createClient}=supabase;const db=createClient(SUPABASE_URL,SUPABASE_ANON_KEY);const dbAdmin=createClient(SUPABASE_URL,SUPABASE_SERVICE_KEY);
async function checkAuth(){const{data:{session}}=await db.auth.getSession();if(!session){window.location.href='/admin/login.html';return null;}return session;}
document.getElementById("logout-btn").addEventListener("click",async()=>{await db.auth.signOut();window.location.href="/admin/login.html";});
(async()=>{const s=await checkAuth();if(s)document.getElementById("admin-user").textContent=s.user.email;})();

let currentInqId = null;
async function loadItems() {
  const filter = document.getElementById('status-filter').value;
  let q = dbAdmin.from('inquiries').select('*').order('created_at', {ascending: false}).limit(50);
  if (filter === 'unread') q = q.eq('is_read', false);
  if (filter === 'read') q = q.eq('is_read', true);
  const { data, error } = await q;
  if (error) console.error('loadItems failed:', error);
  const tb = document.getElementById('inq-body');
  if (!data || !data.length) { tb.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:2rem;color:#9ca3af;">No inquiries found.</td></tr>'; return; }
  tb.innerHTML = data.map(i =>
    '<tr style="border-top:1px solid #f3f4f6;cursor:pointer;" onclick="viewInquiry(\'' + i.id + '\')">' +
    '<td style="padding:.75rem;font-size:.875rem;color:#1f2937;font-weight:500;">' + (i.name||'') + '</td>' +
    '<td style="padding:.75rem;font-size:.875rem;color:#6b7280;">' + (i.email||'') + '</td>' +
    '<td style="padding:.75rem;font-size:.875rem;color:#6b7280;">' + (i.subject||'') + '</td>' +
    '<td style="padding:.75rem;font-size:.75rem;color:#9ca3af;">' + (i.created_at?new Date(i.created_at).toLocaleDateString():'') + '</td>' +
    '<td style="padding:.75rem;"><span style="font-size:.6875rem;font-weight:600;padding:.2rem .5rem;border-radius:2rem;background:' + (!i.is_read?'#fef9c3':'#f0f7f1') + ';color:' + (!i.is_read?'#a16207':'#1b5e20') + ';">' + (!i.is_read?'Unread':'Read') + '</span></td>' +
    '<td style="padding:.75rem;text-align:right;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></td>' +
    '</tr>'
  ).join('');
}

async function viewInquiry(id) {
  currentInqId = id;
  const { data } = await dbAdmin.from('inquiries').select('*').eq('id', id).single();
  if (!data) return;
  document.getElementById('inq-detail-content').innerHTML =
    '<table style="width:100%;border-collapse:collapse;">' +
    [['Name', data.name],['Email','<a href="mailto:'+data.email+'" style="color:#1b5e20;">'+data.email+'</a>'],
     ['Phone',data.phone||'—'],['Subject',data.subject||'—'],
     ['Date', data.created_at?new Date(data.created_at).toLocaleString():'']
    ].map(([k,v]) => '<tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:.625rem 0;font-size:.875rem;color:#6b7280;width:40%;">'+k+'</td><td style="padding:.625rem 0;font-size:.875rem;color:#1f2937;font-weight:500;">'+v+'</td></tr>').join('') +
    '</table>' +
    '<div style="margin-top:1.25rem;"><p style="font-size:.875rem;color:#6b7280;font-weight:500;margin-bottom:.5rem;">Message:</p>' +
    '<div style="background:#f9fafb;border-radius:.5rem;padding:1rem;font-size:.875rem;color:#374151;line-height:1.7;">' + (data.message||'') + '</div></div>';
  document.getElementById('inq-detail').style.display = 'flex';
  if (!data.is_read) await dbAdmin.from('inquiries').update({is_read:true}).eq('id', id);
}

async function markRead(isRead) {
  if (!currentInqId) return;
  await dbAdmin.from('inquiries').update({is_read:isRead}).eq('id', currentInqId);
  document.getElementById('inq-detail').style.display = 'none';
  loadItems();
}

document.getElementById('status-filter').addEventListener('change', loadItems);
checkAuth().then(s => { if (s) loadItems(); });
