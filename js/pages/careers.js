initNav();initFooter();initInquiryModal();

let selectedDept = 'all';

async function loadJobs() {
  const grid = document.getElementById('jobs-grid');
  let q = db.from('job_listings').select('*').eq('active', true).order('created_at', {ascending: false});
  if (selectedDept !== 'all') q = q.eq('department', selectedDept);
  const { data } = await q;
  if (!data || !data.length) { grid.innerHTML = '<div class="col-span-full text-center py-12 text-gray-400">No open positions in this department right now. Send your CV to hr@victoriasugar.com and we will keep it on file.</div>'; return; }
  grid.innerHTML = data.map(j => {
    const safeId = String(j.id).replace(/'/g, "\\'");
    const safeTitle = (j.title || '').replace(/'/g, "\\'");
    return (
      '<div class="card p-6">' +
      '<div style="display:flex;align-items:start;justify-content:space-between;gap:1rem;flex-wrap:wrap;">' +
      '<div style="flex:1;">' +
      '<span style="font-size:.6875rem;font-weight:600;color:#1b5e20;background:#f0f7f1;padding:.25rem .625rem;border-radius:2rem;text-transform:uppercase;">' + (j.department || 'General') + '</span>' +
      '<h3 style="font-family:Georgia,serif;font-weight:700;color:#0f3d12;margin:.5rem 0 .25rem;">' + j.title + '</h3>' +
      '<p style="color:#6b7280;font-size:.875rem;line-height:1.6;margin-bottom:.5rem;">' + (j.description || '') + '</p>' +
      '<div style="display:flex;gap:.75rem;flex-wrap:wrap;">' +
      (j.location ? '<span style="font-size:.75rem;color:#6b7280;">📍 ' + j.location + '</span>' : '') +
      (j.type ? '<span style="font-size:.75rem;color:#6b7280;">⏱ ' + j.type + '</span>' : '') +
      (j.closing_date ? '<span style="font-size:.75rem;color:#6b7280;">Closes: ' + new Date(j.closing_date).toLocaleDateString('en-UG',{day:'numeric',month:'short',year:'numeric'}) + '</span>' : '') +
      '</div></div>' +
      '<div style="flex-shrink:0;">' +
      '<button onclick="applyJob(\'' + safeId + '\',\'' + safeTitle + '\')" class="btn-primary text-sm px-4 py-2">Apply Now</button>' +
      '</div></div></div>'
    );
  }).join('');
}

function applyJob(id, title) {
  window.dispatchEvent(new CustomEvent('open-inquiry-modal'));
  // Pre-select career subject
  setTimeout(() => {
    const s = document.querySelector('#inq-form select[name=subject]');
    if (s) { for(let o of s.options) { if(o.value==='Career Inquiry') { o.selected=true; break; } } }
    const m = document.querySelector('#inq-form textarea[name=message]');
    if (m) m.value = 'I am interested in applying for the position of: ' + title + ' (Job ID: ' + id + ')';
  }, 200);
}

document.getElementById('dept-filter').addEventListener('change', e => { selectedDept = e.target.value; loadJobs(); });
loadJobs();
