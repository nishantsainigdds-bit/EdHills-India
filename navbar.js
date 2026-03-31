/* ═══════════════════════════════════════
   ED-HILLS — Shared Navbar (Inline Inject)
   ═══════════════════════════════════════ */
(function () {

  /* ── 1. Inject CSS ── */
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'navbar.css';
  document.head.appendChild(link);

  /* ── 2. Inject RemixIcon if missing ── */
  if (!document.querySelector('link[href*="remixicon"]')) {
    const ri = document.createElement('link');
    ri.rel = 'stylesheet';
    ri.href = 'https://cdn.jsdelivr.net/npm/remixicon@4.1.0/fonts/remixicon.css';
    document.head.appendChild(ri);
  }

  /* ── 3. Build navbar HTML inline (no fetch needed) ── */
  const navHTML = `
<header id="main-header">

  <a href="index.html" class="">
    <i class="ri-graduation-cap-fill"></i>
    <img src="file:///C:/Users/bsain/Downloads/WhatsApp%20Image%202026-03-31%20at%209.35.09%20AM.jpeg" height="40" wight="40"alt="EdHills "/> </img>



  <nav id="nav-menu">

    <a href="index.html"><i class="ri-home-4-line"></i> Home</a>

    <a href="my-school.html" id="myBatchesNavLink">
      <i class="ri-stack-line"></i> My School
    </a>
     <a href="courses.html"id="myBatchesNavLink">
      <i class="ri-smartphone-line"></i> Courses 
    </a>
    <a href="get-app.html" class="eh-getapp">
      <i class="ri-smartphone-line"></i> Get App
    </a>
     <a href="about.html"  id="myBatchesNavLink">
      <i class="ri-smartphone-line"></i> About Us
    </a>
  </nav>
</header>

<!-- MOBILE DRAWER -->
<div class="eh-mobile-drawer" id="ehMobileDrawer">
  <div class="eh-drawer-header">
    <a href="index.html" style="display:flex;align-items:center;gap:8px;font-size:20px;font-weight:800;color:#fff;text-decoration:none;">
      <i class="ri-graduation-cap-fill" style="color:#00C2A8;font-size:24px;"></i> Ed-Hills
    </a>
    <div onclick="ehToggleNav()" style="cursor:pointer;font-size:22px;color:rgba(255,255,255,.6);">
      <i class="ri-close-line"></i>
    </div>
  </div>
  <div class="eh-drawer-body">
    <div class="eh-drawer-section">
      <div class="eh-drawer-label">Navigation</div>
      <a href="index.html" class="eh-drawer-link"><i class="ri-home-4-line"></i> Home</a>
      <a href="courses.html" class="eh-drawer-link"><i class="ri-book-open-line"></i> All Courses</a>
      <a href="student-dashboard.html" class="eh-drawer-link"><i class="ri-stack-line"></i> My Batches</a>
      <a href="weightage-analysis.html" class="eh-drawer-link"><i class="ri-bar-chart-line"></i> Rank Predictor</a>
      <a href="exam-papers.html" class="eh-drawer-link"><i class="ri-file-text-line"></i> Study Material</a>
    </div>
    <div class="eh-drawer-section">
      <div class="eh-drawer-label">More</div>
      <a href="about.html" class="eh-drawer-link"><i class="ri-team-line"></i> About Us</a>
      <a href="updates.html" class="eh-drawer-link"><i class="ri-notification-3-line"></i> Updates</a>
      <a href="get-app.html" class="eh-drawer-link" style="background:rgba(0,194,168,.1);border-radius:8px;">
        <i class="ri-smartphone-line"></i>
        <span style="color:#00C2A8;font-weight:700;">Get Ed-Hills App</span>
        <span style="margin-left:auto;font-size:11px;background:#00C2A8;color:#0F172A;padding:2px 8px;border-radius:50px;font-weight:800;">Free</span>
      </a>
    </div>
    <a href="student-dashboard.html" class="eh-drawer-login">
      <i class="ri-dashboard-line"></i> Dashboard
    </a>
  </div>
</div>
<div class="eh-drawer-overlay" id="ehDrawerOverlay" onclick="ehToggleNav()"></div>
`;

  /* ── 4. Inject into page ── */
  const wrapper = document.createElement('div');
  wrapper.id = 'eh-navbar-root';
  wrapper.innerHTML = navHTML;
  document.body.insertBefore(wrapper, document.body.firstChild);

  /* ── 5. Highlight active link ── */
  highlightActiveLink();

  /* ── 6. Close dropdown on outside click ── */
  bindOutsideClick();

})();

/* ── ACTIVE LINK HIGHLIGHT ── */
function highlightActiveLink() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#nav-menu > a, .eh-drawer-link').forEach(a => {
    const href = (a.getAttribute('href') || '').split('/').pop();
    if (href && href !== '#' && href !== '' && page === href) {
      a.style.color = '#00C2A8';
      a.style.fontWeight = '700';
    }
  });
}

/* ── MOBILE DRAWER TOGGLE ── */
function ehToggleNav() {
  const drawer  = document.getElementById('ehMobileDrawer');
  const overlay = document.getElementById('ehDrawerOverlay');
  const icon    = document.querySelector('#mobile-menu i');
  if (!drawer) return;
  const isOpen = drawer.classList.contains('open');
  drawer.classList.toggle('open', !isOpen);
  if (overlay) overlay.classList.toggle('open', !isOpen);
  document.body.style.overflow = isOpen ? '' : 'hidden';
  if (icon) icon.className = isOpen ? 'ri-menu-3-line' : 'ri-close-line';
}

/* ── COURSES MEGA DROPDOWN ── */
function ehToggleCourses(e) {
  e.stopPropagation();
  const drop = document.getElementById('ehMegaDrop');
  const btn  = document.getElementById('ehCoursesBtn');
  if (!drop) return;
  const isOpen = drop.classList.contains('open');
  drop.classList.toggle('open', !isOpen);
  if (btn) btn.classList.toggle('open', !isOpen);
}

/* ── CATEGORY SWITCHER ── */
function ehSwitchCat(cat, el) {
  document.querySelectorAll('.eh-cat-item').forEach(i => i.classList.remove('eh-cat-active'));
  el.classList.add('eh-cat-active');
  document.querySelectorAll('.eh-cards-panel').forEach(p => p.classList.remove('eh-panel-active'));
  const panel = document.getElementById('panel-' + cat);
  if (panel) panel.classList.add('eh-panel-active');
}

/* ── CLOSE ON OUTSIDE CLICK ── */
function bindOutsideClick() {
  document.addEventListener('click', function (e) {
    const drop = document.getElementById('ehMegaDrop');
    const btn  = document.getElementById('ehCoursesBtn');
    if (drop && drop.classList.contains('open') && !e.target.closest('.eh-courses-wrap')) {
      drop.classList.remove('open');
      if (btn) btn.classList.remove('open');
    }
  });
}
