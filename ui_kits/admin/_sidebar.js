// Shared admin sidebar — injected into <aside id="sidebar-mount"></aside>
(function () {
  var path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

  var route = (function () {
    if (path === 'index.html' || path === '') return { p: 'dashboard' };
    if (path.startsWith('appointments')) {
      var m = { 'appointments.html': 'view-all', 'appointments-confirmed.html': 'confirmed', 'appointments-in-progress.html': 'in-progress', 'appointments-pending.html': 'pending', 'appointments-cancelled.html': 'cancelled' };
      return { p: 'appointments', s: m[path] || 'view-all' };
    }
    if (path.startsWith('patients')) {
      var m = { 'patients-view-all.html': 'view-all', 'patients-active.html': 'active', 'patients-inactive.html': 'inactive', 'patients-archive.html': 'archive' };
      return { p: 'patients', s: m[path] || 'view-all' };
    }
    if (path.startsWith('staff')) {
      var m = { 'staff-view-all.html': 'view-all', 'staff-active.html': 'active', 'staff-inactive.html': 'inactive', 'staff-archive.html': 'archive', 'staff-visiting.html': 'visiting', 'staff-visiting-profile.html': 'visiting' };
      return { p: 'staff', s: m[path] || 'view-all' };
    }
    if (path.startsWith('services')) {
      var m = { 'services-view-all.html': 'view-all', 'services-active.html': 'active', 'services-inactive.html': 'inactive', 'services-archive.html': 'archive' };
      return { p: 'services', s: m[path] || 'view-all' };
    }
    if (path.startsWith('packages')) {
      var m2 = { 'packages-view-all.html': 'view-all', 'packages-active.html': 'active', 'packages-inactive.html': 'inactive', 'packages-archive.html': 'archive' };
      return { p: 'packages', s: m2[path] || 'view-all' };
    }
    if (path.startsWith('inventory')) {
      var m = { 'inventory.html': 'view-all', 'inventory-full-stock.html': 'full', 'inventory-ok-stock.html': 'ok',
        'inventory-low-stock.html': 'low', 'inventory-very-low-stock.html': 'very-low', 'inventory-no-stock.html': 'no',
        'inventory-suppliers.html': 'suppliers', 'inventory-supplier-detail.html': 'suppliers', 'inventory-supplier-profile.html': 'suppliers',
        'inventory-supplier-transaction.html': 'suppliers', 'inventory-supplier-analytics.html': 'suppliers',
        'inventory-suppliers-analytics.html': 'suppliers',
        'inventory-po-list.html': 'po', 'inventory-po-create.html': 'po', 'inventory-po-detail.html': 'po', 'inventory-po-receive.html': 'po', 'inventory-po-closure-summary.html': 'po',
        'inventory-po-queue.html': 'po-queue',
        'inventory-physical-count.html': 'physical-count', 'inventory-count-sheet.html': 'physical-count',
        'inventory-variance-report.html': 'physical-count',
        'inventory-audit-logs.html': 'audit' };
      return { p: 'inventory', s: m[path] || 'view-all' };
    }
    if (path === 'vouchers.html') return { p: 'billing', s: 'vouchers' };
    if (path === 'payments.html') return { p: 'billing', s: 'payments' };
    if (path.startsWith('pos-')) {
      var m = { 'pos-new-sale.html': 'new-sale', 'pos-orders.html': 'orders', 'pos-refunds.html': 'refunds',
        'pos-discounts.html': 'discounts', 'pos-summary.html': 'summary' };
      return { p: 'pos', s: m[path] };
    }
    if (path.startsWith('website-')) {
      var m = { 'website-home.html': 'home', 'website-about.html': 'about', 'website-services.html': 'services',
        'website-gallery.html': 'gallery', 'website-blog.html': 'blog', 'website-promotions.html': 'promotions',
        'website-contact.html': 'contact' };
      return { p: 'website', s: m[path] };
    }
    if (path === 'reports.html' || path === 'reports-hub.html' || path.startsWith('reports-')) {
      var qsRep = new URLSearchParams(location.search).get('type') || '';
      return { p: 'reports', s: qsRep || 'hub' };
    }
    if (path === 'messages.html') {
      var qsMsg = new URLSearchParams(location.search).get('filter') || 'inbox';
      var msgMap = { 'inbox': 'inbox', 'contact-form': 'contact-forms', 'email': 'email', 'assigned': 'assigned', 'closed': 'closed', 'spam': 'spam' };
      return { p: 'messages', s: msgMap[qsMsg] || 'inbox' };
    }
    if (path === 'settings-integrations-email.html') return { p: 'settings' };
    if (path === 'reviews.html') return { p: 'reviews' };
    if (path === 'blog.html') return { p: 'blog' };
    if (path === 'settings.html') return { p: 'settings' };
    return {};
  })();

  // === Receptionist mode (used by inventory-count-sheet-receptionist.html and other future receptionist pages) ===
  var isReceptionist = path.indexOf('-receptionist') !== -1 || path.startsWith('receptionist-');

  // === Practitioner mode (separate role with focused view) ===
  var isPractitioner = path.startsWith('practitioner-');

  // Pages that should mark the receptionist's Inventory → Audit Logs item as active
  var rcpAuditLogs = path === 'receptionist-audit-logs.html';
  // Pages that should mark Inventory submenu as open in receptionist context
  var rcpInventoryOpen = rcpAuditLogs;

  function topClass(parent) { return route.p === parent ? 'nav-item active' : 'nav-item'; }
  function subClass(parent, sub) { return (route.p === parent && route.s === sub) ? 'nav-item active' : 'nav-item'; }
  function isOpen(parent) { return route.p === parent; }

  // ===================== Inject shared styles =====================
  if (!document.getElementById('__shared_sidebar_styles')) {
    var st = document.createElement('style');
    st.id = '__shared_sidebar_styles';
    st.textContent = [
      'aside.sidebar .nav-item .badge-blue { margin-left: auto; background: #2D6A9F; color: #fff; font-size: 11px; font-weight: 600; padding: 1px 7px; border-radius: 9999px; line-height: 1.6; }',
      'aside.sidebar .nav-item .badge-warning { margin-left: auto; background: #B45309; color: #fff; font-size: 11px; font-weight: 700; padding: 1px 7px; border-radius: 9999px; line-height: 1.6; display: inline-flex; align-items: center; gap: 3px; }',
      'aside.sidebar.collapsed .nav-item .badge-blue, aside.sidebar.collapsed .nav-item .badge-warning { display: none !important; }',
      // Base
      'aside.sidebar { width: 260px !important; min-width: 260px !important; overflow: hidden !important; background: #152F4A !important; transition: width 200ms ease, min-width 200ms ease; display: flex !important; flex-direction: column !important; min-height: 100vh !important; position: sticky !important; top: 0 !important; max-height: 100vh !important; font-family: var(--font-display) !important; }',
      'aside.sidebar .side-head, aside.sidebar .side-user, aside.sidebar .side-collapse { overflow: hidden; }',
      'aside.sidebar .nav-item { white-space: normal !important; line-height: 1.25; padding: 6px 16px !important; min-height: 44px; height: auto !important; gap: 12px; }',
      'aside.sidebar .submenu .nav-item { padding-left: 48px !important; min-height: 40px; height: auto !important; }',
      'aside.sidebar .nav-item .lucide { width: 20px; height: 20px; flex-shrink: 0; }',
      'aside.sidebar .submenu .nav-item .lucide { width: 16px; height: 16px; }',
      'aside.sidebar .nav-item .nav-label { flex: 1; word-break: break-word; }',
      'aside.sidebar .nav-item .chev { margin-left: auto !important; flex-shrink: 0; transition: transform 200ms; }',
      'aside.sidebar .nav-item.open .chev { transform: rotate(90deg); }',
      // Hide native scrollbar; keep wheel/touch scroll
      'aside.sidebar .side-nav { scrollbar-width: none; -ms-overflow-style: none; overflow-y: auto; }',
      'aside.sidebar .side-nav::-webkit-scrollbar { width: 0 !important; height: 0 !important; display: none !important; background: transparent !important; }',
      'aside.sidebar .side-collapse { cursor: pointer; user-select: none; }',
      'aside.sidebar .side-collapse:hover { color: #fff !important; }',
      // ===================== Collapsed state =====================
      'aside.sidebar.collapsed { width: 72px !important; min-width: 72px !important; }',
      'aside.sidebar.collapsed .brand-name, aside.sidebar.collapsed .brand-sub { display: none !important; }',
      'aside.sidebar.collapsed .side-head { padding: 0 !important; justify-content: center; }',
      'aside.sidebar.collapsed .nav-item { padding: 0 !important; justify-content: center !important; gap: 0 !important; }',
      'aside.sidebar.collapsed .nav-item .nav-label,',
      'aside.sidebar.collapsed .nav-item .chev,',
      'aside.sidebar.collapsed .nav-item .badge-red { display: none !important; }',
      'aside.sidebar.collapsed .submenu { display: none !important; }',
      'aside.sidebar.collapsed .side-collapse { justify-content: center !important; padding: 0 !important; }',
      'aside.sidebar.collapsed .side-collapse > span { display: none !important; }',
      'aside.sidebar.collapsed .side-user { justify-content: center !important; padding: 0 !important; }',
      'aside.sidebar.collapsed .side-user > div:not(.avatar), aside.sidebar.collapsed .side-user .logout { display: none !important; }',
      // Tooltip on hover (collapsed only)
      'aside.sidebar.collapsed .nav-item { position: relative; }',
      'aside.sidebar.collapsed .nav-item[title]::after { content: attr(title); position: absolute; left: 100%; top: 50%; transform: translateY(-50%); margin-left: 8px; background: #1A2E40; color: #fff; padding: 4px 10px; border-radius: 6px; font-family: var(--font-display); font-size: 12px; font-weight: 500; white-space: nowrap; opacity: 0; pointer-events: none; transition: opacity 150ms; z-index: 100; box-shadow: 0 4px 12px rgba(0,0,0,0.2); }',
      'aside.sidebar.collapsed .nav-item:hover[title]::after { opacity: 1; }'
    ].join('\n');
    document.head.appendChild(st);
  }

  var APPTS = [
    ['appointments.html',              'eye',          'View All',     'view-all'],
    ['appointments-confirmed.html',    'check-circle', 'Confirmed',    'confirmed'],
    ['appointments-in-progress.html',  'loader',       'In Progress',  'in-progress'],
    ['appointments-pending.html',      'clock',        'Pending',      'pending'],
    ['appointments-cancelled.html',    'x-circle',     'Cancelled',    'cancelled'],
  ];
  var REPORTS = [
    ['reports.html?type=sales',            'dollar-sign', 'Sales Report',         'sales'],
    ['reports.html?type=appointments',     'calendar',    'Appointments Report',  'appointments'],
    ['reports.html?type=inventory',        'boxes',       'Inventory Report',     'inventory'],
    ['reports.html?type=vouchers',         'gift',        'Vouchers Report',      'vouchers'],
    ['reports.html?type=active-patients',  'user-check',  'Active Patients',      'active-patients'],
    ['reports.html?type=patients',         'users',       'Patients Report',      'patients'],
    ['reports.html?type=services',         'scissors',    'Services Report',      'services'],
    ['reports.html?type=packages',         'sparkles',    'Packages Report',      'packages'],
  ];
  var BILLING = [
    ['payments.html', 'credit-card', 'Payments',  'payments', { badge: '3', tone: 'red' }],
    ['vouchers.html', 'tag',         'Vouchers',  'vouchers'],
  ];
  var POS = [
    ['pos-new-sale.html',  'plus-circle', 'New Sale',      'new-sale'],
    ['pos-orders.html',    'receipt',     'Orders',        'orders'],
    ['pos-refunds.html',   'rotate-ccw',  'Refunds',       'refunds'],
    ['pos-discounts.html', 'percent',     'Discounts',     'discounts'],
    ['pos-summary.html',   'bar-chart-3', 'Daily Summary', 'summary'],
  ];
  var PATIENTS = [
    ['patients-view-all.html', 'eye',         'View All Patients', 'view-all'],
    ['patients-active.html',   'user-check',  'Active Patients',   'active'],
    ['patients-inactive.html', 'user-x',      'Inactive Patients', 'inactive'],
    ['patients-archive.html',  'archive',     'Archive Patients',  'archive'],
  ];
  var STAFF = [
    ['staff-view-all.html', 'eye',         'View All Staff',      'view-all'],
    ['staff-active.html',   'user-check',  'Active Staff',        'active'],
    ['staff-inactive.html', 'user-x',      'Inactive Staff',      'inactive'],
    ['staff-archive.html',  'archive',     'Staff Archive',       'archive'],
    ['staff-visiting.html', 'plane',       'Visiting Specialists','visiting'],
  ];
  var SERVICES = [
    ['services-view-all.html', 'eye',         'View All Services', 'view-all'],
    ['services-active.html',   'user-check',  'Active Services',   'active'],
    ['services-inactive.html', 'user-x',      'Inactive Services', 'inactive'],
    ['services-archive.html',  'archive',     'Archive Services',  'archive'],
  ];
  var PACKAGES = [
    ['packages-view-all.html', 'eye',         'View All Packages', 'view-all'],
    ['packages-active.html',   'user-check',  'Active Packages',   'active'],
    ['packages-inactive.html', 'user-x',      'Inactive Packages', 'inactive'],
    ['packages-archive.html',  'archive',     'Archive Packages',  'archive'],
  ];
  var INV = [
    ['inventory.html',                'eye',            'View All Inventory', 'view-all'],
    ['inventory-full-stock.html',     'check-circle',   'Full Stock',         'full'],
    ['inventory-ok-stock.html',       'trending-down',  'OK Stock',           'ok'],
    ['inventory-low-stock.html',      'alert-triangle', 'Low Stock',          'low'],
    ['inventory-very-low-stock.html', 'alert-circle',   'Very Low Stock',     'very-low'],
    ['inventory-no-stock.html',       'ban',            'No Stock',           'no'],
    ['inventory-suppliers.html',      'package',        'Suppliers',          'suppliers'],
    ['inventory-po-list.html',        'clipboard-list', 'Purchase Orders',    'po'],
    ['inventory-po-queue.html',       'shopping-cart',  'PO Queue',           'po-queue', { badge: '6', tone: 'blue' }],
    ['inventory-physical-count.html', 'clipboard-check','Physical Count',     'physical-count'],
    ['inventory-audit-logs.html',     'activity',       'Audit Logs',         'audit'],
  ];
  var MSG = [
    ['messages.html?filter=inbox',        'inbox',          'Inbox',           'inbox',        { badge: '5', tone: 'red' }],
    ['messages.html?filter=contact-form', 'message-square', 'Contact Forms',   'contact-forms'],
    ['messages.html?filter=email',        'mail',           'Email',           'email'],
    ['messages.html?filter=assigned',     'user-check',     'Assigned to Me',  'assigned'],
    ['messages.html?filter=closed',       'archive',        'Closed',          'closed'],
    ['messages.html?filter=spam',         'ban',            'Spam',            'spam',         { badge: '2', tone: 'red' }],
  ];
  var WEB = [
    ['website-home.html',       'home',     'Manage Home Page',       'home'],
    ['website-about.html',      'info',     'Manage About Page',      'about'],
    ['website-services.html',   'scissors', 'Manage Services Page',   'services'],
    ['website-gallery.html',    'image',    'Manage Gallery Page',    'gallery'],
    ['website-blog.html',       'book-open','Manage Blog Page',       'blog'],
    ['website-promotions.html', 'megaphone','Manage Promotions Page', 'promotions'],
    ['website-contact.html',    'mail',     'Manage Contact Us Page', 'contact'],
  ];

  // Top-level link/button with wrapped label
  function top(parent, href, icon, label, opts) {
    opts = opts || {};
    var cls = topClass(parent);
    var badge = opts.badge ? '<span class="badge-red">' + opts.badge + '</span>' : '';
    var chev = opts.parent ? '<i data-lucide="chevron-right" class="chev"></i>' : '';
    if (opts.parent) {
      return '<div class="' + cls + (isOpen(parent) ? ' open' : '') + '" data-toggle="' + parent + '" title="' + label + '"><i data-lucide="' + icon + '"></i><span class="nav-label">' + label + '</span>' + badge + chev + '</div>';
    }
    return '<a class="' + cls + '" href="' + href + '" title="' + label + '"><i data-lucide="' + icon + '"></i><span class="nav-label">' + label + '</span>' + badge + '</a>';
  }

  function sub(parent, items) {
    var openAttr = isOpen(parent) ? '' : ' hidden';
    return '<div class="submenu"' + openAttr + '>' + items.map(function (it) {
      var extras = it[4] || null;
      var badge = '';
      if (extras && extras.badge) {
        var cls = extras.tone === 'blue' ? 'badge-blue' : extras.tone === 'warning' ? 'badge-warning' : 'badge-red';
        badge = '<span class="' + cls + '">' + extras.badge + '</span>';
      }
      return '<a class="' + subClass(parent, it[3]) + '" href="' + it[0] + '" title="' + it[2] + '"><i data-lucide="' + it[1] + '"></i><span class="nav-label">' + it[2] + '</span>' + badge + '</a>';
    }).join('') + '</div>';
  }

  var html;
  if (isPractitioner) {
    // Practitioner nav — focused on schedule and patients
    var prActive = function (p) {
      var here = (path === p);
      return here ? 'nav-item active' : 'nav-item';
    };
    html = ''
      + '<div class="side-head"><div class="side-logo"><img src="../../assets/logo-mark.png" alt=""></div><div><div class="brand-name">Cloud Skin</div><div class="brand-sub">Practitioner</div></div></div>'
      + '<nav class="side-nav">'
      + '<a class="' + prActive('practitioner-dashboard.html') + '" href="practitioner-dashboard.html" title="Dashboard"><i data-lucide="layout-dashboard"></i><span class="nav-label">Dashboard</span></a>'
      + '<a class="' + prActive('practitioner-schedule.html') + '" href="practitioner-schedule.html" title="My Schedule"><i data-lucide="calendar-clock"></i><span class="nav-label">My Schedule</span><span class="badge-red">5</span></a>'
      + '<a class="' + prActive('practitioner-patients.html') + '" href="practitioner-patients.html" title="My Patients"><i data-lucide="users"></i><span class="nav-label">My Patients</span></a>'
      + '<a class="nav-item" href="services-view-all.html" title="Services"><i data-lucide="scissors"></i><span class="nav-label">Services</span></a>'
      + '<a class="nav-item" href="messages.html" title="Messages"><i data-lucide="message-square"></i><span class="nav-label">Messages</span><span class="badge-red">2</span></a>'
      + '</nav>'
      + '<div class="side-collapse" id="sidebar-collapse-toggle"><span>Collapse</span><i data-lucide="chevron-left"></i></div>'
      + '<div class="side-user"><div class="avatar" style="background:#15803D;">MS</div><div><div class="name">Dr. Maria Santos</div><div class="role-pill" style="background:rgba(134,239,172,0.20);color:#86EFAC;">Practitioner</div></div><button class="logout" id="sidebar-logout" title="Logout"><i data-lucide="log-out" style="width:16px;height:16px"></i></button></div>';
  } else if (isReceptionist) {
    // Receptionist inventory section — Audit Logs only
    var rcpSubHtml = rcpInventoryOpen
      ? '<div class="submenu">'
        + '<a class="nav-item active" href="receptionist-audit-logs.html" title="Audit Logs"><i data-lucide="activity"></i><span class="nav-label">Audit Logs</span></a>'
        + '</div>'
      : '';
    html = ''
      + '<div class="side-head"><div class="side-logo"><img src="../../assets/logo-mark.png" alt=""></div><div><div class="brand-name">Cloud Skin</div><div class="brand-sub">Reception</div></div></div>'
      + '<nav class="side-nav">'
      + '<a class="' + (path === 'receptionist-dashboard.html' ? 'nav-item active' : 'nav-item') + '" href="receptionist-dashboard.html" title="Dashboard"><i data-lucide="layout-dashboard"></i><span class="nav-label">Dashboard</span></a>'
      + '<a class="' + (path === 'receptionist-appointments.html' ? 'nav-item active' : 'nav-item') + '" href="receptionist-appointments.html" title="Appointments"><i data-lucide="calendar"></i><span class="nav-label">Appointments</span><span class="badge-red">8</span></a>'
      + '<a class="' + (path === 'receptionist-patients.html' ? 'nav-item active' : 'nav-item') + '" href="receptionist-patients.html" title="Patients"><i data-lucide="users"></i><span class="nav-label">Patients</span></a>'
      + '<a class="' + (path === 'receptionist-services.html' ? 'nav-item active' : 'nav-item') + '" href="receptionist-services.html" title="Services"><i data-lucide="scissors"></i><span class="nav-label">Services</span></a>'
      + '<a class="' + (path === 'receptionist-packages.html' ? 'nav-item active' : 'nav-item') + '" href="receptionist-packages.html" title="Packages"><i data-lucide="package"></i><span class="nav-label">Packages</span></a>'
      + '<div class="nav-item' + (rcpInventoryOpen ? ' open' : '') + '" data-toggle="inventory" title="Inventory"><i data-lucide="boxes"></i><span class="nav-label">Inventory</span><i data-lucide="chevron-right" class="chev"></i></div>'
      + rcpSubHtml
      + '<a class="' + (path === 'receptionist-vouchers.html' ? 'nav-item active' : 'nav-item') + '" href="receptionist-vouchers.html" title="Vouchers"><i data-lucide="tag"></i><span class="nav-label">Vouchers</span></a>'
      + '<a class="' + (path === 'receptionist-pos.html' ? 'nav-item active' : 'nav-item') + '" href="receptionist-pos.html" title="POS"><i data-lucide="shopping-cart"></i><span class="nav-label">POS</span></a>'
      + '<a class="' + (path === 'receptionist-payments.html' ? 'nav-item active' : 'nav-item') + '" href="receptionist-payments.html" title="Payments"><i data-lucide="credit-card"></i><span class="nav-label">Payments</span><span class="badge-red">2</span></a>'
      + '<a class="' + (path === 'receptionist-messages.html' ? 'nav-item active' : 'nav-item') + '" href="receptionist-messages.html" title="Messages"><i data-lucide="message-square"></i><span class="nav-label">Messages</span><span class="badge-red">5</span></a>'
      + '</nav>'
      + '<div class="side-collapse" id="sidebar-collapse-toggle"><span>Collapse</span><i data-lucide="chevron-left"></i></div>'
      + '<div class="side-user"><div class="avatar" style="background:#B45309;">AC</div><div><div class="name">A. Cruz</div><div class="role-pill" style="background:rgba(252,211,77,0.20);color:#FCD34D;">Reception</div></div><button class="logout" id="sidebar-logout" title="Logout"><i data-lucide="log-out" style="width:16px;height:16px"></i></button></div>';
  } else {
    html = ''
    + '<div class="side-head"><div class="side-logo"><img src="../../assets/logo-mark.png" alt=""></div><div><div class="brand-name">Cloud Skin</div><div class="brand-sub">Clinic + Wellness</div></div></div>'
    + '<nav class="side-nav">'
    + top('dashboard',     'index.html',               'layout-dashboard', 'Dashboard')
    + top('appointments',  '',                         'calendar',         'Appointments', { parent: true, badge: 12 })
    + sub('appointments', APPTS)
    + top('patients',      '',                         'users',            'Patients',     { parent: true })
    + sub('patients', PATIENTS)
    + top('staff',         '',                         'user-cog',         'Staff',        { parent: true })
    + sub('staff', STAFF)
    + top('services',      '',                         'scissors',         'Services',     { parent: true })
    + sub('services', SERVICES)
    + top('packages',      '',                         'package',          'Packages',     { parent: true })
    + sub('packages', PACKAGES)
    + top('inventory',     '',                         'boxes',            'Inventory',    { parent: true })
    + sub('inventory', INV)
    + top('billing',       '',                         'credit-card',      'Billing',      { parent: true, badge: 3 })
    + sub('billing', BILLING)
    + top('pos',           '',                         'shopping-cart',    'POS',          { parent: true })
    + sub('pos', POS)
    + top('website',       '',                         'globe',            'Manage Website', { parent: true })
    + sub('website', WEB)
    + top('reports',       'reports-hub.html',          'bar-chart-2',      'Reports')
    + top('messages',      '',                         'message-square',   'Messages',     { parent: true, badge: 5 })
    + sub('messages', MSG)
    + top('reviews',       'reviews.html',             'star',             'Reviews')
    + top('blog',          'blog.html',                'file-text',        'Blog')
    + top('settings',      'settings.html',            'settings',         'Settings')
    + '</nav>'
    + '<div class="side-collapse" id="sidebar-collapse-toggle"><span>Collapse</span><i data-lucide="chevron-left"></i></div>'
    + '<div class="side-user"><div class="avatar">AU</div><div><div class="name">Admin User</div><div class="role-pill">Admin</div></div><button class="logout" id="sidebar-logout" title="Logout"><i data-lucide="log-out" style="width:16px;height:16px"></i></button></div>';
  }

  var mount = document.getElementById('sidebar-mount');
  if (!mount) {
    mount = document.createElement('aside');
    mount.id = 'sidebar-mount';
    document.body.insertBefore(mount, document.body.firstChild);
  }
  if (mount.tagName !== 'ASIDE') {
    var aside = document.createElement('aside');
    aside.id = 'sidebar-mount';
    aside.className = 'sidebar';
    mount.parentNode.replaceChild(aside, mount);
    mount = aside;
  }
  mount.className = 'sidebar';
  try {
    if (localStorage.getItem('cs.sidebar.collapsed') === '1') mount.classList.add('collapsed');
  } catch (e) {}
  mount.innerHTML = html;

  // === Submenu toggle ===
  mount.querySelectorAll('.nav-item[data-toggle]').forEach(function (item) {
    item.addEventListener('click', function () {
      if (mount.classList.contains('collapsed')) {
        setCollapsed(false);
      }
      var key = item.getAttribute('data-toggle');
      var next = item.nextElementSibling;
      if (next && next.classList.contains('submenu')) {
        var willOpen = next.hasAttribute('hidden') || next.style.display === 'none' || getComputedStyle(next).display === 'none';
        if (willOpen) { next.removeAttribute('hidden'); next.style.display = ''; }
        else { next.setAttribute('hidden', ''); next.style.display = 'none'; }
        item.classList.toggle('open', willOpen);
      } else {
        var ITEMS = key === 'inventory' ? INV : key === 'pos' ? POS : key === 'website' ? WEB : key === 'messages' ? MSG : key === 'patients' ? PATIENTS : key === 'staff' ? STAFF : key === 'services' ? SERVICES : key === 'packages' ? PACKAGES : key === 'appointments' ? APPTS : key === 'reports' ? REPORTS : key === 'billing' ? BILLING : null;
        if (!ITEMS) return;
        var div = document.createElement('div');
        div.className = 'submenu';
        div.innerHTML = ITEMS.map(function (it) {
          return '<a class="nav-item" href="' + it[0] + '" title="' + it[2] + '"><i data-lucide="' + it[1] + '"></i><span class="nav-label">' + it[2] + '</span></a>';
        }).join('');
        item.parentNode.insertBefore(div, item.nextSibling);
        item.classList.add('open');
        if (window.lucide && lucide.createIcons) lucide.createIcons();
      }
    });
  });

  // === Collapse toggle ===
  function setCollapsed(yes) {
    mount.classList.toggle('collapsed', yes);
    try { localStorage.setItem('cs.sidebar.collapsed', yes ? '1' : '0'); } catch (e) {}
    var t = document.getElementById('sidebar-collapse-toggle');
    if (t) {
      var icon = t.querySelector('[data-lucide], .lucide');
      if (icon) icon.setAttribute('data-lucide', yes ? 'chevron-right' : 'chevron-left');
    }
    if (window.lucide && lucide.createIcons) lucide.createIcons();
  }
  var toggleBtn = document.getElementById('sidebar-collapse-toggle');
  if (toggleBtn) toggleBtn.addEventListener('click', function () { setCollapsed(!mount.classList.contains('collapsed')); });
  setCollapsed(mount.classList.contains('collapsed'));

  // === Logout button ===
  var logoutBtn = document.getElementById('sidebar-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      if (confirm('Log out of Cloud Skin?')) {
        try { localStorage.removeItem('cs.sidebar.collapsed'); } catch (e) {}
        location.href = 'login.html';
      }
    });
  }

  if (window.lucide && lucide.createIcons) lucide.createIcons();
})();
