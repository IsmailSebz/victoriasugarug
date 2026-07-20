initNav();initFooter();initInquiryModal();

async function loadTenders() {
  const open = document.getElementById('open-tenders');
  const closed = document.getElementById('closed-tenders');
  const now = new Date().toISOString();
  const { data: openData } = await db.from('tenders').select('*').gte('deadline', now).order('deadline', {ascending: true});
  const { data: closedData } = await db.from('tenders').select('*').lt('deadline', now).order('deadline', {ascending: false}).limit(5);
  function renderTender(t, isOpen) {
    const dl = t.deadline ? new Date(t.deadline) : null;
    return '<div class="card p-6">' +
      '<div style="display:flex;align-items:start;justify-content:space-between;gap:1rem;flex-wrap:wrap;">' +
      '<div style="flex:1;">' +
      '<span style="font-size:.6875rem;font-weight:600;color:' + (isOpen ? '#1b5e20' : '#6b7280') + ';background:' + (isOpen ? '#f0f7f1' : '#f3f4f6') + ';padding:.25rem .625rem;border-radius:2rem;text-transform:uppercase;">' + (isOpen ? 'Open' : 'Closed') + '</span>' +
      '<h3 style="font-family:Georgia,serif;font-weight:700;color:#0f3d12;margin:.5rem 0 .25rem;">' + t.title + '</h3>' +
      '<p style="color:#6b7280;font-size:.875rem;line-height:1.6;margin-bottom:.5rem;">' + (t.description || '') + '</p>' +
      (t.reference ? '<p style="font-size:.75rem;color:#9ca3af;">Ref: ' + t.reference + '</p>' : '') +
      '</div>' +
      '<div style="text-align:right;flex-shrink:0;">' +
      (dl ? '<p style="font-size:.75rem;color:#6b7280;font-weight:500;">' + (isOpen ? 'Deadline: ' : 'Closed: ') + dl.toLocaleDateString('en-UG',{day:'numeric',month:'short',year:'numeric'}) + '</p>' : '') +
      (t.file_url && isOpen ? '<a href="' + t.file_url + '" target="_blank" class="btn-primary text-sm px-3 py-1.5 mt-2" style="display:inline-block;">Download</a>' : '') +
      '</div></div></div>';
  }
  open.innerHTML = openData && openData.length ? openData.map(t => renderTender(t, true)).join('') : '<p class="text-gray-400 text-center py-6">No open tenders at this time. Check back soon.</p>';
  closed.innerHTML = closedData && closedData.length ? closedData.map(t => renderTender(t, false)).join('') : '<p class="text-gray-400 text-center py-4">No recent closed tenders.</p>';
}
loadTenders();
