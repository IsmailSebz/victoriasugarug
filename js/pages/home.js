initNav(); initFooter(); initInquiryModal();

// ── Intro video ────────────────────────────────────────────────────────────
let videoPlaying = false;
function toggleVideo(videodiv) {
  const key = videodiv.replace('-video', '');
  const v = document.getElementById(videodiv);
  const ov = document.getElementById('video-overlay-' + key);
  const pi = document.getElementById('play-icon-' + key);
  const pa = document.getElementById('pause-icon-' + key);
  if (v.paused) {
    v.play(); videoPlaying = true;
    ov.style.opacity = '0'; pi.style.display = 'none'; pa.style.display = '';
  } else {
    v.pause(); videoPlaying = false;
    ov.style.opacity = '1'; pi.style.display = ''; pa.style.display = 'none';
  }
}
function videoEnded(videodiv) {
  const key = videodiv.replace('-video', '');
  document.getElementById('video-overlay-' + key).style.opacity = '1';
  document.getElementById('play-icon-' + key).style.display = '';
  document.getElementById('pause-icon-' + key).style.display = 'none';
  videoPlaying = false;
}
function toggleMute(videodiv) {
  const key = videodiv.replace('-video', '');
  const v = document.getElementById(videodiv);
  v.muted = !v.muted;
  document.getElementById('mute-icon-' + key).style.display   = v.muted ? '' : 'none';
  document.getElementById('unmute-icon-' + key).style.display = v.muted ? 'none' : '';
}

// ── Auto-sliding carousel (gallery + news), with manual prev/next ───────────
function initCarousel(track) {
  const n = track.children.length;
  if (track._carouselTimer) clearInterval(track._carouselTimer);
  if (n <= 1) return;

  let animating = false;

  function stepWidth() {
    const first = track.children[0];
    const marginRight = parseFloat(getComputedStyle(first).marginRight) || 0;
    return first.getBoundingClientRect().width + marginRight;
  }

  function next() {
    if (animating) return;
    animating = true;
    const w = stepWidth();
    track.style.transition = 'transform .5s ease';
    track.style.transform = `translateX(-${w}px)`;
    track.addEventListener('transitionend', function handler() {
      track.removeEventListener('transitionend', handler);
      track.style.transition = 'none';
      track.appendChild(track.firstElementChild);
      track.style.transform = 'translateX(0)';
      animating = false;
    }, { once: true });
  }

  function prev() {
    if (animating) return;
    animating = true;
    const w = stepWidth();
    track.style.transition = 'none';
    track.insertBefore(track.lastElementChild, track.firstElementChild);
    track.style.transform = `translateX(-${w}px)`;
    // force reflow so the browser applies the jump before animating back
    void track.offsetHeight;
    track.style.transition = 'transform .5s ease';
    track.style.transform = 'translateX(0)';
    track.addEventListener('transitionend', function handler() {
      track.removeEventListener('transitionend', handler);
      animating = false;
    }, { once: true });
  }

  function restartAutoplay() {
    if (track._carouselTimer) clearInterval(track._carouselTimer);
    track._carouselTimer = setInterval(next, 2000);
  }

  track._carouselNext = next;
  track._carouselPrev = prev;
  track._carouselRestart = restartAutoplay;

  track.style.transition = 'transform .5s ease';
  track.style.transform = 'translateX(0)';
  restartAutoplay();
}

function carouselNav(trackId, dir) {
  const track = document.getElementById(trackId);
  if (!track || !track._carouselNext) return;
  if (dir > 0) track._carouselNext(); else track._carouselPrev();
  track._carouselRestart();
}

// ── Load news ──────────────────────────────────────────────────────────────
async function loadNews() {
  const { data, error } = await db.from('news').select('*').eq('is_published', true).order('published_date', { ascending: false }).limit(3);
  const el = document.getElementById('news-grid');
  if (error || !data || !data.length) {
    el.innerHTML = '<div class="col-span-full text-center py-8 text-gray-400">No news articles yet.</div>';
    return;
  }
  el.innerHTML = data.map(a => `
    <a href="/news/article.html?id=${a.id}" class="card group news-slide" style="text-decoration:none;">
      ${a.cover_image_url ? `<div style="height:12rem;overflow:hidden;"><img src="${a.cover_image_url}" alt="${a.title}" style="width:100%;height:100%;object-fit:cover;transition:transform .5s;" class="group-hover:scale-105"></div>` : '<div style="height:12rem;background:linear-gradient(135deg,#f0f7f1,#d9edd9);display:flex;align-items:center;justify-content:center;"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1b5e20" stroke-width="1"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div>'}
      <div style="padding:1.25rem;">
        <span style="font-size:.6875rem;font-weight:600;color:#c8a84b;text-transform:uppercase;letter-spacing:.05em;">News</span>
        <h3 style="font-family:Georgia,serif;font-weight:700;font-size:1rem;color:#0f3d12;margin:.25rem 0 .5rem;line-height:1.4;" class="line-clamp-2">${a.title}</h3>
        <p style="color:#6b7280;font-size:.875rem;line-height:1.5;" class="line-clamp-2">${a.excerpt || ''}</p>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-top:1rem;">
          <span style="font-size:.75rem;color:#9ca3af;">${a.published_date ? new Date(a.published_date).toLocaleDateString('en-UG',{day:'numeric',month:'short',year:'numeric'}) : ''}</span>
          <span style="color:#1b5e20;font-size:.8125rem;font-weight:600;">Read more →</span>
        </div>
      </div>
    </a>`).join('');
  initCarousel(el);
}

// ── Load gallery preview ───────────────────────────────────────────────────
async function loadGallery() {
  const { data } = await db.from('gallery_items').select('id,url,thumbnail_url,title').order('sort_order',{ascending:true}).limit(8);
  const el = document.getElementById('gallery-preview');
  if (!data || !data.length) { el.innerHTML = '<div class="text-center py-8 text-gray-400" style="flex:1;">Gallery coming soon.</div>'; return; }
  el.innerHTML = data.map(item => `
    <div class="gallery-slide" style="border-radius:.75rem;overflow:hidden;aspect-ratio:1;cursor:pointer;" onclick="window.location='/gallery/'">
      <img src="${item.thumbnail_url || item.url}" alt="${item.title || 'Gallery'}" style="width:100%;height:100%;object-fit:cover;transition:transform .5s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform=''">
    </div>`).join('');
  initCarousel(el);
}

loadNews(); loadGallery();
