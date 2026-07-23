/* ── footer.js ── renders full site footer ─── */
;(function() {

const PARTNER_LINKS = [
  { label: 'Yogi Steels',       href: 'https://yogisteels.com/' },
  { label: 'Gold Star Batteries',href: 'https://www.goldstarbattery.ug' },
  { label: 'Tarpo Plastics',    href: 'https://tarpoplastics.com/' },
  { label: 'Total Cables',      href: 'https://www.totalcablesltd.com' },
  { label: 'Parle G Sweets',    href: 'https://www.parlegsweets.com/' },
]

const PRODUCT_LINKS = [
  { label: 'Sugar',                href: '/products/sugar.html' },
  { label: 'Extra Neutral Alcohol',href: '/products/alcohol.html' },
  { label: 'Ethanol',              href: '/products/ethanol.html' },
  { label: 'Electricity',          href: '/products/electricity.html' },
  { label: 'Bulk Orders',          href: '/bulk-orders.html' },
  { label: 'Export Markets',       href: '/export.html' },
]

const WA_URL = 'https://wa.me/256749293610?text=Hello%20Victoria%20Sugar%20Limited%2C%20I%20would%20like%20to%20make%20an%20inquiry.'
const WA_SVG = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>`

function initFooter() {
  const el = document.getElementById('footer')
  if (!el) return

  const year = new Date().getFullYear()

  el.innerHTML = `
<footer style="background:#0a290c;color:#fff;">
  <div class="container-main" style="padding-top:4rem;padding-bottom:4rem;">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

      <!-- Brand -->
      <div>
        <div class="flex items-center gap-3 mb-5">
          <div class="bg-white rounded-lg p-1 flex-shrink-0" style="width:3rem;height:3rem;">
            <img src="/logo.jpg" alt="Victoria Sugar Limited" style="width:100%;height:100%;object-fit:contain;">
          </div>
          <div>
            <div style="font-family:Georgia,serif;font-weight:700;font-size:1.125rem;color:#fff;line-height:1.2;">Victoria Sugar</div>
            <div style="color:#c8a84b;font-size:.75rem;">Limited</div>
          </div>
        </div>
        <p style="color:#b4dab6;font-size:.875rem;line-height:1.7;margin-bottom:1.5rem;">
          Taste the Nature's Sweetness. A leading producer of sugar, ethanol, alcohol and electricity,
          committed to sustainable growth and community development.
        </p>
        <div class="flex items-center gap-3">
          <a href="#" aria-label="Facebook"  class="rounded-full flex items-center justify-center transition-colors" style="width:2.25rem;height:2.25rem;background:#145218;color:#fff;" onmouseover="this.style.background='#c8a84b'" onmouseout="this.style.background='#145218'">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a>
          <a href="#" aria-label="Twitter"   class="rounded-full flex items-center justify-center transition-colors" style="width:2.25rem;height:2.25rem;background:#145218;color:#fff;" onmouseover="this.style.background='#c8a84b'" onmouseout="this.style.background='#145218'">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg></a>
          <a href="#" aria-label="LinkedIn"  class="rounded-full flex items-center justify-center transition-colors" style="width:2.25rem;height:2.25rem;background:#145218;color:#fff;" onmouseover="this.style.background='#c8a84b'" onmouseout="this.style.background='#145218'">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg></a>
          <a href="#" aria-label="YouTube"   class="rounded-full flex items-center justify-center transition-colors" style="width:2.25rem;height:2.25rem;background:#145218;color:#fff;" onmouseover="this.style.background='#c8a84b'" onmouseout="this.style.background='#145218'">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#0a290c"/></svg></a>
        </div>
      </div>

      <!-- Partner Companies -->
      <div>
        <h3 style="font-family:Georgia,serif;font-weight:600;color:#c8a84b;font-size:.875rem;text-transform:uppercase;letter-spacing:.05em;margin-bottom:1.25rem;">Partner Companies</h3>
        <ul style="list-style:none;">
          ${PARTNER_LINKS.map(l => `<li style="margin-bottom:.625rem;"><a href="${l.href}" target="_blank" rel="noopener noreferrer" style="color:#b4dab6;text-decoration:none;font-size:.875rem;display:flex;align-items:center;gap:.5rem;transition:color .2s;" onmouseover="this.style.color='#c8a84b'" onmouseout="this.style.color='#b4dab6'"><span style="width:.25rem;height:.25rem;border-radius:50%;background:#c8a84b;flex-shrink:0;"></span>${l.label}</a></li>`).join('')}
        </ul>
      </div>

      <!-- Products -->
      <div>
        <h3 style="font-family:Georgia,serif;font-weight:600;color:#c8a84b;font-size:.875rem;text-transform:uppercase;letter-spacing:.05em;margin-bottom:1.25rem;">Our Products</h3>
        <ul style="list-style:none;">
          ${PRODUCT_LINKS.map(l => `<li style="margin-bottom:.625rem;"><a href="${l.href}" style="color:#b4dab6;text-decoration:none;font-size:.875rem;display:flex;align-items:center;gap:.5rem;transition:color .2s;" onmouseover="this.style.color='#c8a84b'" onmouseout="this.style.color='#b4dab6'"><span style="width:.25rem;height:.25rem;border-radius:50%;background:#c8a84b;flex-shrink:0;"></span>${l.label}</a></li>`).join('')}
        </ul>
      </div>

      <!-- Contact -->
      <div>
        <h3 style="font-family:Georgia,serif;font-weight:600;color:#c8a84b;font-size:.875rem;text-transform:uppercase;letter-spacing:.05em;margin-bottom:1.25rem;">Contact Us</h3>
        <ul style="list-style:none;space-y:1rem;">
          <li class="flex items-start gap-3 mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c8a84b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;margin-top:.2rem;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span style="color:#b4dab6;font-size:.875rem;line-height:1.6;">Plot No - 7, Ndibulungi Village, Luwero District, Uganda. P.O. Box 2228, Jinja</span>
          </li>
          <li class="mb-3">
            <a href="tel:+256749293610" style="color:#b4dab6;text-decoration:none;font-size:.875rem;display:flex;align-items:center;gap:.75rem;transition:color .2s;" onmouseover="this.style.color='#c8a84b'" onmouseout="this.style.color='#b4dab6'">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c8a84b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16z"/></svg>
              +256 749 293610
            </a>
          </li>
          <li class="mb-5">
            <a href="mailto:info@victoriasugar.com" style="color:#b4dab6;text-decoration:none;font-size:.875rem;display:flex;align-items:center;gap:.75rem;transition:color .2s;" onmouseover="this.style.color='#c8a84b'" onmouseout="this.style.color='#b4dab6'">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c8a84b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              info@victoriasugar.com
            </a>
          </li>
        </ul>
        <a href="${WA_URL}" target="_blank" rel="noopener"
           class="flex items-center justify-center gap-2 w-full rounded-lg font-semibold text-sm mb-2 py-2.5 transition-colors"
           style="background:#25D366;color:#fff;"
           onmouseover="this.style.background='#20b858'" onmouseout="this.style.background='#25D366'">
          ${WA_SVG} Chat on WhatsApp
        </a>
        <button onclick="window.dispatchEvent(new CustomEvent('open-inquiry-modal'))"
                class="w-full py-2.5 rounded-lg font-semibold text-sm transition-colors"
                style="border:1px solid #145218;color:#b4dab6;background:transparent;"
                onmouseover="this.style.borderColor='#c8a84b';this.style.color='#c8a84b'" onmouseout="this.style.borderColor='#145218';this.style.color='#b4dab6'">
          Send an Inquiry
        </button>
      </div>
    </div>
  </div>

  <!-- Bottom bar -->
  <div style="border-top:1px solid #145218;">
    <div class="container-main py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
      <p style="color:#4da052;font-size:.75rem;">© ${year} Victoria Sugar Limited. All rights reserved.</p>
      <div class="flex items-center gap-5">
        <a href="/sitemap.html" style="color:#4da052;font-size:.75rem;text-decoration:none;transition:color .2s;" onmouseover="this.style.color='#c8a84b'" onmouseout="this.style.color='#4da052'">Sitemap</a>
        <a href="/faqs.html"    style="color:#4da052;font-size:.75rem;text-decoration:none;transition:color .2s;" onmouseover="this.style.color='#c8a84b'" onmouseout="this.style.color='#4da052'">FAQs</a>
        <a href="/contact.html" style="color:#4da052;font-size:.75rem;text-decoration:none;transition:color .2s;" onmouseover="this.style.color='#c8a84b'" onmouseout="this.style.color='#4da052'">Contact</a>
      </div>
    </div>
  </div>
</footer>`
}

window.initFooter = initFooter
})()
