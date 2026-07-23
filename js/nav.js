/* ── nav.js ── renders full navbar + WhatsApp button ─── */
;(function() {

const WA = '256749293610'
const WA_URL = `https://wa.me/${WA}?text=Hello%20Victoria%20Sugar%20Limited%2C%20I%20would%20like%20to%20make%20an%20inquiry.`
const LOGO = '/logo.jpg'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about.html' },
  { label: 'Our Products', href: '/products/', children: [
      { label: 'All Products',         href: '/products/' },
      { label: 'Sugar',                href: '/products/sugar.html' },
      { label: 'Extra Neutral Alcohol',href: '/products/alcohol.html' },
      { label: 'Ethanol',              href: '/products/ethanol.html' },
      { label: 'Electricity',          href: '/products/electricity.html' },
  ]},
  { label: 'Media', href: '/news/', children: [
      { label: 'News & Media', href: '/news/' },
      { label: 'Gallery',      href: '/gallery/' },
      { label: 'Downloads',    href: '/downloads/' },
      { label: 'Events',       href: '/events/' },
  ]},
  { label: 'Careers', href: '/careers/'},
  { label: 'Contact', href: '/contact.html' },
]

function isActive(href) {
  const p = window.location.pathname.replace(/\/$/, '') || '/'
  const h = href.replace(/\/$/, '') || '/'
  return p === h || (h !== '/' && p.startsWith(h.replace('.html','')))
}

function buildDesktopLinks() {
  return NAV_LINKS.map(link => {
    const active = isActive(link.href)
    if (!link.children) {
      return `<a href="${link.href}" class="px-3 py-2 text-sm font-medium rounded-md transition-colors ${active ? 'text-green-600 bg-green-50' : 'text-gray-700 hover:text-green-600 hover:bg-green-50'}">${link.label}</a>`
    }
    return `
      <div class="nav-item relative">
        <a href="${link.href}" class="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${active ? 'text-green-600 bg-green-50' : 'text-gray-700 hover:text-green-600 hover:bg-green-50'}">
          ${link.label}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </a>
        <div class="nav-dropdown">
          ${link.children.map(c => `<a href="${c.href}">${c.label}</a>`).join('')}
        </div>
      </div>`
  }).join('')
}

function buildMobileLinks() {
  return NAV_LINKS.map((link, i) => {
    if (!link.children) {
      return `<a href="${link.href}" class="block py-2.5 px-3 text-gray-700 font-medium hover:text-green-600 rounded-lg hover:bg-green-50 transition-colors">${link.label}</a>`
    }
    return `
      <div>
        <div class="flex items-center justify-between">
          <a href="${link.href}" class="flex-1 py-2.5 px-3 text-gray-700 font-medium hover:text-green-600 rounded-lg hover:bg-green-50 transition-colors">${link.label}</a>
          <button class="mobile-expand p-2 text-gray-500" data-idx="${i}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
        </div>
        <div class="mobile-sub hidden ml-4 mt-1 space-y-1 border-l-2 border-green-100 pl-3">
          ${link.children.map(c => `<a href="${c.href}" class="block py-2 px-2 text-sm text-gray-600 hover:text-green-600 rounded transition-colors">${c.label}</a>`).join('')}
        </div>
      </div>`
  }).join('')
}

function initNav() {
  const el = document.getElementById('navbar')
  if (!el) return

  el.innerHTML = `
<!-- Top bar -->
<div class="hidden lg:block bg-green-900 text-white text-sm py-2">
  <div class="container-main flex items-center justify-between">
    <div class="flex items-center gap-6">
      <a href="tel:+256749293610" class="flex items-center gap-1.5 hover:text-yellow-300 transition-colors">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14z"/></svg>
        +256 749 293610
      </a>
      <a href="mailto:info@victoriasugar.com" class="flex items-center gap-1.5 hover:text-yellow-300 transition-colors">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        info@victoriasugar.com
      </a>
    </div>
    <a href="${WA_URL}" target="_blank" rel="noopener" class="bg-green-700 hover:bg-green-600 px-3 py-1 rounded text-xs font-medium transition-colors">WhatsApp Us</a>
  </div>
</div>

<!-- Main header -->
<header id="main-header" class="sticky top-0 z-50 bg-white shadow-sm transition-shadow duration-300">
  <div class="container-main">
    <div class="flex items-center justify-between h-16 lg:h-20">
      <!-- Logo -->
      <a href="/" class="flex items-center gap-3 flex-shrink-0">
        <img src="${LOGO}" alt="Victoria Sugar Limited" class="w-12 h-12 lg:w-14 lg:h-14 object-contain">
        <div class="hidden sm:block">
          <div class="text-green-700 font-bold text-base lg:text-lg leading-tight" style="font-family:Georgia,serif;">Victoria Sugar</div>
          <div class="text-xs font-medium tracking-wide" style="color:#c8a84b;">Limited</div>
        </div>
      </a>

      <!-- Desktop nav -->
      <nav class="hidden lg:flex items-center gap-1">${buildDesktopLinks()}</nav>

      <!-- CTA + mobile toggle -->
      <div class="flex items-center gap-3">
        <a href="${WA_URL}" target="_blank" rel="noopener"
           class="hidden lg:flex items-center gap-2 px-4 py-2 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
           style="background:#25D366;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          WhatsApp
        </a>
        <button id="nav-inquiry-btn" class="hidden lg:block btn-secondary text-sm px-4 py-2">Send Inquiry</button>
        <button id="mobile-menu-btn" class="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100">
          <svg id="menu-icon-open" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          <svg id="menu-icon-close" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="hidden"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile menu -->
  <div id="mobile-menu" class="hidden lg:hidden border-t border-gray-100 bg-white max-h-[75vh] overflow-y-auto">
    <div class="container-main py-4 space-y-1">
      ${buildMobileLinks()}
      <div class="pt-4 border-t border-gray-100 mt-3 space-y-3">
        <a href="${WA_URL}" target="_blank" rel="noopener"
           class="flex items-center justify-center gap-2 w-full py-3 text-white font-semibold rounded-lg"
           style="background:#25D366;">WhatsApp Us</a>
        <button id="mobile-inquiry-btn" class="btn-secondary w-full justify-center">Send Inquiry</button>
      </div>
    </div>
  </div>
</header>

<!-- Fixed WhatsApp button -->
<a href="${WA_URL}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp"
   class="fixed bottom-6 right-6 z-50 w-14 h-14 flex items-center justify-center text-white rounded-full shadow-2xl whatsapp-pulse hover:scale-110 transition-transform duration-200"
   style="background:#25D366;">
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
</a>`

  // scroll shadow
  window.addEventListener('scroll', () => {
    document.getElementById('main-header').classList.toggle('shadow-lg', window.scrollY > 20)
  })

  // mobile menu toggle
  document.getElementById('mobile-menu-btn').addEventListener('click', () => {
    const m = document.getElementById('mobile-menu')
    const isOpen = !m.classList.contains('hidden')
    m.classList.toggle('hidden')
    document.getElementById('menu-icon-open').classList.toggle('hidden', !isOpen)
    document.getElementById('menu-icon-close').classList.toggle('hidden', isOpen)
  })

  // mobile sub-menu expand
  document.querySelectorAll('.mobile-expand').forEach(btn => {
    btn.addEventListener('click', () => {
      const sub = btn.closest('div').nextElementSibling
      sub.classList.toggle('hidden')
      const svg = btn.querySelector('svg')
      svg.style.transform = sub.classList.contains('hidden') ? '' : 'rotate(180deg)'
    })
  })

  // inquiry buttons
  const openInq = () => window.dispatchEvent(new CustomEvent('open-inquiry-modal'))
  document.getElementById('nav-inquiry-btn')?.addEventListener('click', openInq)
  document.getElementById('mobile-inquiry-btn')?.addEventListener('click', openInq)
}

window.initNav = initNav
})()
