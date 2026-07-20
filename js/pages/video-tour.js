initNav();initFooter();initInquiryModal();
function toggleVid() {
  var v = document.getElementById('tour-vid');
  var o = document.getElementById('tour-overlay');
  if (v.paused) { v.play(); o.style.opacity='0'; } else { v.pause(); o.style.opacity='1'; }
}
function vidEnded() { document.getElementById('tour-overlay').style.opacity='1'; }
