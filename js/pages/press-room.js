initNav();initFooter();initInquiryModal();

async function loadPress() {
  const grid = document.getElementById('press-grid');
  const { data } = await db.from('press_releases').select('*').eq('published', true).order('published_at', {ascending: false});
  if (!data || !data.length) { grid.innerHTML = '<p class="text-gray-400 col-span-full text-center py-8">No press releases yet.</p>'; return; }
  grid.innerHTML = data.map(p =>
    '<div class="card p-6">' +
    '<span style="font-size:.6875rem;font-weight:600;color:#c8a84b;text-transform:uppercase;">' + (p.category || 'Press Release') + '</span>' +
    '<h3 style="font-family:Georgia,serif;font-weight:700;color:#0f3d12;margin:.25rem 0 .5rem;">' + p.title + '</h3>' +
    '<p style="color:#6b7280;font-size:.875rem;line-height:1.6;margin-bottom:1rem;">' + (p.summary || '') + '</p>' +
    '<div style="display:flex;align-items:center;justify-content:space-between;">' +
    '<span style="font-size:.75rem;color:#9ca3af;">' + (p.published_at ? new Date(p.published_at).toLocaleDateString('en-UG',{day:'numeric',month:'long',year:'numeric'}) : '') + '</span>' +
    (p.file_url ? '<a href="' + p.file_url + '" target="_blank" class="btn-secondary text-sm px-3 py-1.5">Download PDF</a>' : '') +
    '</div></div>'
  ).join('');
}
loadPress();
