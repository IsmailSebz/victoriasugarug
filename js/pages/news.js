initNav();initFooter();initInquiryModal();

let page = 1, perPage = 9, totalCount = 0, searchQ = '';

async function loadNews() {
  const grid = document.getElementById('news-grid');
  const pag  = document.getElementById('pagination');
  grid.innerHTML = '<div class="col-span-full text-center py-12 text-gray-400">Loading...</div>';
  let q = db.from('news').select('*', { count: 'exact' }).eq('is_published', true);
  if (searchQ) q = q.ilike('title', '%' + searchQ + '%');
  q = q.order('published_date', { ascending: false }).range((page-1)*perPage, page*perPage-1);
  const { data, count, error } = await q;
  totalCount = count || 0;
  if (error || !data || !data.length) {
    grid.innerHTML = '<div class="col-span-full text-center py-12 text-gray-400">No articles found.</div>';
    pag.innerHTML=''; return;
  }
  grid.innerHTML = data.map(a =>
    '<a href="/news/article.html?id=' + a.id + '" class="card group" style="text-decoration:none;">' +
    (a.cover_image_url ? '<div style="height:13rem;overflow:hidden;"><img src="' + a.cover_image_url + '" alt="' + a.title + '" style="width:100%;height:100%;object-fit:cover;transition:transform .5s;" class="group-hover:scale-105"></div>'
                 : '<div style="height:13rem;background:linear-gradient(135deg,#f0f7f1,#d9edd9);display:flex;align-items:center;justify-content:center;"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1b5e20" stroke-width="1"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div>') +
    '<div style="padding:1.25rem;">' +
    '<span style="font-size:.6875rem;font-weight:600;color:#c8a84b;text-transform:uppercase;">News</span>' +
    '<h3 style="font-family:Georgia,serif;font-weight:700;font-size:1rem;color:#0f3d12;margin:.25rem 0 .5rem;line-height:1.4;" class="line-clamp-2">' + a.title + '</h3>' +
    '<p style="color:#6b7280;font-size:.875rem;line-height:1.5;" class="line-clamp-2">' + (a.excerpt || '') + '</p>' +
    '<div style="display:flex;align-items:center;justify-content:space-between;margin-top:1rem;">' +
    '<span style="font-size:.75rem;color:#9ca3af;">' + (a.published_date ? new Date(a.published_date).toLocaleDateString('en-UG',{day:'numeric',month:'short',year:'numeric'}) : '') + '</span>' +
    '<span style="color:#1b5e20;font-size:.8125rem;font-weight:600;">Read more →</span></div>' +
    '</div></a>'
  ).join('');
  const pages = Math.ceil(totalCount / perPage);
  pag.innerHTML = pages <= 1 ? '' :
    '<div style="display:flex;gap:.5rem;justify-content:center;margin-top:2rem;">' +
    (page > 1 ? '<button onclick="changePage(' + (page-1) + ')" class="btn-secondary text-sm px-4 py-2">← Prev</button>' : '') +
    '<span style="padding:.5rem 1rem;background:#f3f4f6;border-radius:.375rem;font-size:.875rem;">Page ' + page + ' of ' + pages + '</span>' +
    (page < pages ? '<button onclick="changePage(' + (page+1) + ')" class="btn-primary text-sm px-4 py-2">Next →</button>' : '') +
    '</div>';
}
function changePage(n) { page = n; loadNews(); window.scrollTo(0,0); }

document.getElementById('search-input').addEventListener('input', e => { searchQ = e.target.value.trim(); page=1; loadNews(); });

loadNews();
