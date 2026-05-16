// System Audit Logs data + renderers for settings.html.

var AUDIT_EVENTS = [
  // Row 0 = failed login (shown only when module filter = Authentication)
  { id:'EVT-00859', ts:'May 13, 2026 8:55 AM', user:null, userInitials:'??', avColor:'#94A3B8',
    module:'authentication', moduleLabel:'Authentication',
    action:'failed', actionLabel:'Failed Login',
    desc:'Incorrect password attempt — admin@cloudskin.com',
    ip:'203.177.12.45', ipSuspicious:true,
    failed:true, hideByDefault:true
  },
  // Default 12 rows
  { id:'EVT-00847', ts:'May 13, 2026 2:45 PM', user:'Admin User', userInitials:'AU', avColor:'#2D6A9F',
    module:'settings', moduleLabel:'Settings', action:'updated', actionLabel:'Updated',
    desc:'VAT rate changed from 10% to 12%', ip:'192.168.1.1',
    diff: [['VAT Rate','10%','12%']],
    related: [['View POS Settings →','?s=payments'], ['View affected transactions →','#']]
  },
  { id:'EVT-00846', ts:'May 13, 2026 2:30 PM', user:'Admin User', userInitials:'AU', avColor:'#2D6A9F',
    module:'pos', moduleLabel:'POS', action:'refunded', actionLabel:'Refunded',
    desc:'Order ORD-0086 refunded ₱2,500 to Camille Torres', ip:'192.168.1.1' },
  { id:'EVT-00845', ts:'May 13, 2026 1:15 PM', user:'Ana Cruz', userInitials:'AC', avColor:'#7C3AED',
    module:'messages', moduleLabel:'Messages', action:'assigned', actionLabel:'Assigned',
    desc:'Thread from Sarah Johnson assigned to Ana Cruz', ip:'192.168.1.2' },
  { id:'EVT-00844', ts:'May 13, 2026 11:00 AM', user:'Admin User', userInitials:'AU', avColor:'#2D6A9F',
    module:'discounts', moduleLabel:'Discounts', action:'deleted', actionLabel:'Deleted',
    desc:'Discount code SUMMER15 deleted', ip:'192.168.1.1' },
  { id:'EVT-00843', ts:'May 13, 2026 10:45 AM', user:'Admin User', userInitials:'AU', avColor:'#2D6A9F',
    module:'inventory', moduleLabel:'Inventory', action:'approved', actionLabel:'Approved',
    desc:'Physical Count CNT-0012 approved — 5 variances updated', ip:'192.168.1.1' },
  { id:'EVT-00842', ts:'May 13, 2026 9:30 AM', user:'Admin User', userInitials:'AU', avColor:'#2D6A9F',
    module:'users', moduleLabel:'Users', action:'created', actionLabel:'Created',
    desc:'New account created: ana.cruz@cloudskin.com', ip:'192.168.1.1' },
  { id:'EVT-00841', ts:'May 13, 2026 9:15 AM', user:'Admin User', userInitials:'AU', avColor:'#2D6A9F',
    module:'pos', moduleLabel:'POS', action:'approved', actionLabel:'Approved',
    desc:'Purchase Order PO-2026-0045 approved ₱55,328', ip:'192.168.1.1' },
  { id:'EVT-00840', ts:'May 13, 2026 9:00 AM', user:'Admin User', userInitials:'AU', avColor:'#2D6A9F',
    module:'authentication', moduleLabel:'Authentication', action:'login', actionLabel:'Login',
    desc:'Logged in successfully', ip:'192.168.1.1' },
  { id:'EVT-00839', ts:'May 12, 2026 6:30 PM', user:'Ana Cruz', userInitials:'AC', avColor:'#7C3AED',
    module:'authentication', moduleLabel:'Authentication', action:'login', actionLabel:'Login',
    desc:'Logged in successfully', ip:'192.168.1.2' },
  { id:'EVT-00838', ts:'May 12, 2026 5:00 PM', user:'Admin User', userInitials:'AU', avColor:'#2D6A9F',
    module:'settings', moduleLabel:'Settings', action:'updated', actionLabel:'Updated',
    desc:'Low stock threshold changed from 10 to 15 units', ip:'192.168.1.1',
    diff: [['Low Stock Threshold','10 units','15 units']] },
  { id:'EVT-00837', ts:'May 12, 2026 3:20 PM', user:'Ben Santos', userInitials:'BS', avColor:'#7C3AED',
    module:'authentication', moduleLabel:'Authentication', action:'login', actionLabel:'Login',
    desc:'Logged in successfully', ip:'192.168.1.3' },
  { id:'EVT-00836', ts:'May 12, 2026 2:00 PM', user:'Admin User', userInitials:'AU', avColor:'#2D6A9F',
    module:'discounts', moduleLabel:'Discounts', action:'created', actionLabel:'Created',
    desc:'New discount code LOYALTY200 created — ₱200 fixed', ip:'192.168.1.1' }
];

