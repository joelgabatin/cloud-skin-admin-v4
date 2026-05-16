// _patient-modal.js — Shared Add New Patient modal for all patient pages.
// Drop in <script src="_patient-modal.js"></script> after _sidebar.js, then mark
// any button with id="open-add-patient" or data-open-patient-modal to trigger.
// Falls back to auto-wiring any button/anchor whose visible text contains
// "New Patient" or "Add Patient".
(function () {
  if (window.__patientModalInjected) return;
  window.__patientModalInjected = true;

  // ===== Inject styles =====
  var style = document.createElement('style');
  style.textContent = [
    '.pm-overlay { position: fixed; inset: 0; background: rgba(26,58,92,0.5); backdrop-filter: blur(4px); display: none; align-items: flex-start; justify-content: center; padding: 40px 20px; z-index: 1000; overflow-y: auto; }',
    '.pm-overlay.open { display: flex; }',
    '.pm-card { background: #fff; border-radius: 12px; max-width: 640px; width: 100%; box-shadow: 0 8px 32px rgba(26,58,92,0.18); display: flex; flex-direction: column; max-height: calc(100vh - 80px); font-family: var(--font-body); }',
    '.pm-head { padding: 20px 24px; border-bottom: 1px solid #E5EFF7; display: flex; justify-content: space-between; align-items: center; }',
    '.pm-head h2 { font-family: var(--font-display); font-weight: 700; font-size: 17px; color: #1A2E40; margin: 0; }',
    '.pm-head .pm-sub { font-family: var(--font-body); font-size: 12px; color: #5A7A96; margin-top: 2px; }',
    '.pm-head button.x { background: none; border: none; cursor: pointer; color: #5A7A96; padding: 6px; border-radius: 6px; }',
    '.pm-head button.x:hover { background: #F0F6FC; color: #1A2E40; }',
    '.pm-body { padding: 22px 24px; overflow-y: auto; }',
    '.pm-sec-lbl { font-family: var(--font-display); font-weight: 700; font-size: 11px; color: #2D6A9F; text-transform: uppercase; letter-spacing: 0.05em; margin: 16px 0 10px; }',
    '.pm-sec-lbl:first-child { margin-top: 0; }',
    '.pm-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }',
    '@media (max-width: 600px) { .pm-grid-2 { grid-template-columns: 1fr; } }',
    '.pm-field { margin-bottom: 12px; }',
    '.pm-field label { display: block; font-family: var(--font-display); font-weight: 600; font-size: 12px; color: #1A2E40; margin-bottom: 5px; }',
    '.pm-field label .req { color: #DC2626; }',
    '.pm-field input, .pm-field select, .pm-field textarea { width: 100%; height: 38px; padding: 0 11px; border: 1px solid #D1E3F3; border-radius: 7px; font-family: var(--font-body); font-size: 13px; color: #1A2E40; outline: none; background: #fff; }',
    '.pm-field textarea { height: auto; padding: 9px 11px; min-height: 64px; resize: vertical; line-height: 1.5; }',
    '.pm-field input:focus, .pm-field select:focus, .pm-field textarea:focus { border-color: #2D6A9F; }',
    '.pm-foot { padding: 14px 22px; border-top: 1px solid #E5EFF7; background: #F8FBFD; display: flex; justify-content: flex-end; gap: 10px; }',
    '.pm-btn { height: 38px; padding: 0 18px; border-radius: 7px; font-family: var(--font-display); font-weight: 600; font-size: 13px; cursor: pointer; border: 1px solid transparent; display: inline-flex; align-items: center; gap: 6px; }',
    '.pm-btn .lucide { width: 14px; height: 14px; }',
    '.pm-btn.ghost { background: #fff; color: #5A7A96; border-color: #D0E8F5; }',
    '.pm-btn.ghost:hover { background: #F0F6FC; }',
    '.pm-btn.primary { background: #2D6A9F; color: #fff; }',
    '.pm-btn.primary:hover { background: #1A5685; }',
    '.pm-toast { position: fixed; bottom: 24px; right: 24px; background: #15803D; color: #fff; padding: 12px 18px; border-radius: 8px; font-family: var(--font-display); font-weight: 600; font-size: 13px; box-shadow: 0 4px 14px rgba(0,0,0,0.18); opacity: 0; transform: translateY(10px); transition: opacity 200ms, transform 200ms; z-index: 1100; pointer-events: none; display: inline-flex; align-items: center; gap: 8px; }',
    '.pm-toast.show { opacity: 1; transform: translateY(0); }',
    '.pm-toast .lucide { width: 16px; height: 16px; }'
  ].join('\n');
  document.head.appendChild(style);

  // ===== Inject modal HTML =====
  var modal = document.createElement('div');
  modal.className = 'pm-overlay';
  modal.id = 'pm-overlay';
  modal.innerHTML = ''
    + '<div class="pm-card" onclick="event.stopPropagation()">'
    +   '<div class="pm-head">'
    +     '<div><h2>Add New Patient</h2><div class="pm-sub">Create a new patient record. Required fields are marked with *.</div></div>'
    +     '<button class="x" data-pm-close><i data-lucide="x"></i></button>'
    +   '</div>'
    +   '<div class="pm-body">'
    +     '<div class="pm-sec-lbl">Personal Information</div>'
    +     '<div class="pm-grid-2">'
    +       '<div class="pm-field"><label>First Name <span class="req">*</span></label><input id="pm-first" placeholder="Sarah" required></div>'
    +       '<div class="pm-field"><label>Last Name <span class="req">*</span></label><input id="pm-last" placeholder="Johnson" required></div>'
    +       '<div class="pm-field"><label>Date of Birth <span class="req">*</span></label><input id="pm-dob" type="date" required></div>'
    +       '<div class="pm-field"><label>Sex</label><select id="pm-sex"><option value="">Select…</option><option>Female</option><option>Male</option><option>Other</option><option>Prefer not to say</option></select></div>'
    +     '</div>'
    +     '<div class="pm-sec-lbl">Contact</div>'
    +     '<div class="pm-grid-2">'
    +       '<div class="pm-field"><label>Phone <span class="req">*</span></label><input id="pm-phone" type="tel" placeholder="0917-123-4567" required></div>'
    +       '<div class="pm-field"><label>Email</label><input id="pm-email" type="email" placeholder="sarah.j@email.com"></div>'
    +     '</div>'
    +     '<div class="pm-field"><label>Address</label><input id="pm-address" placeholder="Street, Barangay, City"></div>'
    +     '<div class="pm-grid-2">'
    +       '<div class="pm-field"><label>Emergency Contact Name</label><input id="pm-ec-name" placeholder="Full name"></div>'
    +       '<div class="pm-field"><label>Emergency Contact Phone</label><input id="pm-ec-phone" type="tel" placeholder="0917-…"></div>'
    +     '</div>'
    +     '<div class="pm-sec-lbl">Medical Notes (Optional)</div>'
    +     '<div class="pm-field"><label>Allergies / Conditions</label><textarea id="pm-notes" rows="3" placeholder="Known allergies, chronic conditions, current medications…"></textarea></div>'
    +     '<div class="pm-grid-2">'
    +       '<div class="pm-field"><label>How did they hear about us?</label><select id="pm-source"><option value="">Select…</option><option>Google Search</option><option>Facebook</option><option>Instagram</option><option>Referral</option><option>Walk-in</option><option>Other</option></select></div>'
    +       '<div class="pm-field"><label>Initial Status</label><select id="pm-status"><option value="Active">Active</option><option value="Inactive">Inactive</option></select></div>'
    +     '</div>'
    +   '</div>'
    +   '<div class="pm-foot">'
    +     '<button class="pm-btn ghost" data-pm-close>Cancel</button>'
    +     '<button class="pm-btn primary" id="pm-save"><i data-lucide="user-plus"></i> Save Patient</button>'
    +   '</div>'
    + '</div>';
  document.body.appendChild(modal);

  // Toast
  var toast = document.createElement('div');
  toast.className = 'pm-toast';
  toast.id = 'pm-toast';
  toast.innerHTML = '<i data-lucide="check-circle"></i><span id="pm-toast-text">Patient added</span>';
  document.body.appendChild(toast);

  if (window.lucide) window.lucide.createIcons();

  // ===== Wiring =====
  function openModal() {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(function () { var f = document.getElementById('pm-first'); if (f) f.focus(); }, 50);
  }
  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('#open-add-patient, [data-open-patient-modal]');
    if (trigger) { e.preventDefault(); openModal(); return; }

    // Auto-wire by visible label
    var btn = e.target.closest('button, a');
    if (btn && !btn.__pmHandled) {
      var txt = (btn.textContent || '').trim().toLowerCase().replace(/\s+/g, ' ');
      if (txt === 'new patient' || txt === '+ new patient' || txt === 'add new patient' || txt === '+ add new patient') {
        btn.__pmHandled = true;
        e.preventDefault();
        openModal();
        return;
      }
    }

    if (e.target.closest('[data-pm-close]') || e.target === modal) {
      closeModal();
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  // Persist new patients to localStorage
  function loadPatients() {
    try { return JSON.parse(localStorage.getItem('cs.newPatients') || '[]'); } catch (e) { return []; }
  }
  function savePatients(list) {
    try { localStorage.setItem('cs.newPatients', JSON.stringify(list)); } catch (e) {}
  }

  document.getElementById('pm-save').addEventListener('click', function () {
    var first = (document.getElementById('pm-first').value || '').trim();
    var last = (document.getElementById('pm-last').value || '').trim();
    var dob = document.getElementById('pm-dob').value;
    var phone = (document.getElementById('pm-phone').value || '').trim();
    if (!first || !last || !dob || !phone) {
      var msg = document.getElementById('pm-toast-text');
      msg.textContent = 'Please fill in required fields';
      toast.style.background = '#DC2626';
      toast.classList.add('show');
      setTimeout(function () { toast.classList.remove('show'); toast.style.background = '#15803D'; }, 2200);
      return;
    }
    var p = {
      id: 'P' + Date.now(),
      first: first, last: last, dob: dob, sex: document.getElementById('pm-sex').value,
      phone: phone, email: document.getElementById('pm-email').value,
      address: document.getElementById('pm-address').value,
      emergencyName: document.getElementById('pm-ec-name').value,
      emergencyPhone: document.getElementById('pm-ec-phone').value,
      notes: document.getElementById('pm-notes').value,
      source: document.getElementById('pm-source').value,
      status: document.getElementById('pm-status').value || 'Active',
      createdAt: new Date().toISOString()
    };
    var list = loadPatients();
    list.push(p);
    savePatients(list);

    document.getElementById('pm-toast-text').textContent = first + ' ' + last + ' added';
    toast.classList.add('show');
    setTimeout(function () { toast.classList.remove('show'); }, 2500);

    // Reset
    ['pm-first','pm-last','pm-dob','pm-phone','pm-email','pm-address','pm-ec-name','pm-ec-phone','pm-notes'].forEach(function (id) {
      document.getElementById(id).value = '';
    });
    document.getElementById('pm-sex').value = '';
    document.getElementById('pm-source').value = '';
    document.getElementById('pm-status').value = 'Active';

    closeModal();
  });
})();
