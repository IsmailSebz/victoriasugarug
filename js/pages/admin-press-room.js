const SUPABASE_URL='https://ffsddbbtgoxbqlrnvcrm.supabase.co';
const SUPABASE_SERVICE_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmc2RkYmJ0Z294YnFscm52Y3JtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjY0MTMxNCwiZXhwIjoyMDk4MjE3MzE0fQ.OJVRH623HKsMbGah9Zj3zfHLQZOgAR1zNy6fHqJ-3JA';
const SUPABASE_ANON_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmc2RkYmJ0Z294YnFscm52Y3JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI2NDEzMTQsImV4cCI6MjA5ODIxNzMxNH0.EYNEFQqUR7ZV63XCHKo_RuS2tIJRxN1VfF6Tx3BAb3I';
const {createClient}=supabase;const db=createClient(SUPABASE_URL,SUPABASE_ANON_KEY);const dbAdmin=createClient(SUPABASE_URL,SUPABASE_SERVICE_KEY);
async function checkAuth(){const{data:{session}}=await db.auth.getSession();if(!session){window.location.href='/admin/login.html';return null;}return session;}
document.getElementById("logout-btn").addEventListener("click",async()=>{await db.auth.signOut();window.location.href="/admin/login.html";});
(async()=>{const s=await checkAuth();if(s)document.getElementById("admin-user").textContent=s.user.email;})();

let editId = null;
async function loadItems() {
  const { data } = await dbAdmin.from('press_releases').select('id,title,category,published,published_at').order('created_at',{ascending:false});
  const tb = document.getElementById('items-body');
  if (!data||!data.length) { tb.innerHTML='<tr><td colspan="5" style="text-align:center;padding:2rem;color:#9ca3af;">No press releases yet.</td></tr>'; return; }
  tb.innerHTML = data.map(p =>
    '<tr style="border-top:1px solid #f3f4f6;">' +
    '<td style="padding:.75rem;font-size:.875rem;color:#1f2937;font-weight:500;">'+p.title+'</td>'+
    '<td style="padding:.75rem;font-size:.875rem;color:#6b7280;">'+(p.category||'')+'</td>'+
    '<td style="padding:.75rem;font-size:.75rem;color:#9ca3af;">'+(p.published_at?new Date(p.published_at).toLocaleDateString():'')+'</td>'+
    '<td style="padding:.75rem;"><span style="font-size:.6875rem;font-weight:600;padding:.2rem .5rem;border-radius:2rem;background:'+(p.published?'#f0f7f1':'#f3f4f6')+';color:'+(p.published?'#1b5e20':'#6b7280')+'">'+(p.published?'Published':'Draft')+'</span></td>'+
    '<td style="padding:.75rem;text-align:right;white-space:nowrap;">'+
    '<button onclick="editItem(''+p.id+'')" style="color:#1b5e20;font-size:.8125rem;font-weight:500;background:none;border:none;cursor:pointer;margin-right:.5rem;">Edit</button>'+
    '<button onclick="deleteItem(''+p.id+'')" style="color:#dc2626;font-size:.8125rem;font-weight:500;background:none;border:none;cursor:pointer;">Delete</button></td></tr>'
  ).join('');
}
function openModal(data={}) {
  editId = data.id||null;
  const form = document.getElementById('item-form');
  form.querySelectorAll('[name]').forEach(el => {
    const v = data[el.name];
    if (el.type==='checkbox') el.checked = v!==undefined?v:true;
    else if (el.name==='published_at') el.value = v?v.split('T')[0]:new Date().toISOString().split('T')[0];
    else el.value = v||'';
  });
  document.getElementById('modal-title').textContent = editId?'Edit Press Release':'Add Press Release';
  document.getElementById('modal-overlay').style.display='flex';
  document.getElementById('form-error').style.display='none';
}
function closeModal() { document.getElementById('modal-overlay').style.display='none'; }
async function editItem(id) { const{data}=await dbAdmin.from('press_releases').select('*').eq('id',id).single(); openModal(data); }
async function deleteItem(id) { if(!confirm('Delete?'))return; await dbAdmin.from('press_releases').delete().eq('id',id); loadItems(); }
document.getElementById('item-form').addEventListener('submit', async e => {
  e.preventDefault();
  const btn=document.getElementById('form-submit'); const err=document.getElementById('form-error');
  btn.disabled=true; btn.textContent='Saving...'; err.style.display='none';
  const fd=new FormData(e.target);
  const payload={title:fd.get('title'),category:fd.get('category'),summary:fd.get('summary'),file_url:fd.get('file_url')||null,published_at:fd.get('published_at')?new Date(fd.get('published_at')).toISOString():new Date().toISOString(),published:fd.get('published')==='on'};
  const{error}=editId?await dbAdmin.from('press_releases').update(payload).eq('id',editId):await dbAdmin.from('press_releases').insert([payload]);
  if(error){err.textContent=error.message;err.style.display='block';}else{closeModal();loadItems();}
  btn.disabled=false; btn.textContent='Save';
});
checkAuth().then(s=>{if(s)loadItems();});
