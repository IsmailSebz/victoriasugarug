initNav();initFooter();initInquiryModal();
document.getElementById('contact-form').addEventListener('submit', async e => {
  e.preventDefault();
  const btn = document.getElementById('contact-submit');
  const err = document.getElementById('contact-error');
  const ok  = document.getElementById('contact-success');
  err.style.display='none'; ok.style.display='none';
  btn.disabled=true; btn.textContent='Sending...';
  const fd = new FormData(e.target);
  const { error } = await db.from('inquiries').insert([{
    name:fd.get('name'), email:fd.get('email'), phone:fd.get('phone'),
    subject:fd.get('subject'), message:fd.get('message'), status:'new'
  }]);
  if (error) { err.textContent='Failed to send. Please try WhatsApp.'; err.style.display='block'; }
  else { ok.textContent='Message sent! We will respond within 24 hours.'; ok.style.display='block'; e.target.reset(); }
  btn.disabled=false; btn.textContent='Send Message';
});
