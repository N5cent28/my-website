(function () {
  var root = document.querySelector('.tg');
  if (!root) return;

  var places = JSON.parse(document.getElementById('tg-data').textContent || '[]');
  var byId = {};
  places.forEach(function (p) { byId[p.id] = p; });

  // Chronological order for the prev/next arrows: by earliest year listed;
  // places without a year ("Too many to list", blank) go last in file order.
  function firstYear(p) {
    var m = String(p.years || '').match(/\d{4}/g);
    return m ? Math.min.apply(null, m.map(Number)) : Infinity;
  }
  var timeline = places.map(function (p, i) { return { id: p.id, y: firstYear(p), i: i }; })
    .sort(function (a, b) { return a.y - b.y || a.i - b.i; })
    .map(function (x) { return x.id; });

  var el = {
    globe: document.getElementById('tg-globe'),
    hint: document.getElementById('tg-hint'),
    empty: document.getElementById('tg-empty'),
    detail: document.getElementById('tg-detail'),
    close: document.getElementById('tg-close'),
    media: document.getElementById('tg-media'),
    photo: document.getElementById('tg-photo'),
    prev: document.getElementById('tg-prev'),
    next: document.getElementById('tg-next'),
    years: document.getElementById('tg-years'),
    name: document.getElementById('tg-name'),
    stops: document.getElementById('tg-stops'),
    blurb: document.getElementById('tg-blurb')
  };
  var pins = [];
  var world = null;
  var active = null;

  // globe.gl's single-file build bundles three r185; the daylight shader needs a few
  // three classes of its own, so load the same revision as a standalone module.
  var THREE_URL = 'https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.min.js';
  var TEX = { day: '/images/globe/earth-blue-marble.jpg', night: '/images/globe/earth-night.jpg' };
  var HOME = { lat: 30, lng: -45, altitude: 1.9 };

  // The canvas is drawn larger than its layout box (see CSS) to leave room for the glow.
  // Pull the camera back by the same ratio so the globe itself stays the same size.
  function pad() {
    var box = el.globe.parentElement.clientWidth;
    return box ? el.globe.clientWidth / box : 1;
  }
  function alt(a) { return (1 + a) * pad() - 1; }

  /* ---------- card ---------- */

  function center(p) {
    var lat = 0, lng = 0;
    p.points.forEach(function (q) { lat += q.lat; lng += q.lng; });
    return { lat: lat / p.points.length, lng: lng / p.points.length };
  }

  function show(id) {
    var p = byId[id];
    if (!p) return;
    active = id;
    el.name.textContent = p.name;
    el.years.textContent = p.years || '';
    el.years.hidden = !p.years;
    var stops = p.points.length > 1 ? p.points.map(function (q) { return q.name; }).join(' · ') : '';
    el.stops.textContent = stops;
    el.stops.hidden = !stops;
    el.blurb.textContent = p.blurb || '';
    if (p.photo) { el.photo.src = p.photo; el.photo.alt = p.name; el.photo.hidden = false; }
    else { el.photo.removeAttribute('src'); el.photo.hidden = true; }
    el.media.classList.toggle('no-photo', !p.photo);
    el.empty.hidden = true;
    el.detail.hidden = false;
    pins.forEach(function (pin) { pin.classList.toggle('is-active', pin.dataset.place === id); });
    if (world) {
      world.controls().autoRotate = false;
      var c = center(p);
      world.pointOfView({ lat: c.lat, lng: c.lng, altitude: alt(1.5) }, 1200);
    }
  }

  function clear() {
    active = null;
    el.detail.hidden = true;
    el.empty.hidden = false;
    pins.forEach(function (pin) { pin.classList.remove('is-active'); });
    if (world) world.controls().autoRotate = true;
  }

  el.close.addEventListener('click', clear);

  function step(dir) {
    var i = timeline.indexOf(active);
    show(timeline[(i + dir + timeline.length) % timeline.length]);
  }
  el.prev.addEventListener('click', function () { step(-1); });
  el.next.addEventListener('click', function () { step(1); });
  document.addEventListener('keydown', function (e) {
    if (!active || e.altKey || e.ctrlKey || e.metaKey) return;
    var t = e.target && e.target.tagName;
    if (t === 'INPUT' || t === 'TEXTAREA' || t === 'SELECT') return;
    if (e.key === 'ArrowLeft') { step(-1); e.preventDefault(); }
    else if (e.key === 'ArrowRight') { step(1); e.preventDefault(); }
  });

  function makePin(d) {
    var pin = document.createElement('button');
    pin.type = 'button';
    pin.className = 'tg-pin';
    pin.dataset.place = d.place;
    pin.setAttribute('aria-label', d.name);
    pin.innerHTML = '<span class="tg-dot"></span><span class="tg-label"></span>';
    pin.querySelector('.tg-label').textContent = d.name;
    pin.style.pointerEvents = 'auto';
    pin.addEventListener('click', function (ev) { ev.stopPropagation(); show(d.place); });
    pins.push(pin);
    return pin;
  }

  /* ---------- where the sun is overhead right now ---------- */

  // Low-precision solar position (good to a fraction of a degree), returns the subsolar point.
  function subsolarPoint(date) {
    var rad = Math.PI / 180;
    var n = date.getTime() / 864e5 + 2440587.5 - 2451545.0; // days since J2000
    var L = (280.460 + 0.9856474 * n) % 360;
    var g = (357.528 + 0.9856003 * n) * rad;
    var lambda = (L + 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g)) * rad;
    var eps = (23.439 - 0.0000004 * n) * rad;
    var decl = Math.asin(Math.sin(eps) * Math.sin(lambda));
    var ra = Math.atan2(Math.cos(eps) * Math.sin(lambda), Math.cos(lambda)) / rad;
    var gmst = (280.46061837 + 360.98564736629 * n) % 360;
    var lng = ((ra - gmst) % 360 + 540) % 360 - 180;
    return { lat: decl / rad, lng: lng };
  }

  var VERT = [
    'varying vec3 vNormalW;',
    'varying vec2 vUv;',
    'void main() {',
    '  vNormalW = normalize(mat3(modelMatrix) * normal);',
    '  vUv = uv;',
    '  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
    '}'
  ].join('\n');

  var FRAG = [
    'uniform sampler2D dayTexture;',
    'uniform sampler2D nightTexture;',
    'uniform vec3 sunDirection;',
    'varying vec3 vNormalW;',
    'varying vec2 vUv;',
    'void main() {',
    '  float light = dot(normalize(vNormalW), normalize(sunDirection));',
    '  vec4 day = texture2D(dayTexture, vUv);',
    '  vec4 night = texture2D(nightTexture, vUv) * 1.5 + texture2D(dayTexture, vUv) * 0.12;',
    '  float blend = smoothstep(-0.1, 0.12, light);',   // soft twilight band
    '  gl_FragColor = mix(night, day, blend);',
    '}'
  ].join('\n');

  /* ---------- globe ---------- */

  function build(Globe, THREE) {
    var data = [];
    places.forEach(function (p) {
      p.points.forEach(function (q) { data.push({ place: p.id, name: q.name, lat: q.lat, lng: q.lng }); });
    });

    var loader = new THREE.TextureLoader();
    var material = new THREE.ShaderMaterial({
      uniforms: {
        dayTexture: { value: loader.load(TEX.day) },
        nightTexture: { value: loader.load(TEX.night) },
        sunDirection: { value: new THREE.Vector3(1, 0, 0) }
      },
      vertexShader: VERT,
      fragmentShader: FRAG
    });

    world = new Globe(el.globe, { animateIn: true })
      .backgroundColor('rgba(0,0,0,0)')
      .globeMaterial(material)
      .showAtmosphere(true)
      .atmosphereColor('#8ec5ff')
      .atmosphereAltitude(0.18)
      .htmlElementsData(data)
      .htmlAltitude(0.01)
      .htmlElement(makePin);

    function updateSun() {
      var s = subsolarPoint(new Date());
      var c = world.getCoords(s.lat, s.lng, 0);
      material.uniforms.sunDirection.value.set(c.x, c.y, c.z).normalize();
    }
    updateSun();
    setInterval(updateSun, 60 * 1000);

    var controls = world.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.45;
    controls.enableDamping = true;
    function limits() {
      controls.minDistance = 140 * pad();
      controls.maxDistance = 600 * pad();
    }
    limits();
    world.pointOfView({ lat: HOME.lat, lng: HOME.lng, altitude: alt(HOME.altitude) }, 0);

    el.globe.addEventListener('pointerdown', function () {
      controls.autoRotate = false;
      el.hint.classList.add('is-faded');
    });
    el.globe.addEventListener('wheel', function () { el.hint.classList.add('is-faded'); }, { passive: true });

    function size() {
      var w = el.globe.clientWidth;
      world.width(w).height(el.globe.clientHeight || w);
      limits();
    }
    size();
    if ('ResizeObserver' in window) new ResizeObserver(size).observe(el.globe);
    else window.addEventListener('resize', size);

    if (active) show(active);
  }

  function whenGlobe() {
    return new Promise(function (resolve, reject) {
      if (typeof window.Globe === 'function') return resolve(window.Globe);
      window.addEventListener('load', function () {
        typeof window.Globe === 'function' ? resolve(window.Globe) : reject(new Error('globe.gl not loaded'));
      });
    });
  }

  Promise.all([whenGlobe(), import(THREE_URL)])
    .then(function (m) { build(m[0], m[1]); })
    .catch(function (err) {
      root.classList.add('tg-noglobe');
      if (window.console) console.warn('Travel globe could not load:', err);
    });
})();