function renderAuditTable() {
  var tbody = document.getElementById('audit-tbody');
  if (!tbody) return;
  var moduleFilter = document.getElementById('audit-module');
  var actionFilter = document.getElementById('audit-action');
  var modVal = moduleFilter ? moduleFilter.value : 'all';
  var actVal = actionFilter ? actionFilter.value : 'all';

  // Toggle failed-login alert banner based on module filter.
  var alertEl = document.getElementById('auth-alert');
  if (alertEl) alertEl.hidden = (modVal !== 'authentication');

  // Filter rows.
  var rows = AUDIT_EVENTS.filter(function (e) {
    if (e.hideByDefault && modVal !== 'authentication') return false;
    if (modVal !== 'all' && e.module !== modVal) return false;
    if (actVal !== 'all' && e.actionLabel.toLowerCase() !== actVal.toLowerCase()) return false;
    return true;
  });

  tbody.innerHTML = rows.map(function (e) {
    var userCell = e.user
      ? '<span class="user-cell"><span class="av-init" style="background:' + e.avColor + ';">' + e.userInitials + '</span><span class="nm">' + e.user + '</span></span>'
      : '<span class="user-cell"><span class="av-init" style="background:#94A3B8;">??</span><span class="nm unknown">Unknown</span></span>';
    var rowCls = e.failed ? 'failed-row' : '';
    var actLabel = e.failed ? '⚠ ' + e.actionLabel : e.actionLabel;
    return '<tr class="' + rowCls + '">'
      + '<td><span class="ts-mono">' + e.ts + '</span></td>'
      + '<td>' + userCell + '</td>'
      + '<td><span class="mod-badge ' + e.module + '">' + e.moduleLabel + '</span></td>'
      + '<td><span class="act-badge ' + e.action + '">' + actLabel + '</span></td>'
      + '<td><span class="audit-desc">' + e.desc + '</span></td>'
      + '<td><span class="ip-mono' + (e.ipSuspicious ? ' suspicious' : '') + '">' + e.ip + '</span></td>'
      + '<td style="text-align:right;"><button class="audit-link" type="button" data-evt="' + e.id + '">Details <i data-lucide="arrow-right" style="width:11px;height:11px;"></i></button></td>'
      + '</tr>';
  }).join('');

  // Update pagination info.
  var info = document.getElementById('audit-page-info');
  if (info) {
    var n = rows.length;
    info.innerHTML = 'Showing <b>1\u2013' + n + '</b> of <b>' + (modVal === 'all' && actVal === 'all' ? '1,284' : n) + '</b> events';
  }

  // Wire Details click.
  tbody.querySelectorAll('.audit-link').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openAuditDrawer(btn.getAttribute('data-evt'));
    });
  });

  if (window.lucide) window.lucide.createIcons();
}

