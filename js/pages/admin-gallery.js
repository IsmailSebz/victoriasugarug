const SUPABASE_URL='https://ffsddbbtgoxbqlrnvcrm.supabase.co';
const SUPABASE_SERVICE_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmc2RkYmJ0Z294YnFscm52Y3JtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjY0MTMxNCwiZXhwIjoyMDk4MjE3MzE0fQ.OJVRH623HKsMbGah9Zj3zfHLQZOgAR1zNy6fHqJ-3JA';
const SUPABASE_ANON_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmc2RkYmJ0Z294YnFscm52Y3JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI2NDEzMTQsImV4cCI6MjA5ODIxNzMxNH0.EYNEFQqUR7ZV63XCHKo_RuS2tIJRxN1VfF6Tx3BAb3I';
const {createClient}=supabase;const db=createClient(SUPABASE_URL,SUPABASE_ANON_KEY);const dbAdmin=createClient(SUPABASE_URL,SUPABASE_SERVICE_KEY);
async function checkAuth(){const{data:{session}}=await db.auth.getSession();if(!session){window.location.href='/admin/login.html';return null;}return session;}
document.getElementById("logout-btn").addEventListener("click",async()=>{await db.auth.signOut();window.location.href="/admin/login.html";});
(async()=>{const s=await checkAuth();if(s)document.getElementById("admin-user").textContent=s.user.email;})();

let albums = [], filterAlbum = 'all';

async function loadGallery() {
  const { data: al } = await dbAdmin.from('gallery_albums').select('*').eq('is_published', true).order('sort_order', {ascending: true});
  albums = al || [];
  const alEl = document.getElementById('albums-list');
  alEl.innerHTML = '<button class="album-tab-btn ' + (filterAlbum==='all'?'active-tab':'') + '" onclick="setFilter('all')">All</button>' +
    albums.map(a => '<button class="album-tab-btn ' + (filterAlbum===a.id?'active-tab':'') + '" onclick="setFilter('' + a.id + '')">' + a.title + '</button>').join('');
  // populate select
  const sel = document.getElementById('photo-album-select');
  sel.innerHTML = '<option value="">No album</option>' + albums.map(a => '<option value="' + a.id + '">' + a.title + '</option>').join('');
  loadPhotos();
}

async function loadPhotos() {
  const grid = document.getElementById('photos-grid');
  let q = dbAdmin.from('gallery_items').select('id,url,thumbnail_url,title,album_id,type').order('sort_order', {ascending: true});
  if (filterAlbum !== 'all') q = q.eq('album_id', filterAlbum);
  const { data } = await q;
  if (!data || !data.length) { grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:3rem;color:#9ca3af;">No photos yet. Click + Add Photo to upload.</div>'; return; }
  grid.innerHTML = data.map(p =>
    '<div style="position:relative;border-radius:.75rem;overflow:hidden;aspect-ratio:1;background:#f3f4f6;">' +
    '<img src="' + (p.thumbnail_url || p.url) + '" style="width:100%;height:100%;object-fit:cover;">' +
    '<div style="position:absolute;inset:0;background:rgba(0,0,0,0);transition:background .2s;" onmouseover="this.style.background='rgba(0,0,0,.4)'" onmouseout="this.style.background='rgba(0,0,0,0)'">' +
    '<button onclick="deletePhoto('' + p.id + '')" style="position:absolute;top:.5rem;right:.5rem;background:rgba(220,38,38,.9);color:#fff;border:none;border-radius:.375rem;padding:.25rem .625rem;font-size:.75rem;font-weight:500;cursor:pointer;">Delete</button>' +
    (p.title ? '<p style="position:absolute;bottom:.5rem;left:.5rem;right:.5rem;color:#fff;font-size:.75rem;background:rgba(0,0,0,.5);padding:.25rem .5rem;border-radius:.25rem;">' + p.title + '</p>' : '') +
    '</div></div>'
  ).join('');
}

function setFilter(id) { filterAlbum = id; loadGallery(); }

function openAlbumModal() { document.getElementById('album-modal').style.display='flex'; }
function openItemModal() { document.getElementById('item-modal').style.display='flex'; }

document.getElementById('album-form').addEventListener('submit', async e => {
  e.preventDefault();
  const fd = new FormData(e.target);
  await dbAdmin.from('gallery_albums').insert([{title: fd.get('title'), description: fd.get('description'), is_published: true, sort_order: albums.length + 1}]);
  document.getElementById('album-modal').style.display = 'none';
  e.target.reset(); loadGallery();
});

// Preview on URL input
document.querySelector('#photo-form [name=url]').addEventListener('blur', e => {
  const url = e.target.value.trim();
  if (url) { document.getElementById('preview-img').src = url; document.getElementById('photo-preview').style.display='block'; }
});

document.getElementById('photo-form').addEventListener('submit', async e => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const err = document.getElementById('photo-err');
  err.style.display='none';
  const { error } = await dbAdmin.from('gallery_items').insert([{
    url: fd.get('url'), thumbnail_url: fd.get('url'), title: fd.get('title') || null,
    album_id: fd.get('album_id') || null, type: 'image', sort_order: 0
  }]);
  if (error) { err.textContent = error.message; err.style.display='block'; }
  else { document.getElementById('item-modal').style.display='none'; e.target.reset(); document.getElementById('photo-preview').style.display='none'; loadPhotos(); }
});

async function deletePhoto(id) {
  if (!confirm('Delete this photo?')) return;
  await dbAdmin.from('gallery_items').delete().eq('id', id);
  loadPhotos();
}

checkAuth().then(s => { if (s) loadGallery(); });
