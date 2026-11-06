(function () {
  var entries = Array.prototype.slice.call(document.querySelectorAll('details.entry'));
  var groups = Array.prototype.slice.call(document.querySelectorAll('.group'));
  var sections = Array.prototype.slice.call(document.querySelectorAll('section.sec'));
  var catBtns = Array.prototype.slice.call(document.querySelectorAll('[data-cat].chip-btn'));
  var topicBtns = Array.prototype.slice.call(document.querySelectorAll('[data-topic]'));
  var modeBtns = Array.prototype.slice.call(document.querySelectorAll('.seg-btn'));
  var topicRow = document.getElementById('topic-chips');
  var toolRow = document.getElementById('tool-chips');
  var countEl = document.getElementById('count');
  var toggleBtn = document.getElementById('toggle-all');
  var TIP = 'No projects in this category';
  var TOP_N = 20;
  var state = { cat: 'all', mode: 'topic', topic: 'all', tool: 'all', allTools: false };

  entries.forEach(function (e) {
    e._tags = (e.dataset.tags || '').split(/\s+/);
    e._tools = Array.prototype.slice.call(e.querySelectorAll('ul.tools:not(.planned) li')).map(function (li) { return li.textContent.trim(); });
  });

  function inCat(e) { return state.cat === 'all' || e.dataset.cat === state.cat; }
  function hasTopic(e, t) { return t === 'all' || e._tags.indexOf(t) > -1; }
  function hasTool(e, t) { return t === 'all' || e._tools.indexOf(t) > -1; }
  function matches(e) {
    if (!inCat(e)) return false;
    return state.mode === 'topic' ? hasTopic(e, state.topic) : hasTool(e, state.tool);
  }

  // Build tool chips from the tool lists inside each entry
  var toolNames = [];
  entries.forEach(function (e) { e._tools.forEach(function (t) { if (toolNames.indexOf(t) < 0) toolNames.push(t); }); });
  function makeChip(label, value) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'chip-btn'; b.dataset.tool = value;
    b.id = 'tool-' + label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    b.setAttribute('aria-pressed', value === 'all' ? 'true' : 'false');
    b.appendChild(document.createTextNode(label));
    var n = document.createElement('span'); n.className = 'n'; b.appendChild(n);
    return b;
  }
  var toolAny = makeChip('Any', 'all');
  var toolBtns = toolNames.map(function (t) { return makeChip(t, t); });
  var moreBtn = document.createElement('button');
  moreBtn.type = 'button'; moreBtn.className = 'text-btn'; moreBtn.id = 'tool-more';
  toolRow.appendChild(toolAny);
  toolBtns.forEach(function (b) { toolRow.appendChild(b); });
  toolRow.appendChild(moreBtn);

  // Topic chips get a count badge too
  topicBtns.forEach(function (b) { var n = document.createElement('span'); n.className = 'n'; b.appendChild(n); });

  function setCount(btn, n) { btn.querySelector('.n').textContent = n; }
  function setDisabled(btn, off) {
    if (off) { btn.setAttribute('aria-disabled', 'true'); btn.dataset.tip = TIP; }
    else { btn.removeAttribute('aria-disabled'); delete btn.dataset.tip; }
  }
  function press(btns, value, key) {
    btns.forEach(function (b) { b.setAttribute('aria-pressed', b.dataset[key] === value ? 'true' : 'false'); });
  }

  function refreshChips() {
    var catEntries = entries.filter(inCat);
    topicBtns.forEach(function (b) {
      var n = catEntries.filter(function (e) { return hasTopic(e, b.dataset.topic); }).length;
      setCount(b, n);
      if (b.dataset.topic !== 'all') setDisabled(b, n === 0);
    });
    if (state.topic !== 'all' && !catEntries.some(function (e) { return hasTopic(e, state.topic); })) state.topic = 'all';

    setCount(toolAny, catEntries.length);
    var counts = {};
    toolBtns.forEach(function (b) {
      counts[b.dataset.tool] = catEntries.filter(function (e) { return hasTool(e, b.dataset.tool); }).length;
      setCount(b, counts[b.dataset.tool]);
      setDisabled(b, counts[b.dataset.tool] === 0);
    });
    if (state.tool !== 'all' && !counts[state.tool]) state.tool = 'all';
    toolBtns.sort(function (a, b) {
      return (counts[b.dataset.tool] - counts[a.dataset.tool]) || a.dataset.tool.localeCompare(b.dataset.tool);
    });
    toolBtns.forEach(function (b, i) {
      toolRow.insertBefore(b, moreBtn);
      b.hidden = !state.allTools && i >= TOP_N && b.dataset.tool !== state.tool;
    });
    moreBtn.hidden = toolBtns.length <= TOP_N;
    moreBtn.textContent = state.allTools ? 'Fewer tools' : 'All ' + toolBtns.length + ' tools';

    press(catBtns, state.cat, 'cat');
    press(topicBtns, state.topic, 'topic');
    press([toolAny].concat(toolBtns), state.tool, 'tool');
    press(modeBtns, state.mode, 'mode');
    topicRow.hidden = state.mode !== 'topic';
    toolRow.hidden = state.mode !== 'tool';
  }

  function visibleEntries() { return entries.filter(function (e) { return !e.hidden; }); }

  function apply() {
    refreshChips();
    entries.forEach(function (e) { e.hidden = !matches(e); });
    var sub = state.mode === 'topic' ? state.topic : state.tool;
    var filtered = state.cat !== 'all' || sub !== 'all';
    groups.forEach(function (g) {
      if (g.dataset.static) { g.hidden = filtered; return; }
      g.hidden = !g.querySelector('details.entry:not([hidden])');
    });
    sections.forEach(function (s) {
      s.hidden = !s.querySelector('details.entry:not([hidden])');
    });
    var n = visibleEntries().length;
    var suffix = state.mode === 'tool' && state.tool !== 'all' ? ' using ' + state.tool : '';
    countEl.textContent = filtered ? 'Showing ' + n + ' of ' + entries.length + ' projects' + suffix : 'Showing all ' + entries.length + ' projects';
    syncToggle();
  }

  function syncToggle() {
    var vis = visibleEntries();
    var allOpen = vis.length > 0 && vis.every(function (e) { return e.open; });
    toggleBtn.textContent = allOpen ? 'Collapse all' : 'Expand all';
  }

  function isOff(b) { return b.getAttribute('aria-disabled') === 'true'; }

  catBtns.forEach(function (b) {
    b.addEventListener('click', function () { state.cat = b.dataset.cat; apply(); });
  });
  modeBtns.forEach(function (b) {
    b.addEventListener('click', function () { state.mode = b.dataset.mode; apply(); });
  });
  topicBtns.forEach(function (b) {
    b.addEventListener('click', function () { if (isOff(b)) return; state.topic = b.dataset.topic; apply(); });
  });
  [toolAny].concat(toolBtns).forEach(function (b) {
    b.addEventListener('click', function () { if (isOff(b)) return; state.tool = b.dataset.tool; apply(); });
  });
  moreBtn.addEventListener('click', function () { state.allTools = !state.allTools; apply(); });
  toggleBtn.addEventListener('click', function () {
    var vis = visibleEntries();
    var open = !vis.every(function (e) { return e.open; });
    vis.forEach(function (e) { e.open = open; });
    syncToggle();
  });
  entries.forEach(function (e) { e.addEventListener('toggle', syncToggle); });

  function openFromHash() {
    var id = (location.hash || '').slice(1);
    if (!id) return;
    var el = document.getElementById(id);
    if (el && el.tagName === 'DETAILS') {
      if (el.hidden) { state.cat = 'all'; state.topic = 'all'; state.tool = 'all'; apply(); }
      el.open = true;
      el.scrollIntoView({ block: 'start' });
    }
  }
  document.querySelectorAll('.sdlc a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (ev) {
      var el = document.getElementById(a.getAttribute('href').slice(1));
      if (!el) return;
      ev.preventDefault();
      el.open = true;
      el.scrollIntoView({ block: 'start', behavior: 'smooth' });
    });
  });
  window.addEventListener('hashchange', openFromHash);

  apply();
  openFromHash();
})();
