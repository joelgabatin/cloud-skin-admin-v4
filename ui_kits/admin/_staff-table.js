// _staff-table.js — Adds sort icons to all columns except Actions on staff tables.
// Drop in after _sidebar.js. Auto-discovers any <table> with a <thead><tr><th>…
// and makes each header sortable except cells whose label is "Actions".
(function () {
  if (window.__staffTableSortInjected) return;
  window.__staffTableSortInjected = true;

  var style = document.createElement('style');
  style.textContent = [
    'th.st-sortable { cursor: pointer; user-select: none; }',
    'th.st-sortable:hover { color: #2D6A9F; }',
    'th.st-sortable .st-arrow { display: inline-block; margin-left: 4px; color: #CBD5E1; font-size: 11px; }',
    'th.st-sortable.st-sorted { color: #2D6A9F; }',
    'th.st-sortable.st-sorted .st-arrow { color: #2D6A9F; }'
  ].join('\n');
  document.head.appendChild(style);

  function init() {
    document.querySelectorAll('table').forEach(function (table) {
      if (table.__stSortInit) return;
      table.__stSortInit = true;
      var headers = Array.prototype.slice.call(table.querySelectorAll('thead th'));
      if (!headers.length) return;
      var sortState = { idx: 0, dir: 'asc' };

      headers.forEach(function (th, i) {
        var label = (th.textContent || '').trim();
        if (/^Actions?$/i.test(label)) return; // skip Actions
        if (!th.querySelector('.st-arrow')) {
          var arrow = document.createElement('span');
          arrow.className = 'st-arrow';
          arrow.textContent = i === 0 ? '↑' : '↕';
          th.appendChild(arrow);
        }
        th.classList.add('st-sortable');
        th.setAttribute('data-st-col', i);
        if (i === 0) th.classList.add('st-sorted');
        th.addEventListener('click', function () {
          if (sortState.idx === i) sortState.dir = sortState.dir === 'asc' ? 'desc' : 'asc';
          else { sortState.idx = i; sortState.dir = 'asc'; }
          headers.forEach(function (h, hi) {
            if (!h.classList.contains('st-sortable')) return;
            var isActive = sortState.idx === hi;
            h.classList.toggle('st-sorted', isActive);
            var a = h.querySelector('.st-arrow');
            if (a) a.textContent = isActive ? (sortState.dir === 'asc' ? '↑' : '↓') : '↕';
          });
          sortRows(table, i, sortState.dir);
        });
      });
    });
  }

  function parseDate(s) {
    if (!s) return 0;
    var d = new Date(s);
    if (!isNaN(d)) return d.getTime();
    d = new Date(s + ' 2026');
    return isNaN(d) ? 0 : d.getTime();
  }

  function sortRows(table, idx, dir) {
    var tbody = table.querySelector('tbody');
    if (!tbody) return;
    var rows = Array.prototype.slice.call(tbody.querySelectorAll('tr'));
    rows.sort(function (a, b) {
      var ac = a.children[idx], bc = b.children[idx];
      if (!ac || !bc) return 0;
      var av = (ac.textContent || '').trim();
      var bv = (bc.textContent || '').trim();
      var ad = parseDate(av), bd = parseDate(bv);
      var bothDate = ad && bd && /\b\d{4}\b/.test(av) && /\b\d{4}\b/.test(bv);
      if (bothDate) return dir === 'asc' ? ad - bd : bd - ad;
      return dir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
    });
    rows.forEach(function (r) { tbody.appendChild(r); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
