initNav();initFooter();initInquiryModal();

let albums = [], selectedAlbum = 'all';

async function loadAlbums() {
  const { data } = await db.from('gallery_albums').select('*').eq('is_published', true).order('sort_order', {ascending: true});
  albums = data || [];
  const el = document.getElementById('album-tabs');
  el.innerHTML = '<button class="album-tab active-tab" data-id="all">All Photos</button>' +
    albums.map(a => '<button class="album-tab" data-id="' + a.id + '">' + a.title + '</button>').join('');
  el.querySelectorAll('.album-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      el.querySelectorAll('.album-tab').forEach(b => b.classList.remove('active-tab'));
      btn.classList.add('active-tab');
      selectedAlbum = btn.dataset.id;
      loadItems();
    });
  });
  loadItems();
}

async function loadItems() {
  const grid = document.getElementById('gallery-grid');
  grid.innerHTML = '<div class="col-span-full text-center py-8 text-gray-400">Loading...</div>';
  let q = db.from('gallery_items').select('*').order('sort_order', {ascending: true});
  if (selectedAlbum !== 'all') q = q.eq('album_id', selectedAlbum);
  const { data } = await q;
  if (!data || !data.length) { grid.innerHTML = '<div class="col-span-full text-center py-8 text-gray-400">No photos in this album yet.</div>'; return; }
  grid.innerHTML = data.map((item, i) =>
    '<div style="border-radius:.75rem;overflow:hidden;aspect-ratio:1;cursor:pointer;position:relative;" onclick="openLightbox(' + i + ')">' +
    '<img src="' + (item.thumbnail_url || item.url) + '" alt="' + (item.title || 'Gallery') + '" style="width:100%;height:100%;object-fit:cover;transition:transform .5s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform=''">' +
    (item.type === 'video' ? '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.15);pointer-events:none;"><svg width="36" height="36" viewBox="0 0 24 24" fill="rgba(255,255,255,.9)"><circle cx="12" cy="12" r="11" fill="rgba(15,61,18,.55)"/><polygon points="10,8 17,12 10,16"/></svg></div>' : '') +
    '</div>'
  ).join('');
  // store for lightbox
  window._galleryItems = data;
}

function openLightbox(i) {
  window._lbIdx = i;
  const item = window._galleryItems[i];
  const img = document.getElementById('lb-img');
  const existingVideo = document.getElementById('lb-video');
  if (existingVideo) existingVideo.remove();
  if (item.type === 'video') {
    img.style.display = 'none';
    const v = document.createElement('video');
    v.id = 'lb-video'; v.src = item.url; v.controls = true; v.autoplay = true;
    v.style.cssText = 'max-width:90vw;max-height:80vh;border-radius:.75rem;';
    if (item.thumbnail_url) v.poster = item.thumbnail_url;
    img.insertAdjacentElement('afterend', v);
  } else {
    img.style.display = '';
    img.src = item.url;
  }
  document.getElementById('lb-cap').textContent = item.title || '';
  document.getElementById('lightbox').classList.add('open');
}
function closeLb() {
  document.getElementById('lightbox').classList.remove('open');
  const v = document.getElementById('lb-video');
  if (v) { v.pause(); v.remove(); }
}
function prevLb() { openLightbox((window._lbIdx - 1 + window._galleryItems.length) % window._galleryItems.length); }
function nextLb() { openLightbox((window._lbIdx + 1) % window._galleryItems.length); }
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLb();
  if (e.key === 'ArrowLeft') prevLb();
  if (e.key === 'ArrowRight') nextLb();
});

loadAlbums();