function openAuditDrawer(evtId) {
  var e = AUDIT_EVENTS.find(function (x) { return x.id === evtId; });
  if (!e) return;
  var body = document.getElementById('drawer-body');
  var device = 'Chrome · Windows 11';
  var sessId = 'SES-' + (4000 + (parseInt(e.id.replace(/\D/g, ''), 10) % 999));
  var diffHtml = '';
  if (e.diff && e.diff.length) {
    diffHtml = '<div class="diff-card"><div class="ttl">What Changed</div>'
      + e.diff.map(function (d) {
          return '<div class="diff-row"><span class="k">' + d[0] + '</span><span class="before">' + d[1] + '</span><span class="arrow">→</span><span class="after">' + d[2] + '</span></div>';
        }).join('')
      + '</div>';
  }
  var relatedHtml = '';
  if (e.related && e.related.length) {
    relatedHtml = '<div class="drawer-card"><div class="ttl">Related Records</div>'
      + '<div class="related-links">'
      + e.related.map(function (r) { return '<a href="' + r[1] + '">' + r[0] + '</a>'; }).join('')
      + '</div></div>';
  }
  body.innerHTML =
    '<div class="drawer-card">'
      + '<div class="ttl">Event Info</div>'
      + '<div class="row"><span class="k">Event ID</span><span class="v mono">' + e.id + '</span></div>'
      + '<div class="row"><span class="k">Timestamp</span><span class="v">' + e.ts + '</span></div>'
      + '<div class="row"><span class="k">Module</span><span class="v"><span class="mod-badge ' + e.module + '">' + e.moduleLabel + '</span></span></div>'
      + '<div class="row"><span class="k">Action</span><span class="v"><span class="act-badge ' + e.action + '">' + (e.failed ? '⚠ ' + e.actionLabel : e.actionLabel) + '</span></span></div>'
    + '</div>'
    + '<div class="drawer-card">'
      + '<div class="ttl">Performed By</div>'
      + '<div class="row"><span class="k">User</span><span class="v"><span class="user-cell"><span class="av-init" style="background:' + (e.user ? e.avColor : '#94A3B8') + ';">' + e.userInitials + '</span><span class="nm' + (e.user ? '' : ' unknown') + '">' + (e.user || 'Unknown') + '</span></span></span></div>'
      + '<div class="row"><span class="k">Role</span><span class="v"><span class="badge ' + (e.user === 'Admin User' ? 'role-admin' : 'role-recep') + '">' + (e.user === 'Admin User' ? 'Admin' : 'Receptionist') + '</span></span></div>'
      + '<div class="row"><span class="k">IP Address</span><span class="v ' + (e.ipSuspicious ? 'mono" style="color:#DC2626' : 'mono') + '">' + e.ip + '</span></div>'
      + '<div class="row"><span class="k">Device</span><span class="v">' + device + '</span></div>'
      + '<div class="row"><span class="k">Session</span><span class="v muted">' + sessId + '</span></div>'
    + '</div>'
    + diffHtml
    + relatedHtml;
  document.getElementById('audit-drawer').classList.add('open');
  document.getElementById('audit-drawer-backdrop').classList.add('open');
  document.body.style.overflow = 'hidden';
  if (window.lucide) window.lucide.createIcons();
}

function closeAuditDrawer() {
  document.getElementById('audit-drawer').classList.remove('open');
  document.getElementById('audit-drawer-backdrop').classList.remove('open');
  document.body.style.overflow = '';
}

function initAuditPage() {
  renderAuditTable();
  var mod = document.getElementById('audit-module');
  var act = document.getElementById('audit-action');
  if (mod) mod.addEventListener('change', renderAuditTable);
  if (act) act.addEventListener('change', renderAuditTable);
  document.getElementById('drawer-close').addEventListener('click', closeAuditDrawer);
  document.getElementById('audit-drawer-backdrop').addEventListener('click', closeAuditDrawer);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.getElementById('audit-drawer').classList.contains('open')) closeAuditDrawer();
  });

  // Deep-link support: ?s=audit&module=authentication and ?s=audit&event=EVT-00847
  var q = new URLSearchParams(location.search);
  var qm = q.get('module');
  if (qm && mod) {
    mod.value = qm;
    renderAuditTable();
  }
  var qe = q.get('event');
  if (qe) {
    setTimeout(function () { openAuditDrawer(qe); }, 60);
  }
}
