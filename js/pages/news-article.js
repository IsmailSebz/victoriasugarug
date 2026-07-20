initNav();initFooter();initInquiryModal();

async function loadArticle() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) { document.getElementById('article-content').innerHTML = '<p style="color:#dc2626;">Article not found.</p>'; return; }
  const { data, error } = await db.from('news').select('*').eq('id', id).single();
  if (error || !data) { document.getElementById('article-content').innerHTML = '<p style="color:#dc2626;">Article not found or no longer available.</p>'; return; }
  document.title = data.title + ' — Victoria Sugar Limited';
  document.getElementById('article-hero-title').textContent = data.title;
  document.getElementById('article-date').textContent = data.published_date ? new Date(data.published_date).toLocaleDateString('en-UG',{day:'numeric',month:'long',year:'numeric'}) : '';
  document.getElementById('article-category').textContent = 'News';
  if (data.cover_image_url) {
    document.getElementById('article-image').src = data.cover_image_url;
    document.getElementById('article-image').alt = data.title;
  } else {
    document.getElementById('article-image-wrap').style.display = 'none';
  }
  document.getElementById('article-body').innerHTML = data.body_html || data.excerpt || '';
  // load recent
  const { data: recent } = await db.from('news').select('id,title,cover_image_url,published_date').eq('is_published',true).neq('id',id).order('published_date',{ascending:false}).limit(3);
  if (recent && recent.length) {
    document.getElementById('recent-posts').innerHTML = recent.map(r =>
      '<a href="/news/article.html?id=' + r.id + '" class="flex gap-3 items-start py-3 border-b border-gray-100 last:border-0" style="text-decoration:none;">' +
      (r.cover_image_url ? '<img src="' + r.cover_image_url + '" style="width:4rem;height:3rem;object-fit:cover;border-radius:.375rem;flex-shrink:0;">' : '<div style="width:4rem;height:3rem;background:#f0f7f1;border-radius:.375rem;flex-shrink:0;"></div>') +
      '<div><p style="font-size:.8125rem;font-weight:600;color:#0f3d12;line-height:1.4;" class="line-clamp-2">' + r.title + '</p>' +
      '<p style="font-size:.75rem;color:#9ca3af;margin-top:.2rem;">' + (r.published_date ? new Date(r.published_date).toLocaleDateString('en-UG',{month:'short',day:'numeric',year:'numeric'}) : '') + '</p>' +
      '</div></a>'
    ).join('');
  }
}
loadArticle();
