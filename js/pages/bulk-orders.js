initNav();initFooter();initInquiryModal();
document.getElementById('bulk-form').addEventListener('submit', async e => {
  e.preventDefault();
  const btn = document.getElementById('bulk-btn');
  const msg = document.getElementById('bulk-msg');
  btn.disabled=true; btn.textContent='Sending...'; msg.style.display='none';
  const fd = new FormData(e.target);
  const subject = 'Bulk Order — ' + fd.get('product');
  const message = 'Company: ' + fd.get('company') + ', Volume: ' + fd.get('volume') + ', Notes: ' + fd.get('notes');
  const { error } = await db.from('inquiries').insert([{ name:fd.get('name'), email:fd.get('email'), subject, message }]);
  if (error) { msg.style.color='#dc2626'; msg.textContent='Error submitting. Please call us directly.'; }
  else { msg.style.color='#1b5e20'; msg.textContent='Inquiry received! Our commercial team will contact you within 24 hours.'; e.target.reset(); }
  msg.style.display='block'; btn.disabled=false; btn.textContent='Submit Inquiry';
});
