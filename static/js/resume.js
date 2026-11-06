(function () {
  var entries = Array.prototype.slice.call(document.querySelectorAll('.pi-resume details.entry'));
  var chips = Array.prototype.slice.call(document.querySelectorAll('[data-rcat]'));
  var countEl = document.getElementById('rcount');
  var toggleBtn = document.getElementById('rtoggle-all');
  var TIP = 'No positions in this category';
  var state = 'all';

  function cats(e) { return (e.dataset.cats || '').split(/\s+/); }
  function inCat(e, c) { return c === 'all' || cats(e).indexOf(c) > -1; }
  function visible() { return entries.filter(function (e) { return !e.hidden; }); }

  function apply() {
    chips.forEach(function (b) {
      var c = b.dataset.rcat;
      var n = entries.filter(function (e) { return inCat(e, c); }).length;
      b.querySelector('.n').textContent = n;
      if (c !== 'all' && n === 0) { b.setAttribute('aria-disabled', 'true'); b.dataset.tip = TIP; }
      else { b.removeAttribute('aria-disabled'); delete b.dataset.tip; }
      b.setAttribute('aria-pressed', c === state ? 'true' : 'false');
    });
    entries.forEach(function (e) { e.hidden = !inCat(e, state); });
    var n = visible().length;
    countEl.textContent = state === 'all' ? 'Showing all ' + entries.length + ' positions' : 'Showing ' + n + ' of ' + entries.length + ' positions';
    syncToggle();
  }

  function syncToggle() {
    var vis = visible();
    toggleBtn.textContent = vis.length && vis.every(function (e) { return e.open; }) ? 'Collapse all' : 'Expand all';
  }

  chips.forEach(function (b) {
    b.addEventListener('click', function () {
      if (b.getAttribute('aria-disabled') === 'true') return;
      state = b.dataset.rcat; apply();
    });
  });
  toggleBtn.addEventListener('click', function () {
    var vis = visible();
    var open = !vis.every(function (e) { return e.open; });
    vis.forEach(function (e) { e.open = open; });
    syncToggle();
  });
  entries.forEach(function (e) { e.addEventListener('toggle', syncToggle); });

  function openFromHash() {
    var el = document.getElementById((location.hash || '').slice(1));
    if (el && el.tagName === 'DETAILS') {
      if (el.hidden) { state = 'all'; apply(); }
      el.open = true;
      el.scrollIntoView({ block: 'start' });
    }
  }
  window.addEventListener('hashchange', openFromHash);

  apply();
  openFromHash();
})();
