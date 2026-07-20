initNav();initFooter();initInquiryModal();

async function loadEvents() {
  const up = document.getElementById('upcoming-events');
  const ps = document.getElementById('past-events');
  const now = new Date().toISOString();
  const { data: upcoming } = await db.from('events').select('*').gte('event_date', now).order('event_date', {ascending: true}).limit(6);
  const { data: past } = await db.from('events').select('*').lt('event_date', now).order('event_date', {ascending: false}).limit(6);
  function renderEvent(e) {
    const d = e.event_date ? new Date(e.event_date) : null;
    return '<div class="card p-6 flex gap-4">' +
      '<div style="min-width:3.5rem;text-align:center;background:#f0f7f1;border-radius:.75rem;padding:.5rem;">' +
      '<div style="font-size:1.5rem;font-weight:700;color:#0f3d12;font-family:Georgia,serif;">' + (d ? d.getDate() : '') + '</div>' +
      '<div style="font-size:.6875rem;font-weight:600;color:#c8a84b;text-transform:uppercase;">' + (d ? d.toLocaleString('en',{month:'short'}) : '') + '</div>' +
      '<div style="font-size:.6875rem;color:#6b7280;">' + (d ? d.getFullYear() : '') + '</div>' +
      '</div>' +
      '<div>' +
      '<h3 style="font-family:Georgia,serif;font-weight:700;color:#0f3d12;margin-bottom:.25rem;">' + e.title + '</h3>' +
      (e.location ? '<p style="color:#6b7280;font-size:.8125rem;margin-bottom:.25rem;">📍 ' + e.location + '</p>' : '') +
      '<p style="color:#6b7280;font-size:.875rem;line-height:1.5;">' + (e.description || '') + '</p>' +
      '</div></div>';
  }
  up.innerHTML = upcoming && upcoming.length ? upcoming.map(renderEvent).join('') : '<p class="text-gray-400 text-center py-6">No upcoming events.</p>';
  ps.innerHTML = past && past.length ? past.map(renderEvent).join('') : '<p class="text-gray-400 text-center py-6">No past events to show.</p>';
}
loadEvents();
