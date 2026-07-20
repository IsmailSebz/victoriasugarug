initNav();initFooter();initInquiryModal();
document.querySelectorAll('.faq-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const ans = btn.nextElementSibling;
    const icon = btn.querySelector('.faq-icon');
    const open = !ans.classList.contains('hidden');
    // close all
    document.querySelectorAll('.faq-ans').forEach(a => a.classList.add('hidden'));
    document.querySelectorAll('.faq-icon').forEach(i => { i.style.transform=''; i.innerHTML='<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>'; });
    if (!open) { ans.classList.remove('hidden'); icon.style.transform='rotate(45deg)'; }
  });
});
