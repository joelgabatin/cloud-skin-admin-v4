// _vs-drawer.js — Add Visiting Specialist side drawer.
(function () {
  if (window.__vsDrawerInjected) return;
  window.__vsDrawerInjected = true;

  var style = document.createElement('style');
  style.textContent = [
    '.vs-ov { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: none; z-index: 1000; }',
    '.vs-ov.open { display: block; }',
    '.vs-dr { position: fixed; top: 0; right: 0; height: 100vh; width: 480px; max-width: 100vw; background: #fff; box-shadow: -8px 0 32px rgba(0,0,0,0.18); transform: translateX(100%); transition: transform 260ms cubic-bezier(.22,.61,.36,1); z-index: 1001; display: flex; flex-direction: column; font-family: var(--font-body); }',
    '.vs-dr.open { transform: translateX(0); }',
    '.vs-hd { padding: 18px 24px; border-bottom: 1px solid #F0F6FC; display: flex; justify-content: space-between; align-items: center; flex-shrink: 0; }',
    '.vs-hd h2 { margin: 0; font-family: var(--font-display); font-weight: 700; font-size: 18px; color: #1A2E40; }',
    '.vs-hd button.x { background: none; border: none; cursor: pointer; color: #5A7A96; padding: 6px; border-radius: 6px; display: flex; }',
    '.vs-hd button.x:hover { background: #F0F6FC; color: #1A2E40; }',
    '.vs-bd { padding: 20px 24px; overflow-y: auto; flex: 1; }',
    '.vs-sec { margin-top: 16px; padding-top: 14px; border-top: 1px solid #F0F6FC; }',
    '.vs-sec:first-of-type { margin-top: 0; padding-top: 0; border-top: none; }',
    '.vs-lbl { font-family: var(--font-display); font-weight: 500; font-size: 11px; color: #5A7A96; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 12px; }',
    '.vs-photo { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }',
    '.vs-photo .circle { width: 72px; height: 72px; border-radius: 50%; border: 2px dashed #CBD5E1; background: #F8FBFD; display: flex; align-items: center; justify-content: center; color: #5A7A96; cursor: pointer; }',
    '.vs-photo .circle .lucide { width: 28px; height: 28px; }',
    '.vs-photo .lbl { font-family: var(--font-body); font-size: 12px; color: #5A7A96; cursor: pointer; }',
    '.vs-g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }',
    '.vs-f { margin-bottom: 12px; }',
    '.vs-f.full { grid-column: 1 / -1; }',
    '.vs-f label { display: block; font-family: var(--font-display); font-weight: 500; font-size: 12px; color: #1A2E40; margin-bottom: 5px; }',
    '.vs-f input, .vs-f select { width: 100%; height: 40px; padding: 0 12px; border: 1px solid #CBD5E1; border-radius: 8px; font-family: var(--font-body); font-size: 13px; color: #1A2E40; outline: none; background: #fff; }',
    '.vs-f input:focus, .vs-f select:focus { border-color: #2D6A9F; }',
    '.vs-info { background: rgba(13,148,136,0.08); border-left: 3px solid #0D9488; padding: 8px 12px; border-radius: 6px; font-family: var(--font-body); font-size: 12px; color: #5A7A96; font-style: italic; margin-bottom: 12px; }',
    '.vs-help { font-family: var(--font-body); font-size: 11px; color: #5A7A96; font-style: italic; margin-top: 6px; }',
    '.vs-tog-row { display: flex; justify-content: space-between; align-items: center; padding: 4px 0 6px; }',
    '.vs-tog-row .l { font-family: var(--font-display); font-weight: 500; font-size: 14px; color: #1A2E40; }',
    '.vs-tog { width: 38px; height: 22px; border-radius: 9999px; background: #CBD5E1; cursor: pointer; position: relative; padding: 2px; transition: background 120ms; }',
    '.vs-tog.on { background: #15803D; }',
    '.vs-tog .knob { width: 18px; height: 18px; border-radius: 50%; background: #fff; transition: margin 150ms; }',
    '.vs-tog.on .knob { margin-left: auto; }',
    '.vs-disabled { opacity: 0.5; pointer-events: none; }',
    '.vs-disabled .vs-f input { background: #F8F9FA; padding-right: 36px; }',
    '.vs-disabled .vs-f { position: relative; }',
    '.vs-disabled .lock { position: absolute; right: 12px; bottom: 13px; color: #9CA3AF; }',
    '.vs-disabled .lock .lucide { width: 14px; height: 14px; }',
    '.vs-ft { padding: 16px 24px; border-top: 1px solid #F0F6FC; background: #fff; display: flex; gap: 12px; flex-shrink: 0; }',
    '.vs-btn { flex: 1; height: 40px; border-radius: 8px; font-family: var(--font-display); font-weight: 600; font-size: 13px; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 6px; }',
    '.vs-btn.ghost { background: #fff; border: 1px solid #CBD5E1; color: #1A2E40; }',
    '.vs-btn.primary { background: #2D6A9F; border: none; color: #fff; }',
    '.vs-btn.primary:hover { background: #1A5685; }',
    '.vs-btn .lucide { width: 14px; height: 14px; }',
    '.vs-toast { position: fixed; bottom: 24px; right: 24px; background: #15803D; color: #fff; padding: 12px 18px; border-radius: 8px; font-family: var(--font-display); font-weight: 600; font-size: 13px; box-shadow: 0 4px 14px rgba(0,0,0,0.18); opacity: 0; transform: translateY(10px); transition: opacity 200ms, transform 200ms; z-index: 1100; pointer-events: none; display: inline-flex; align-items: center; gap: 8px; }',
    '.vs-toast.show { opacity: 1; transform: translateY(0); }'
  ].join('\n');
  document.head.appendChild(style);

  var ov = document.createElement('div'); ov.className = 'vs-ov'; ov.id = 'vs-ov'; document.body.appendChild(ov);
  var dr = document.createElement('aside'); dr.className = 'vs-dr'; dr.id = 'vs-dr';
  dr.innerHTML = ''
    + '<div class="vs-hd"><h2>Add Visiting Specialist</h2><button class="x" data-vs-close><i data-lucide="x"></i></button></div>'
    + '<div class="vs-bd">'
    +   '<div class="vs-sec"><div class="vs-lbl">Personal Information</div>'
    +     '<div class="vs-photo"><div class="circle"><i data-lucide="camera"></i></div><span class="lbl">Upload Photo</span></div>'
    +     '<div class="vs-f full"><label>Full Name</label><input id="v-name" placeholder="e.g., Dr. Olivia Bautista"></div>'
    +     '<div class="vs-g2"><div class="vs-f"><label>Email Address</label><input id="v-email" type="email"></div><div class="vs-f"><label>Contact Number</label><input id="v-phone" placeholder="0917-…"></div></div>'
    +     '<div class="vs-f full"><label>Gender</label><select id="v-gender"><option value="">Select…</option><option>Male</option><option>Female</option><option>Prefer not to say</option></select></div>'
    +   '</div>'
    +   '<div class="vs-sec"><div class="vs-lbl">Professional Credentials</div>'
    +     '<div class="vs-info">Required for clinical privileges at the clinic.</div>'
    +     '<div class="vs-f full"><label>Specialty</label><input id="v-spec" placeholder="e.g., OB-Gyne / Aesthetic Gynecologist"></div>'
    +     '<div class="vs-g2"><div class="vs-f"><label>PRC License No.</label><input id="v-prc"></div><div class="vs-f"><label>License Expiry Date</label><input id="v-prc-exp" type="date"></div></div>'
    +     '<div class="vs-f full"><label>PTR No.</label><input id="v-ptr"></div>'
    +   '</div>'
    +   '<div class="vs-sec"><div class="vs-lbl">Affiliation</div>'
    +     '<div class="vs-f full"><label>Affiliated Hospital or Clinic</label><input id="v-hosp" placeholder="e.g., St. Luke\'s Medical Center"></div>'
    +     '<div class="vs-f full"><label>Clinic/Hospital Address</label><input id="v-addr" placeholder="Optional"></div>'
    +     '<div class="vs-help">This appears on the specialist\'s profile for reference.</div>'
    +   '</div>'
    +   '<div class="vs-sec"><div class="vs-lbl">Visit Schedule</div>'
    +     '<div class="vs-g2"><div class="vs-f"><label>First Visit Date</label><input id="v-first" type="date"></div><div class="vs-f"><label>Visit Frequency</label><select id="v-freq"><option>One-time Visit</option><option>Weekly</option><option>Bi-weekly</option><option>Monthly</option><option selected>As Needed</option></select></div></div>'
    +     '<div class="vs-help">Upcoming visit dates can be managed from the specialist\'s profile after creation.</div>'
    +   '</div>'
    +   '<div class="vs-sec"><div class="vs-lbl">System Access</div>'
    +     '<div class="vs-tog-row"><span class="l">Grant system login access</span><div class="vs-tog" id="v-tog"><div class="knob"></div></div></div>'
    +     '<div class="vs-help">Enable if this specialist needs to view or update clinical notes during their visit. A login email and temporary password will be sent automatically.</div>'
    +     '<div class="vs-disabled" id="v-access-fields"><div class="vs-f full"><label>Login Email</label><input readonly><span class="lock"><i data-lucide="lock"></i></span></div><div class="vs-f full"><label>Temporary Password</label><input readonly placeholder="Auto-generated when access is granted"><span class="lock"><i data-lucide="lock"></i></span></div></div>'
    +   '</div>'
    + '</div>'
    + '<div class="vs-ft"><button class="vs-btn ghost" data-vs-close>Cancel</button><button class="vs-btn primary" id="vs-save"><i data-lucide="check"></i> Add Specialist</button></div>';
  document.body.appendChild(dr);

  var toast = document.createElement('div'); toast.className = 'vs-toast';
  toast.innerHTML = '<i data-lucide="check-circle"></i><span id="vs-toast-text">Specialist added</span>';
  document.body.appendChild(toast);

  if (window.lucide) window.lucide.createIcons();

  function open() { ov.classList.add('open'); dr.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function close() { ov.classList.remove('open'); dr.classList.remove('open'); document.body.style.overflow = ''; }

  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-open-vs-drawer]');
    if (t) { e.preventDefault(); open(); return; }
    if (e.target.closest('[data-vs-close]') || e.target === ov) close();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && dr.classList.contains('open')) close(); });

  var tog = document.getElementById('v-tog');
  var accessFields = document.getElementById('v-access-fields');
  tog.addEventListener('click', function () {
    tog.classList.toggle('on');
    accessFields.classList.toggle('vs-disabled', !tog.classList.contains('on'));
  });

  document.getElementById('vs-save').addEventListener('click', function () {
    var n = document.getElementById('v-name').value.trim();
    if (!n) {
      document.getElementById('vs-toast-text').textContent = 'Please enter the specialist name';
      toast.style.background = '#DC2626'; toast.classList.add('show');
      setTimeout(function () { toast.classList.remove('show'); toast.style.background = '#15803D'; }, 2200);
      return;
    }
    try {
      var list = JSON.parse(localStorage.getItem('cs.newVisitingSpecialists') || '[]');
      list.push({ id: 'V' + Date.now(), name: n,
        specialty: document.getElementById('v-spec').value,
        email: document.getElementById('v-email').value,
        phone: document.getElementById('v-phone').value,
        prc: document.getElementById('v-prc').value,
        hospital: document.getElementById('v-hosp').value,
        firstVisit: document.getElementById('v-first').value,
        frequency: document.getElementById('v-freq').value,
        access: tog.classList.contains('on'),
        createdAt: new Date().toISOString() });
      localStorage.setItem('cs.newVisitingSpecialists', JSON.stringify(list));
    } catch (e) {}
    document.getElementById('vs-toast-text').textContent = n + ' added';
    toast.classList.add('show');
    setTimeout(function () { toast.classList.remove('show'); }, 2500);
    dr.querySelectorAll('input').forEach(function (i) { if (!i.readOnly) i.value = ''; });
    close();
  });

  // Sort indicators wiring
  var sortState = { col: 'name', dir: 'asc' };
  function getCell(r, col) {
    var i = ({ name:0, specialty:1, prc:2, contact:3, visit:4, status:5 })[col];
    return (r.children[i] && r.children[i].textContent || '').trim();
  }
  function applySort() {
    var tbody = document.getElementById('rows');
    if (!tbody) return;
    var rows = Array.from(tbody.querySelectorAll('tr'));
    rows.sort(function (a, b) {
      var av = getCell(a, sortState.col), bv = getCell(b, sortState.col);
      return sortState.dir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
    });
    rows.forEach(function (r) { tbody.appendChild(r); });
  }
  document.querySelectorAll('th.vs-sortable').forEach(function (th) {
    th.addEventListener('click', function () {
      var col = th.getAttribute('data-vs');
      if (sortState.col === col) sortState.dir = sortState.dir === 'asc' ? 'desc' : 'asc';
      else { sortState.col = col; sortState.dir = 'asc'; }
      document.querySelectorAll('th.vs-sortable').forEach(function (h) {
        var c = h.getAttribute('data-vs'), is = c === sortState.col;
        h.classList.toggle('sorted', is);
        var a = h.querySelector('.arrow');
        if (a) a.textContent = is ? (sortState.dir === 'asc' ? '↑' : '↓') : '↕';
      });
      applySort();
    });
  });
})();
