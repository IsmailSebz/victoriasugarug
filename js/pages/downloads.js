initNav();initFooter();initInquiryModal();

async function loadDownloads() {
  const grid = document.getElementById('dl-grid');
  const { data } = await db.from('downloads').select('*').eq('published', true).order('created_at', {ascending: false});
  if (!data || !data.length) { grid.innerHTML = '<p class="text-gray-400 text-center py-8">No downloads available yet.</p>'; return; }
  grid.innerHTML = data.map(d =>
    '<div class="card p-6 flex items-center gap-4">' +
    '<div style="width:3.5rem;height:3.5rem;background:#f0f7f1;border-radius:.75rem;display:flex;align-items:center;justify-content:center;flex-shrink:0;">' +
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1b5e20" stroke-width="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>' +
    '</div>' +
    '<div style="flex:1;">' +
    '<h3 style="font-weight:600;color:#1f2937;margin-bottom:.125rem;">' + d.title + '</h3>' +
    '<p style="color:#6b7280;font-size:.8125rem;">' + (d.description || '') + '</p>' +
    '</div>' +
    '<a href="' + d.file_url + '" target="_blank" download class="btn-primary text-sm px-4 py-2" style="flex-shrink:0;">Download</a>' +
    '</div>'
  ).join('');
}
loadDownloads();
