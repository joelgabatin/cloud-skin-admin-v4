// _staff-drawer.js — Add New Staff slide-in drawer.
// Include after _sidebar.js. Any link/button with [data-open-staff-add],
// id="open-add", class="btn-add-staff", or visible text "Add Staff" / "+ Add Staff"
// will open this drawer.
(function () {
  if (window.__staffDrawerInjected) return;
  window.__staffDrawerInjected = true;

  var style = document.createElement('style');
  style.textContent = [
    '.sd-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: none; z-index: 1000; }',
    '.sd-overlay.open { display: block; }',
    '.sd-drawer { position: fixed; top: 0; right: 0; height: 100vh; width: 480px; max-width: 100vw; background: #fff; box-shadow: -8px 0 32px rgba(0,0,0,0.18); transform: translateX(100%); transition: transform 280ms cubic-bezier(.22,.61,.36,1); z-index: 1001; display: flex; flex-direction: column; font-family: var(--font-body); }',
    '.sd-drawer.open { transform: translateX(0); }',
    '.sd-head { padding: 18px 24px; border-bottom: 1px solid #F0F6FC; display: flex; justify-content: space-between; align-items: center; flex-shrink: 0; }',
    '.sd-head h2 { margin: 0; font-family: var(--font-display); font-weight: 700; font-size: 18px; color: #1A2E40; }',
    '.sd-head button.x { background: none; border: none; cursor: pointer; color: #5A7A96; padding: 6px; border-radius: 6px; display: flex; }',
    '.sd-head button.x:hover { background: #F0F6FC; color: #1A2E40; }',
    '.sd-body { padding: 20px 24px; overflow-y: auto; flex: 1; }',
    '.sd-sec { margin-top: 16px; padding-top: 14px; border-top: 1px solid #F0F6FC; }',
    '.sd-sec:first-of-type { margin-top: 0; padding-top: 0; border-top: none; }',
    '.sd-sec-lbl { font-family: var(--font-display); font-weight: 500; font-size: 11px; color: #5A7A96; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 12px; }',
    '.sd-photo-row { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; }',
    '.sd-photo-circle { width: 72px; height: 72px; border-radius: 50%; border: 2px dashed #CBD5E1; background: #F8FBFD; display: flex; align-items: center; justify-content: center; color: #5A7A96; cursor: pointer; flex-shrink: 0; }',
    '.sd-photo-circle .lucide { width: 28px; height: 28px; }',
    '.sd-photo-label { font-family: var(--font-body); font-size: 12px; color: #5A7A96; cursor: pointer; }',
    '.sd-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }',
    '.sd-field { margin-bottom: 12px; }',
    '.sd-field.full { grid-column: 1 / -1; }',
    '.sd-field label { display: block; font-family: var(--font-display); font-weight: 500; font-size: 12px; color: #1A2E40; margin-bottom: 5px; }',
    '.sd-field label .req { color: #DC2626; }',
    '.sd-field input, .sd-field select { width: 100%; height: 40px; padding: 0 12px; border: 1px solid #CBD5E1; border-radius: 8px; font-family: var(--font-body); font-size: 13px; color: #1A2E40; outline: none; background: #fff; }',
    '.sd-field input::placeholder { color: #9CA3AF; font-size: 12px; }',
    '.sd-field input:focus, .sd-field select:focus { border-color: #2D6A9F; }',
    '.sd-field.locked input { background: #F8F9FA; padding-right: 36px; cursor: not-allowed; }',
    '.sd-field.locked { position: relative; }',
    '.sd-field.locked .lock-icon { position: absolute; right: 12px; top: 33px; color: #9CA3AF; }',
    '.sd-field.locked .lock-icon .lucide { width: 14px; height: 14px; }',
    '.sd-field.with-toggle { position: relative; }',
    '.sd-field.with-toggle input { padding-right: 36px; }',
    '.sd-field.with-toggle .eye-btn { position: absolute; right: 8px; top: 28px; background: none; border: none; cursor: pointer; padding: 4px; color: #5A7A96; }',
    '.sd-field.with-toggle .eye-btn .lucide { width: 14px; height: 14px; }',
    '.sd-conditional { border-left: 2px solid #0D9488; padding-left: 10px; margin-left: -10px; }',
    '.sd-conditional .cond-tag { font-family: var(--font-display); font-weight: 600; font-size: 10px; color: #0D9488; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; display: block; }',
    '.sd-status-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; align-items: end; }',
    '.sd-toggle-wrap { display: flex; align-items: center; gap: 10px; height: 40px; }',
    '.sd-toggle { width: 36px; height: 20px; border-radius: 9999px; background: #15803D; cursor: pointer; position: relative; padding: 2px; transition: background 120ms; }',
    '.sd-toggle .knob { width: 16px; height: 16px; border-radius: 50%; background: #fff; margin-left: auto; transition: margin 150ms; }',
    '.sd-toggle.off { background: #CBD5E1; }',
    '.sd-toggle.off .knob { margin-left: 0; }',
    '.sd-toggle-label { font-family: var(--font-display); font-weight: 500; font-size: 13px; color: #15803D; }',
    '.sd-toggle.off + .sd-toggle-label { color: #5A7A96; }',
    '.sd-helper { font-family: var(--font-body); font-size: 11px; color: #5A7A96; font-style: italic; margin-top: 6px; }',
    '.sd-info-strip { background: rgba(13,148,136,0.08); border-left: 3px solid #0D9488; padding: 8px 12px; border-radius: 6px; font-family: var(--font-body); font-size: 12px; color: #5A7A96; font-style: italic; margin-bottom: 12px; }',
    '.sd-error { border-color: #DC2626 !important; }',
    '.sd-error-msg { font-family: var(--font-body); font-size: 12px; color: #DC2626; margin-top: 4px; }',
    '.sd-foot { padding: 16px 24px; border-top: 1px solid #F0F6FC; background: #fff; display: flex; gap: 12px; flex-shrink: 0; }',
    '.sd-btn { flex: 1; height: 40px; border-radius: 8px; font-family: var(--font-display); font-weight: 600; font-size: 13px; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 6px; }',
    '.sd-btn.ghost { background: #fff; border: 1px solid #CBD5E1; color: #1A2E40; }',
    '.sd-btn.primary { background: #2D6A9F; border: none; color: #fff; }',
    '.sd-btn.primary:hover { background: #1A5685; }',
    '.sd-btn .lucide { width: 14px; height: 14px; }',
    '.sd-toast { position: fixed; bottom: 24px; right: 24px; background: #15803D; color: #fff; padding: 12px 18px; border-radius: 8px; font-family: var(--font-display); font-weight: 600; font-size: 13px; box-shadow: 0 4px 14px rgba(0,0,0,0.18); opacity: 0; transform: translateY(10px); transition: opacity 200ms, transform 200ms; z-index: 1100; pointer-events: none; display: inline-flex; align-items: center; gap: 8px; }',
    '.sd-toast.show { opacity: 1; transform: translateY(0); }'
  ].join('\n');
  document.head.appendChild(style);

  // Overlay
  var overlay = document.createElement('div');
  overlay.className = 'sd-overlay';
  overlay.id = 'sd-overlay';
  document.body.appendChild(overlay);

  // Drawer
  var drawer = document.createElement('aside');
  drawer.className = 'sd-drawer';
  drawer.id = 'sd-drawer';
  drawer.innerHTML = ''
    + '<div class="sd-head">'
    +   '<h2>Add New Staff</h2>'
    +   '<button class="x" data-sd-close><i data-lucide="x"></i></button>'
    + '</div>'
    + '<div class="sd-body">'
    +   '<div class="sd-sec">'
    +     '<div class="sd-sec-lbl">Personal Information</div>'
    +     '<div class="sd-photo-row">'
    +       '<div class="sd-photo-circle"><i data-lucide="camera"></i></div>'
    +       '<span class="sd-photo-label">Upload Photo</span>'
    +     '</div>'
    +     '<div class="sd-field full"><label>Full Name <span class="req">*</span></label><input id="sd-fullname" placeholder="e.g., Dr. Sarah Mendoza"></div>'
    +     '<div class="sd-field full"><label>Email Address <span class="req">*</span></label><input id="sd-email" type="email" placeholder="name@cloudskin.com"></div>'
    +     '<div class="sd-grid-2">'
    +       '<div class="sd-field"><label>Phone Number</label><input id="sd-phone" placeholder="+63 917-…"></div>'
    +       '<div class="sd-field"><label>Date of Birth</label><input id="sd-dob" type="date"></div>'
    +       '<div class="sd-field"><label>Gender</label><select id="sd-gender"><option value="">Select…</option><option>Male</option><option>Female</option><option>Prefer not to say</option></select></div>'
    +     '</div>'
    +   '</div>'
    +   '<div class="sd-sec">'
    +     '<div class="sd-sec-lbl">Emergency Contact</div>'
    +     '<div class="sd-field full"><label>Emergency Contact Name</label><input id="sd-ec-name" placeholder="Full name"></div>'
    +     '<div class="sd-grid-2">'
    +       '<div class="sd-field"><label>Emergency Contact Number</label><input id="sd-ec-phone" placeholder="+63 917-…"></div>'
    +       '<div class="sd-field"><label>Relationship</label><select id="sd-ec-rel"><option value="">Select…</option><option>Spouse</option><option>Parent</option><option>Sibling</option><option>Friend</option><option>Other</option></select></div>'
    +     '</div>'
    +   '</div>'
    +   '<div class="sd-sec">'
    +     '<div class="sd-sec-lbl">Employment Details</div>'
    +     '<div class="sd-field full"><label>Role <span class="req">*</span></label><select id="sd-role"><option value="Admin">Admin</option><option value="Practitioner" selected>Practitioner</option><option value="Receptionist">Receptionist</option></select></div>'
    +     '<div class="sd-field full sd-conditional" id="sd-specialty-wrap"><span class="cond-tag">Practitioner only</span><label>Specialty</label><select id="sd-specialty"><option>Dermatology</option><option selected>Aesthetic Medicine</option><option>Laser Specialist</option><option>Cosmetology</option><option>Wellness</option></select></div>'
    +     '<div class="sd-field full"><label>Employment Type</label><select id="sd-emp-type"><option>Full-time</option><option>Part-time</option><option>Visiting Specialist</option></select></div>'
    +     '<div class="sd-status-row">'
    +       '<div class="sd-field"><label>Start Date</label><input id="sd-start" type="date"></div>'
    +       '<div class="sd-field"><label>Status</label><div class="sd-toggle-wrap"><div class="sd-toggle" id="sd-status-toggle"><div class="knob"></div></div><span class="sd-toggle-label" id="sd-status-lbl">Active</span></div></div>'
    +     '</div>'
    +     '<div class="sd-helper">Inactive staff cannot log in to the system.</div>'
    +   '</div>'
    +   '<div class="sd-sec" id="sd-credentials">'
    +     '<div class="sd-sec-lbl">Professional Credentials</div>'
    +     '<div class="sd-info-strip">This section is required for Practitioner role only.</div>'
    +     '<div class="sd-grid-2">'
    +       '<div class="sd-field"><label>PRC License Number</label><input id="sd-prc" placeholder="e.g., 0123456"></div>'
    +       '<div class="sd-field"><label>License Expiry Date</label><input id="sd-prc-exp" type="date"></div>'
    +     '</div>'
    +     '<div class="sd-field full"><label>PTR Number</label><input id="sd-ptr" placeholder="e.g., PTR-2026-…"></div>'
    +   '</div>'
    +   '<div class="sd-sec">'
    +     '<div class="sd-sec-lbl">Account Access</div>'
    +     '<div class="sd-field full locked"><label>Login Email</label><input id="sd-login-email" readonly placeholder="Auto-fills from email above"><span class="lock-icon"><i data-lucide="lock"></i></span></div>'
    +     '<div class="sd-field full with-toggle"><label>Temporary Password</label><input id="sd-pwd" type="password" placeholder="Auto-generate or set manually"><button type="button" class="eye-btn" id="sd-eye"><i data-lucide="eye"></i></button></div>'
    +     '<div class="sd-helper">Staff will be prompted to change their password on first login.</div>'
    +   '</div>'
    + '</div>'
    + '<div class="sd-foot">'
    +   '<button class="sd-btn ghost" data-sd-close>Cancel</button>'
    +   '<button class="sd-btn primary" id="sd-save"><i data-lucide="check"></i> Add Staff</button>'
    + '</div>';
  document.body.appendChild(drawer);

  var toast = document.createElement('div');
  toast.className = 'sd-toast';
  toast.innerHTML = '<i data-lucide="check-circle"></i><span id="sd-toast-text">Staff added</span>';
  document.body.appendChild(toast);

  if (window.lucide) window.lucide.createIcons();

  function open() { overlay.classList.add('open'); drawer.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function close() { overlay.classList.remove('open'); drawer.classList.remove('open'); document.body.style.overflow = ''; }

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-open-staff-add], .btn-add-staff, #open-add');
    if (!trigger) {
      var link = e.target.closest('a, button');
      if (link && !link.__sdHandled) {
        var txt = (link.textContent || '').trim().toLowerCase();
        if (txt === 'add staff' || txt === '+ add staff' || txt === '＋ add staff') {
          link.__sdHandled = true;
          trigger = link;
        }
      }
    }
    if (trigger) { e.preventDefault(); open(); return; }
    if (e.target.closest('[data-sd-close]') || e.target === overlay) close();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && drawer.classList.contains('open')) close(); });

  // Role -> show/hide specialty + credentials
  var roleSel = document.getElementById('sd-role');
  function syncRole() {
    var isPract = roleSel.value === 'Practitioner';
    document.getElementById('sd-specialty-wrap').style.display = isPract ? '' : 'none';
    document.getElementById('sd-credentials').style.display = isPract ? '' : 'none';
  }
  roleSel.addEventListener('change', syncRole);
  syncRole();

  // Status toggle
  var tog = document.getElementById('sd-status-toggle');
  var togLbl = document.getElementById('sd-status-lbl');
  tog.addEventListener('click', function () {
    tog.classList.toggle('off');
    var off = tog.classList.contains('off');
    togLbl.textContent = off ? 'Inactive' : 'Active';
    togLbl.style.color = off ? '#5A7A96' : '#15803D';
  });

  // Login email autofill
  var emailIn = document.getElementById('sd-email');
  var loginEmail = document.getElementById('sd-login-email');
  emailIn.addEventListener('input', function () { loginEmail.value = emailIn.value; });

  // Eye toggle
  var eyeBtn = document.getElementById('sd-eye');
  var pwd = document.getElementById('sd-pwd');
  eyeBtn.addEventListener('click', function () {
    pwd.type = pwd.type === 'password' ? 'text' : 'password';
    eyeBtn.innerHTML = pwd.type === 'password' ? '<i data-lucide="eye"></i>' : '<i data-lucide="eye-off"></i>';
    if (window.lucide) window.lucide.createIcons();
  });

  // Save
  document.getElementById('sd-save').addEventListener('click', function () {
    var name = document.getElementById('sd-fullname').value.trim();
    var em = emailIn.value.trim();
    if (!name || !em) {
      var t = document.getElementById('sd-toast-text');
      t.textContent = 'Please fill in required fields';
      toast.style.background = '#DC2626';
      toast.classList.add('show');
      setTimeout(function () { toast.classList.remove('show'); toast.style.background = '#15803D'; }, 2200);
      return;
    }
    try {
      var list = JSON.parse(localStorage.getItem('cs.newStaff') || '[]');
      list.push({
        id: 'S' + Date.now(), name: name, email: em,
        phone: document.getElementById('sd-phone').value,
        role: document.getElementById('sd-role').value,
        specialty: document.getElementById('sd-specialty').value,
        empType: document.getElementById('sd-emp-type').value,
        startDate: document.getElementById('sd-start').value,
        active: !document.getElementById('sd-status-toggle').classList.contains('off'),
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('cs.newStaff', JSON.stringify(list));
    } catch (e) {}
    document.getElementById('sd-toast-text').textContent = name + ' added';
    toast.classList.add('show');
    setTimeout(function () { toast.classList.remove('show'); }, 2500);
    drawer.querySelectorAll('input').forEach(function (i) { if (!i.readOnly) i.value = ''; });
    loginEmail.value = '';
    close();
  });
})();
