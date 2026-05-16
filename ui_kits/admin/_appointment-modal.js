// _appointment-modal.js — Shared Add Appointment modal.
// Include after _sidebar.js. Any link/button with href containing
// "appointment-new.html" or class="btn-add-appt" / [data-open-appt-modal]
// or text "Add Appointment" auto-opens this modal.
(function () {
  if (window.__apptModalInjected) return;
  window.__apptModalInjected = true;

  var style = document.createElement('style');
  style.textContent = [
    '.am-overlay { position: fixed; inset: 0; background: rgba(26,58,92,0.5); backdrop-filter: blur(4px); display: none; align-items: flex-start; justify-content: center; padding: 40px 20px; z-index: 1000; overflow-y: auto; }',
    '.am-overlay.open { display: flex; }',
    '.am-card { background: #fff; border-radius: 12px; max-width: 640px; width: 100%; box-shadow: 0 8px 32px rgba(26,58,92,0.18); display: flex; flex-direction: column; max-height: calc(100vh - 80px); font-family: var(--font-body); }',
    '.am-head { padding: 20px 24px; border-bottom: 1px solid #E5EFF7; display: flex; justify-content: space-between; align-items: center; }',
    '.am-head h2 { font-family: var(--font-display); font-weight: 700; font-size: 17px; color: #1A2E40; margin: 0; }',
    '.am-head .sub { font-family: var(--font-body); font-size: 12px; color: #5A7A96; margin-top: 2px; }',
    '.am-head button.x { background: none; border: none; cursor: pointer; color: #5A7A96; padding: 6px; border-radius: 6px; }',
    '.am-head button.x:hover { background: #F0F6FC; color: #1A2E40; }',
    '.am-body { padding: 22px 24px; overflow-y: auto; }',
    '.am-sec-lbl { font-family: var(--font-display); font-weight: 700; font-size: 11px; color: #2D6A9F; text-transform: uppercase; letter-spacing: 0.05em; margin: 14px 0 10px; }',
    '.am-sec-lbl:first-child { margin-top: 0; }',
    '.am-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }',
    '@media (max-width: 600px) { .am-grid-2 { grid-template-columns: 1fr; } }',
    '.am-field { margin-bottom: 12px; }',
    '.am-field label { display: block; font-family: var(--font-display); font-weight: 600; font-size: 12px; color: #1A2E40; margin-bottom: 5px; }',
    '.am-field label .req { color: #DC2626; }',
    '.am-field input, .am-field select, .am-field textarea { width: 100%; height: 38px; padding: 0 11px; border: 1px solid #D1E3F3; border-radius: 7px; font-family: var(--font-body); font-size: 13px; color: #1A2E40; outline: none; background: #fff; }',
    '.am-field textarea { height: auto; padding: 9px 11px; min-height: 64px; resize: vertical; }',
    '.am-field input:focus, .am-field select:focus, .am-field textarea:focus { border-color: #2D6A9F; }',
    '.am-type-row { display: flex; gap: 8px; }',
    '.am-type-btn { flex: 1; height: 38px; border-radius: 7px; background: #fff; border: 1.5px solid #D1E3F3; color: #5A7A96; font-family: var(--font-display); font-weight: 600; font-size: 12.5px; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 6px; }',
    '.am-type-btn.on { background: #2D6A9F; border-color: #2D6A9F; color: #fff; }',
    '.am-foot { padding: 14px 22px; border-top: 1px solid #E5EFF7; background: #F8FBFD; display: flex; justify-content: flex-end; gap: 10px; }',
    '.am-btn { height: 38px; padding: 0 18px; border-radius: 7px; font-family: var(--font-display); font-weight: 600; font-size: 13px; cursor: pointer; border: 1px solid transparent; display: inline-flex; align-items: center; gap: 6px; }',
    '.am-btn .lucide { width: 14px; height: 14px; }',
    '.am-btn.ghost { background: #fff; color: #5A7A96; border-color: #D0E8F5; }',
    '.am-btn.ghost:hover { background: #F0F6FC; }',
    '.am-btn.primary { background: #2D6A9F; color: #fff; }',
    '.am-btn.primary:hover { background: #1A5685; }',
    '.am-toast { position: fixed; bottom: 24px; right: 24px; background: #15803D; color: #fff; padding: 12px 18px; border-radius: 8px; font-family: var(--font-display); font-weight: 600; font-size: 13px; box-shadow: 0 4px 14px rgba(0,0,0,0.18); opacity: 0; transform: translateY(10px); transition: opacity 200ms, transform 200ms; z-index: 1100; pointer-events: none; display: inline-flex; align-items: center; gap: 8px; }',
    '.am-toast.show { opacity: 1; transform: translateY(0); }',
    '.am-toast .lucide { width: 16px; height: 16px; }'
  ].join('\n');
  document.head.appendChild(style);

  var modal = document.createElement('div');
  modal.className = 'am-overlay';
  modal.id = 'am-overlay';
  modal.innerHTML = ''
    + '<div class="am-card" onclick="event.stopPropagation()">'
    +   '<div class="am-head">'
    +     '<div><h2>Add New Appointment</h2><div class="sub">Schedule a new appointment for a patient. Required fields marked with *.</div></div>'
    +     '<button class="x" data-am-close><i data-lucide="x"></i></button>'
    +   '</div>'
    +   '<div class="am-body">'
    +     '<div class="am-sec-lbl">Patient</div>'
    +     '<div class="am-grid-2">'
    +       '<div class="am-field"><label>Patient <span class="req">*</span></label><input id="am-patient" placeholder="Type to search…" list="am-patients" required><datalist id="am-patients"><option>Sarah Johnson</option><option>Maria Cruz</option><option>Ana Garcia</option><option>Sofia Reyes</option><option>Isabella Santos</option><option>Camille Torres</option><option>Diana Reyes</option><option>Angela Park</option></datalist></div>'
    +       '<div class="am-field"><label>Phone</label><input id="am-phone" placeholder="0917-…"></div>'
    +     '</div>'
    +     '<div class="am-sec-lbl">Service &amp; Schedule</div>'
    +     '<div class="am-grid-2">'
    +       '<div class="am-field"><label>Service <span class="req">*</span></label><select id="am-service" required><option value="">Select service…</option><option>Hydra Facial</option><option>Botox Treatment</option><option>Chemical Peel</option><option>Laser Resurfacing</option><option>Dermal Fillers</option><option>PRP Therapy</option><option>LED Therapy</option><option>Microneedling</option><option>Glutathione IV</option></select></div>'
    +       '<div class="am-field"><label>Practitioner</label><select id="am-pract"><option value="">Select practitioner…</option><option>Dr. Reyes</option><option>Dr. Santos</option><option>Dr. Lim</option><option>Dr. Angela Lim</option><option>Admin</option></select></div>'
    +       '<div class="am-field"><label>Date <span class="req">*</span></label><input id="am-date" type="date" required></div>'
    +       '<div class="am-field"><label>Time <span class="req">*</span></label><input id="am-time" type="time" required></div>'
    +     '</div>'
    +     '<div class="am-sec-lbl">Appointment Type</div>'
    +     '<div class="am-type-row">'
    +       '<button type="button" class="am-type-btn on" data-type="f2f"><i data-lucide="user"></i> Face-to-Face</button>'
    +       '<button type="button" class="am-type-btn" data-type="online"><i data-lucide="video"></i> Online</button>'
    +     '</div>'
    +     '<div class="am-sec-lbl">Notes (Optional)</div>'
    +     '<div class="am-field"><textarea id="am-notes" rows="3" placeholder="Special instructions, reason for visit, package reference…"></textarea></div>'
    +   '</div>'
    +   '<div class="am-foot">'
    +     '<button class="am-btn ghost" data-am-close>Cancel</button>'
    +     '<button class="am-btn primary" id="am-save"><i data-lucide="calendar-plus"></i> Schedule Appointment</button>'
    +   '</div>'
    + '</div>';
  document.body.appendChild(modal);

  var toast = document.createElement('div');
  toast.className = 'am-toast';
  toast.innerHTML = '<i data-lucide="check-circle"></i><span id="am-toast-text">Appointment scheduled</span>';
  document.body.appendChild(toast);

  if (window.lucide) window.lucide.createIcons();

  function openModal() { modal.classList.add('open'); document.body.style.overflow = 'hidden'; setTimeout(function () { var f = document.getElementById('am-patient'); if (f) f.focus(); }, 50); }
  function closeModal() { modal.classList.remove('open'); document.body.style.overflow = ''; }

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-open-appt-modal], .btn-add-appt');
    if (!trigger) {
      var link = e.target.closest('a, button');
      if (link) {
        var href = (link.getAttribute && link.getAttribute('href')) || '';
        var txt = (link.textContent || '').trim().toLowerCase();
        if (href.indexOf('appointment-new.html') !== -1 || txt === 'add appointment' || txt === '+ add appointment' || txt === '＋ add appointment') {
          trigger = link;
        }
      }
    }
    if (trigger) { e.preventDefault(); openModal(); return; }
    if (e.target.closest('[data-am-close]') || e.target === modal) closeModal();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });

  // Type toggle
  document.querySelectorAll('.am-type-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      document.querySelectorAll('.am-type-btn').forEach(function (x) { x.classList.remove('on'); });
      b.classList.add('on');
    });
  });

  document.getElementById('am-save').addEventListener('click', function () {
    var patient = document.getElementById('am-patient').value.trim();
    var service = document.getElementById('am-service').value;
    var date = document.getElementById('am-date').value;
    var time = document.getElementById('am-time').value;
    if (!patient || !service || !date || !time) {
      var msg = document.getElementById('am-toast-text');
      msg.textContent = 'Please fill in required fields';
      toast.style.background = '#DC2626';
      toast.classList.add('show');
      setTimeout(function () { toast.classList.remove('show'); toast.style.background = '#15803D'; }, 2200);
      return;
    }
    var appt = {
      id: 'A' + Date.now(),
      patient: patient,
      phone: document.getElementById('am-phone').value,
      service: service,
      practitioner: document.getElementById('am-pract').value || '',
      date: date, time: time,
      type: (document.querySelector('.am-type-btn.on') || {}).getAttribute('data-type') || 'f2f',
      notes: document.getElementById('am-notes').value,
      createdAt: new Date().toISOString()
    };
    try {
      var list = JSON.parse(localStorage.getItem('cs.newAppointments') || '[]');
      list.push(appt);
      localStorage.setItem('cs.newAppointments', JSON.stringify(list));
    } catch (e) {}
    document.getElementById('am-toast-text').textContent = 'Appointment for ' + patient + ' scheduled';
    toast.classList.add('show');
    setTimeout(function () { toast.classList.remove('show'); }, 2500);
    ['am-patient','am-phone','am-service','am-pract','am-date','am-time','am-notes'].forEach(function (id) { document.getElementById(id).value = ''; });
    document.querySelectorAll('.am-type-btn').forEach(function (x, i) { x.classList.toggle('on', i === 0); });
    closeModal();
  });
})();
