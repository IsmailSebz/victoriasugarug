const SUPABASE_URL = 'https://ffsddbbtgoxbqlrnvcrm.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmc2RkYmJ0Z294YnFscm52Y3JtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjY0MTMxNCwiZXhwIjoyMDk4MjE3MzE0fQ.OJVRH623HKsMbGah9Zj3zfHLQZOgAR1zNy6fHqJ-3JA';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmc2RkYmJ0Z294YnFscm52Y3JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI2NDEzMTQsImV4cCI6MjA5ODIxNzMxNH0.EYNEFQqUR7ZV63XCHKo_RuS2tIJRxN1VfF6Tx3BAb3I';
const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const dbAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);


async function checkAuth() {
  const { data: { session } } = await db.auth.getSession();
  if (!session) { window.location.href = '/admin/login.html'; return null; }
  return session;
}

document.getElementById("logout-btn").addEventListener("click", async () => { await db.auth.signOut(); window.location.href = "/admin/login.html"; });
(async () => { const s = await checkAuth(); if (s) document.getElementById("admin-user").textContent = s.user.email; })();

async function loadStats() {
  const now = new Date().toISOString();
  const [newsRes, tendersRes, inqRes, subsRes] = await Promise.all([
    dbAdmin.from('news_articles').select('id', { count: 'exact', head: true }).eq('published', true),
    dbAdmin.from('tenders').select('id', { count: 'exact', head: true }).gte('deadline', now),
    dbAdmin.from('inquiries').select('id', { count: 'exact', head: true }).eq('is_read', false),
    dbAdmin.from('newsletter_subscribers').select('id', { count: 'exact', head: true }),
  ]);
  document.getElementById('stat-news').textContent    = newsRes.count ?? '—';
  document.getElementById('stat-tenders').textContent = tendersRes.count ?? '—';
  document.getElementById('stat-inq').textContent     = inqRes.count ?? '—';
  document.getElementById('stat-subs').textContent    = subsRes.count ?? '—';
}

async function loadRecentInquiries() {
  const { data } = await dbAdmin.from('inquiries').select('*').order('created_at', {ascending: false}).limit(5);
  const el = document.getElementById('recent-inq');
  if (!data || !data.length) { el.innerHTML = '<p style="color:#9ca3af;text-align:center;padding:1.5rem 0;">No inquiries yet.</p>'; return; }
  el.innerHTML = '<table style="width:100%;border-collapse:collapse;">' +
    '<thead><tr style="border-bottom:2px solid #f3f4f6;">' +
    '<th style="text-align:left;padding:.5rem .75rem;font-size:.75rem;color:#6b7280;font-weight:600;text-transform:uppercase;">Name</th>' +
    '<th style="text-align:left;padding:.5rem .75rem;font-size:.75rem;color:#6b7280;font-weight:600;text-transform:uppercase;">Subject</th>' +
    '<th style="text-align:left;padding:.5rem .75rem;font-size:.75rem;color:#6b7280;font-weight:600;text-transform:uppercase;">Date</th>' +
    '<th style="text-align:left;padding:.5rem .75rem;font-size:.75rem;color:#6b7280;font-weight:600;text-transform:uppercase;">Status</th>' +
    '</tr></thead><tbody>' +
    data.map(i =>
      '<tr style="border-bottom:1px solid #f9fafb;">' +
      '<td style="padding:.625rem .75rem;font-size:.875rem;color:#1f2937;font-weight:500;">' + (i.name || '') + '</td>' +
      '<td style="padding:.625rem .75rem;font-size:.875rem;color:#6b7280;">' + (i.subject || '') + '</td>' +
      '<td style="padding:.625rem .75rem;font-size:.75rem;color:#9ca3af;">' + (i.created_at ? new Date(i.created_at).toLocaleDateString() : '') + '</td>' +
      '<td style="padding:.625rem .75rem;"><span style="font-size:.6875rem;font-weight:600;padding:.2rem .5rem;border-radius:2rem;background:' + (!i.is_read?'#fef9c3':'#f0f7f1') + ';color:' + (!i.is_read?'#a16207':'#1b5e20') + ';">' + (!i.is_read?'Unread':'Read') + '</span></td>' +
      '</tr>'
    ).join('') + '</tbody></table>';
}

checkAuth().then(s => { if (s) { loadStats(); loadRecentInquiries(); } });
