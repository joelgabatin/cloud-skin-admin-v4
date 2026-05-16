// Data + renderers for Notification Preferences and Roles permissions matrix.
// Kept out of settings.html so the inline page stays editable.

// ---------- Notification Preferences ----------
var NOTIFS = {
  appt: [
    { nm:'New Appointment Booked',         desc:'When a patient books a new appointment online or via admin.',  ch:[1,1,0] },
    { nm:'Appointment Cancelled',          desc:'When a patient or admin cancels a booking.',                   ch:[1,1,1] },
    { nm:'Appointment Rescheduled',        desc:'When a booking date or time is changed.',                      ch:[1,0,0] },
    { nm:'Upcoming Appointment Reminder',  desc:'Reminder sent before each appointment.',                       ch:[1,1,1] },
    { nm:'No-show Alert',                  desc:'When a patient does not arrive for their appointment.',        ch:[1,0,0] }
  ],
  inv: [
    { nm:'Low Stock Alert',                desc:'When a product falls below the low-stock threshold.',          ch:[1,1,0] },
    { nm:'No Stock Alert',                 desc:'When a product reaches zero units.',                           ch:[1,1,1] },
    { nm:'Purchase Order Delivered',       desc:'When a PO is marked as received.',                             ch:[1,0,0] },
    { nm:'PO Partially Received',          desc:'When a delivery arrives with missing items.',                  ch:[1,1,0] },
    { nm:'Physical Count Submitted',       desc:'When a staff member submits a count session for review.',      ch:[1,1,0] }
  ],
  pay: [
    { nm:'New Payment Received',           desc:'When a payment is completed via POS or online.',               ch:[1,0,0] },
    { nm:'Pending Payment Alert',          desc:'When a payment is overdue or unconfirmed.',                    ch:[1,1,0] },
    { nm:'Refund Processed',               desc:'When a refund is issued to a patient.',                        ch:[1,1,0] }
  ],
  msg: [
    { nm:'New Contact Form Submission',    desc:'When someone submits the website contact form.',               ch:[1,1,0] },
    { nm:'New Gmail Message',              desc:'When a new email arrives in the connected inbox.',             ch:[1,0,0] },
    { nm:'Message Assigned to Me',         desc:'When a message thread is assigned to you.',                    ch:[1,1,0] }
  ],
  sys: [
    { nm:'New Staff Account Created',      desc:'When a new user is added to the system.',                      ch:[1,1,0] },
    { nm:'Failed Login Attempt',           desc:'When an incorrect password is entered on your account.',       ch:[1,1,1] },
    { nm:'System Update Available',        desc:'When a new version of the dashboard is ready.',                ch:[1,0,0] }
  ]
};

function renderNotifications() {
  function rowHtml(r) {
    var ch = r.ch.map(function (on) {
      return '<button class="switch' + (on ? '' : ' off') + '" data-on="' + (on ? 'true' : 'false') + '"></button>';
    });
    return '<div class="notif-row">'
      + '<div><div class="nm">' + r.nm + '</div><div class="desc">' + r.desc + '</div></div>'
      + '<div class="channels">'
      +   '<div class="chan">' + ch[0] + '</div>'
      +   '<div class="chan">' + ch[1] + '</div>'
      +   '<div class="chan">' + ch[2] + '</div>'
      + '</div>'
      + '</div>';
  }
  function fill(id, rows) {
    var el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = rows.map(rowHtml).join('');
  }
  fill('notif-appt', NOTIFS.appt);
  fill('notif-inv',  NOTIFS.inv);
  fill('notif-pay',  NOTIFS.pay);
  fill('notif-msg',  NOTIFS.msg);
  fill('notif-sys',  NOTIFS.sys);

  // Re-wire toggle clicks for the new switches.
  document.querySelectorAll('.notif-row .switch').forEach(function (sw) {
    sw.addEventListener('click', function () {
      sw.classList.toggle('off');
      sw.setAttribute('data-on', !sw.classList.contains('off'));
    });
  });
}

// ---------- Permissions matrix ----------
// Each entry: { module, admin, recep, staff }  where the values are 'full' | 'limited' | 'none'
var PERMS = [
  { module: 'Dashboard',          admin: 'full',    recep: 'full',    staff: 'limited' },
  { module: 'Appointments',       admin: 'full',    recep: 'full',    staff: 'limited' },
  { module: 'Patients',           admin: 'full',    recep: 'full',    staff: 'limited' },
  { module: 'Inventory',          admin: 'full',    recep: 'limited', staff: 'none' },
  { module: 'Purchase Orders',    admin: 'full',    recep: 'none',    staff: 'none' },
  { module: 'Physical Count',     admin: 'full',    recep: 'limited', staff: 'full' },
  { module: 'POS',                admin: 'full',    recep: 'full',    staff: 'none' },
  { module: 'Payments',           admin: 'full',    recep: 'limited', staff: 'none' },
  { module: 'Reports',            admin: 'full',    recep: 'none',    staff: 'none' },
  { module: 'Messages',           admin: 'full',    recep: 'limited', staff: 'limited' },
  { module: 'Manage Website',     admin: 'full',    recep: 'none',    staff: 'none' },
  { module: 'Settings',           admin: 'full',    recep: 'none',    staff: 'none' }
];

function renderPermMatrix() {
  var tbody = document.getElementById('perm-tbody');
  if (!tbody) return;
  function cellHtml(v) {
    var icon = v === 'full' ? 'check' : v === 'limited' ? 'alert-triangle' : 'x';
    var title = v === 'full' ? 'Full access' : v === 'limited' ? 'Limited access' : 'No access';
    return '<td style="text-align:center;"><span class="perm-cell" title="' + title + '"><span class="perm-icon ' + v + '"><i data-lucide="' + icon + '"></i></span></span></td>';
  }
  tbody.innerHTML = PERMS.map(function (p) {
    return '<tr>'
      + '<td><span class="nm">' + p.module + '</span></td>'
      + cellHtml(p.admin)
      + cellHtml(p.recep)
      + cellHtml(p.staff)
      + '</tr>';
  }).join('');
  if (window.lucide) window.lucide.createIcons();
}
