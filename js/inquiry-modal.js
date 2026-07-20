function initInquiryModal() {
  const el = document.getElementById('inquiry-modal')
  if (!el) return

  el.innerHTML = `
<div id="inq-overlay" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:300;align-items:center;justify-content:center;padding:1rem;">
  <div style="background:#fff;border-radius:1rem;padding:2rem;max-width:32rem;width:100%;position:relative;max-height:90vh;overflow-y:auto;">
    <button id="inq-close" style="position:absolute;top:1rem;right:1rem;background:none;border:none;cursor:pointer;color:#6b7280;font-size:1.5rem;line-height:1;">&times;</button>
    <h2 style="font-family:Georgia,serif;font-size:1.5rem;color:#0f3d12;margin-bottom:.25rem;">Send an Inquiry</h2>
    <p style="color:#6b7280;font-size:.875rem;margin-bottom:1.5rem;">We'll get back to you within 24 hours.</p>
    <form id="inq-form">
      <div style="margin-bottom:1rem;">
        <label class="form-label">Full Name *</label>
        <input class="form-input" name="name" placeholder="Your full name" required>
      </div>
      <div style="margin-bottom:1rem;">
        <label class="form-label">Email Address *</label>
        <input class="form-input" type="email" name="email" placeholder="you@example.com" required>
      </div>
      <div style="margin-bottom:1rem;">
        <label class="form-label">Phone Number</label>
        <input class="form-input" name="phone" placeholder="+256 700 000 000">
      </div>
      <div style="margin-bottom:1rem;">
        <label class="form-label">Subject *</label>
        <select class="form-input" name="subject" required>
          <option value="">Select a subject</option>
          <option>Product Inquiry</option>
          <option>Bulk / Industrial Order</option>
          <option>Export Markets</option>
          <option>Outgrower Programme</option>
          <option>Career Inquiry</option>
          <option>Partnership</option>
          <option>General Inquiry</option>
        </select>
      </div>
      <div style="margin-bottom:1.5rem;">
        <label class="form-label">Message *</label>
        <textarea class="form-input" name="message" rows="4" placeholder="Tell us how we can help..." required></textarea>
      </div>
      <div id="inq-error" style="display:none;color:#dc2626;font-size:.875rem;margin-bottom:1rem;"></div>
      <div id="inq-success" style="display:none;color:#1b5e20;font-size:.875rem;margin-bottom:1rem;background:#f0f7f1;padding:.75rem 1rem;border-radius:.5rem;"></div>
      <button type="submit" id="inq-submit" class="btn-primary" style="width:100%;justify-content:center;">Send Inquiry</button>
    </form>
  </div>
</div>`

  const overlay = document.getElementById('inq-overlay')
  document.getElementById('inq-close').addEventListener('click', closeModal)
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal() })
  window.addEventListener('open-inquiry-modal', () => { overlay.style.display = 'flex' })

  function closeModal() { overlay.style.display = 'none' }

  document.getElementById('inq-form').addEventListener('submit', async e => {
    e.preventDefault()
    const btn = document.getElementById('inq-submit')
    const errEl = document.getElementById('inq-error')
    const okEl = document.getElementById('inq-success')
    errEl.style.display = 'none'; okEl.style.display = 'none'
    btn.disabled = true; btn.textContent = 'Sending...'
    const fd = new FormData(e.target)
    const data = { name: fd.get('name'), email: fd.get('email'), phone: fd.get('phone'), subject: fd.get('subject'), message: fd.get('message') }
    const { error } = await db.from('inquiries').insert([data])
    if (error) {
      errEl.textContent = 'Failed to send inquiry. Please try WhatsApp instead.'; errEl.style.display = 'block'
    } else {
      okEl.textContent = 'Thank you! We have received your inquiry and will respond within 24 hours.'; okEl.style.display = 'block'
      e.target.reset()
      setTimeout(closeModal, 3000)
    }
    btn.disabled = false; btn.textContent = 'Send Inquiry'
  })
}
