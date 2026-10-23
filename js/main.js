const WHATSAPP = '59899123553';

// Contenidos tomados de los flyers de la escuela
const INSTRUMENTOS = [
  { id: 'piano', nombre: 'Piano', tag: 'Su dulce sonido a veces te lleva',
    desc: 'Y otras veces su ritmo y fuerza te pueden hacer bailar. Desde el primer acercamiento hasta piezas académicas.',
    temas: ['Aproximación a la música', 'Independencia de manos y dedos', 'Lectoescritura', 'Técnica', 'Improvisación', 'Canciones', 'Piezas académicas'],
    img: 'img/piano-vertical.jpg', alt: 'Niño tocando el piano vertical de la escuela' },
  { id: 'guitarra', nombre: 'Guitarra', tag: '¡A tocar!',
    desc: 'Para acompañarte cantando, armar tu repertorio o prepararte para estudiar guitarra en serio.',
    temas: ['Técnica', 'Independencia de manos y dedos', 'Repertorio', 'Tocar y cantar', 'Armonía', 'Solfeo'],
    img: 'img/muestra-guitarra.jpg', alt: 'Estudiante tocando la guitarra junto a su profesor en la muestra' },
  { id: 'canto', nombre: 'Canto', tag: '¡A cantar!',
    desc: 'Encontrá tu voz y tu estilo, con herramientas para cuidarla y afinar con confianza.',
    temas: ['Técnica vocal', 'Estilo', 'Repertorio', 'Respiración', 'Interpretación', 'Teoría musical y audioperceptiva', 'Afinación'],
    img: 'img/encuentro-1.jpg', alt: 'Tres estudiantes cantando al micrófono en un encuentro al aire libre' },
  { id: 'bateria', nombre: 'Batería', tag: 'Sacate las ganas',
    desc: 'No siempre uno puede sacarse las ganas de darle a una batería. Acá sí.',
    temas: ['Desarrollo rítmico', 'Repertorio', 'Escucha y transcripción de temas', 'Exploración de géneros', 'Rudimentos', 'Independencia', 'Lectura'],
    img: 'img/bateria-nino.jpg', alt: 'Niño tocando el redoblante con palillos' },
  { id: 'percusion', nombre: 'Percusión', tag: 'La fuerza de los tambores',
    desc: 'Nada supera la fuerza de los tambores. Candombe, samba y mucho más, con las manos en el parche.',
    temas: ['Técnica de manos', 'Candombe', 'Samba', 'Exploración de géneros', 'Desarrollo del pulso', 'Desarrollo auditivo', 'Solfeo'],
    img: 'img/percusion-clase.jpg', alt: 'Clase de percusión con tambores y batería' },
  { id: 'saxofon', nombre: 'Saxofón', tag: 'Viento con carácter',
    desc: 'Clases individuales para empezar de cero o seguir avanzando con el saxo. Consultanos por horarios disponibles.',
    temas: ['Clases individuales', 'Todos los niveles'] }, // sin foto: no hay ninguna con un saxo
  { id: 'ensamble', nombre: 'Ensamble', tag: 'Tocar con otros',
    desc: 'Armá banda con otros estudiantes: se elige repertorio, se ensaya y se toca en vivo en los encuentros y muestras.',
    temas: ['Banda', 'Repertorio compartido', 'Tocar en vivo'],
    img: 'img/muestra-banda.jpg', alt: 'Banda de estudiantes tocando en vivo' },
  { id: 'iniciacion', nombre: 'Iniciación musical', tag: 'De 3 a 5 años',
    desc: 'Un espacio para familiarizarse con la música a través del juego y la exploración, con expresión corporal y actividades recreativas.',
    temas: ['Juego', 'Exploración', 'Expresión corporal', 'Grupos reducidos'],
    img: 'img/iniciacion.jpg', alt: 'Niños jugando y dibujando en un encuentro de música' },
];

// --- Navegación ---
const nav = document.getElementById('nav');
const toggle = nav.querySelector('.nav__toggle');
const menu = document.getElementById('menu');
addEventListener('scroll', () => nav.classList.toggle('is-scrolled', scrollY > 10), { passive: true });
toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', open);
});
menu.addEventListener('click', (e) => {
  if (e.target.closest('a')) { menu.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); }
});

// --- Instrumentos (tabs) ---
const tabs = document.querySelector('.inst__tabs');
const panel = document.getElementById('inst-panel');
const formPrueba = document.getElementById('form-prueba');

function showInstrumento(id, animate = true) {
  const it = INSTRUMENTOS.find((i) => i.id === id);
  tabs.querySelectorAll('button').forEach((b) => {
    const on = b.dataset.id === id;
    b.setAttribute('aria-selected', on);
    b.tabIndex = on ? 0 : -1;
  });
  const fill = () => {
    panel.querySelector('.inst__tag').textContent = it.tag;
    panel.querySelector('.inst__title').textContent = it.nombre;
    panel.querySelector('.inst__desc').textContent = it.desc;
    panel.querySelector('.inst__list').replaceChildren(...it.temas.map((t) => Object.assign(document.createElement('li'), { textContent: t })));
    const img = panel.querySelector('img');
    panel.classList.toggle('inst__panel--sinfoto', !it.img);
    if (it.img) { img.src = it.img; img.alt = it.alt; }
    panel.querySelector('.inst__cta').dataset.inst = it.nombre;
    panel.classList.remove('is-swapping');
  };
  if (!animate) return fill();
  panel.classList.add('is-swapping');
  setTimeout(fill, 200);
}

INSTRUMENTOS.forEach((it) => {
  const b = document.createElement('button');
  b.className = 'inst__tab'; b.type = 'button'; b.role = 'tab';
  b.dataset.id = it.id; b.textContent = it.nombre;
  b.setAttribute('aria-controls', 'inst-panel');
  b.addEventListener('click', () => showInstrumento(it.id));
  tabs.append(b);
});
tabs.addEventListener('keydown', (e) => {
  if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
  const all = [...tabs.children];
  const i = all.indexOf(document.activeElement);
  const next = all[(i + (e.key === 'ArrowRight' ? 1 : -1) + all.length) % all.length];
  next.focus(); next.click();
});
showInstrumento('piano', false);

// "Probar una clase" deja el instrumento ya elegido en el formulario
panel.querySelector('.inst__cta').addEventListener('click', (e) => {
  const nombre = e.currentTarget.dataset.inst;
  const opt = [...formPrueba.instrumento.options].find((o) => o.text.startsWith(nombre));
  if (opt) formPrueba.instrumento.value = opt.value;
});

// --- Formulario → WhatsApp ---
formPrueba.addEventListener('submit', (e) => {
  e.preventDefault();
  const f = formPrueba;
  const nombre = f.nombre.value.trim();
  const inst = f.instrumento.value;
  const error = f.querySelector('.form__error');
  if (!nombre || !inst) { error.hidden = false; (nombre ? f.instrumento : f.nombre).focus(); return; }
  error.hidden = true;
  const cuando = [...f.querySelectorAll('[name="cuando"]:checked')].map((c) => c.value);
  const lineas = [
    `Hola MIM! Soy ${nombre} y quiero coordinar una clase de prueba.`,
    `Instrumento: ${inst}`,
    `Es ${f.quien.value.toLowerCase()}${f.edad.value ? ` (${f.edad.value} años)` : ''}.`,
  ];
  if (f.nivel.value) lineas.push(`Experiencia: ${f.nivel.value.toLowerCase()}.`);
  if (cuando.length) lineas.push(`Me queda mejor ${cuando.join(' o ')}.`);
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lineas.join('\n'))}`, '_blank', 'noopener');
});

// --- Abierto ahora (lunes a viernes, 9 a 22, hora de Montevideo) ---
(() => {
  const el = document.getElementById('open-now');
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: 'America/Montevideo', weekday: 'short', hour: 'numeric', hour12: false })
    .formatToParts(new Date()).map((x) => [x.type, x.value]));
  const abierto = !['Sat', 'Sun'].includes(p.weekday) && +p.hour >= 9 && +p.hour < 22;
  el.textContent = abierto ? '● Abierto ahora' : '● Cerrado en este momento';
  el.classList.add(abierto ? 'is-open' : 'is-closed');
})();

// --- Aparición al hacer scroll ---
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el, i) => { el.style.transitionDelay = `${(i % 4) * 70}ms`; io.observe(el); });

// --- Inicio: la foto, los stickers y las notas siguen al mouse ---
(() => {
  const media = document.getElementById('hero-media');
  const hero = document.getElementById('inicio');
  if (!media || matchMedia('(prefers-reduced-motion: reduce)').matches || !matchMedia('(hover: hover)').matches) return;
  let raf;
  hero.addEventListener('pointermove', (e) => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const r = media.getBoundingClientRect();
      const clamp = (v) => Math.max(-1, Math.min(1, v));
      media.style.setProperty('--mx', clamp((e.clientX - r.left - r.width / 2) / (r.width / 2)).toFixed(3));
      media.style.setProperty('--my', clamp((e.clientY - r.top - r.height / 2) / (r.height / 2)).toFixed(3));
    });
  });
  hero.addEventListener('pointerleave', () => { media.style.setProperty('--mx', 0); media.style.setProperty('--my', 0); });
})();

// --- Subrayado a mano que se dibuja cuando el título entra en pantalla ---
const ioHand = new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-drawn'); ioHand.unobserve(en.target); } });
}, { threshold: 0.9 });
document.querySelectorAll('.hand').forEach((el) => ioHand.observe(el));

// --- Barra de progreso y sección activa en el menú ---
const progress = document.getElementById('progress');
addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.setProperty('--p', max > 0 ? (scrollY / max).toFixed(4) : 0);
}, { passive: true });
const navLinks = [...menu.querySelectorAll('a[href^="#"]:not(.btn)')];
const ioNav = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) navLinks.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
// se observan todas las secciones para que el menú se desmarque al salir de las que tienen link
document.querySelectorAll('main section[id]').forEach((sec) => ioNav.observe(sec));

// --- Piano para tocar ---
// El sonido se sintetiza con Web Audio (no hay archivos de audio): cada nota suma varios
// armónicos que se apagan a distinta velocidad, un golpe de martillo y algo de reverberación.
(() => {
  const piano = document.getElementById('piano');
  const NOTAS = ['Do', 'Do#', 'Re', 'Re#', 'Mi', 'Fa', 'Fa#', 'Sol', 'Sol#', 'La', 'La#', 'Si'];
  const TECLADO = ['a', 'w', 's', 'e', 'd', 'f', 't', 'g', 'y', 'h', 'u', 'j', 'k', 'o', 'l', 'p', 'ñ'];
  let keys = [], base = 0; // base: semitonos desde el Do central de la primera tecla

  // La cantidad de teclas depende del ancho; las negras van en una capa aparte
  // (como hermanas, no hijas) para que al apretar una blanca no tape a la de al lado.
  function armar() {
    const blancas = Math.max(8, Math.min(22, Math.round(piano.clientWidth / 56)));
    base = blancas >= 15 ? -12 : 0;
    piano.replaceChildren();
    keys = [];
    const ancho = 100 / blancas;
    for (let i = 0, b = 0; b < blancas; i++) {
      const nombre = NOTAS[i % 12], negra = nombre.includes('#');
      const k = document.createElement('div');
      k.dataset.n = i;
      if (negra) {
        k.className = 'key key--b';
        k.style.left = `calc(${b * ancho}% - ${ancho * 0.29}%)`;
        k.style.width = `${ancho * 0.58}%`;
      } else {
        k.className = 'key';
        k.style.left = `${b * ancho}%`;
        k.style.width = `${ancho}%`;
        k.innerHTML = `<span>${nombre}</span>`;
        b++;
      }
      piano.append(k);
      keys[i] = k;
    }
  }
  armar();
  let rz;
  addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(armar, 200); });

  // ----- Motor de sonido -----
  let ctx, salida, ruido;
  // iPhone: que suene aunque tenga puesta la llave de silencio
  if (navigator.audioSession) navigator.audioSession.type = 'playback';
  function iniciarAudio() {
    if (ctx) { if (ctx.state !== 'running') ctx.resume(); return; }
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -16; comp.ratio.value = 3; comp.attack.value = 0.004; comp.release.value = 0.25;
    comp.connect(ctx.destination);
    salida = ctx.createGain(); salida.gain.value = 0.9; salida.connect(comp);
    // reverberación de sala chica, hecha con ruido que se apaga
    const largo = Math.floor(ctx.sampleRate * 1.7), ir = ctx.createBuffer(2, largo, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = ir.getChannelData(c);
      for (let i = 0; i < largo; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / largo) ** 3.2;
    }
    const rev = ctx.createConvolver(); rev.buffer = ir;
    const revTono = ctx.createBiquadFilter(); revTono.type = 'lowpass'; revTono.frequency.value = 3200;
    const revVol = ctx.createGain(); revVol.gain.value = 0.2;
    salida.connect(rev).connect(revTono).connect(revVol).connect(comp);
    // ruido para el golpe del martillo
    ruido = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.05), ctx.sampleRate);
    const r = ruido.getChannelData(0);
    for (let i = 0; i < r.length; i++) r[i] = (Math.random() * 2 - 1) * (1 - i / r.length) ** 2;
  }
  // En el celular el navegador habilita el sonido al soltar el dedo, no al apoyarlo:
  // cualquier toque en la página lo deja listo, con un sonido mudo que lo destraba en iPhone
  const gestos = ['pointerup', 'touchend', 'click', 'keydown'];
  function destrabar() {
    iniciarAudio();
    const b = ctx.createBufferSource(); b.buffer = ctx.createBuffer(1, 1, 22050); b.connect(ctx.destination); b.start();
    ctx.resume().then(() => { if (ctx.state === 'running') gestos.forEach((g) => removeEventListener(g, destrabar, true)); });
  }
  gestos.forEach((g) => addEventListener(g, destrabar, true));

  // semi: semitonos desde el Do central · fuerza: 0 a 1 · largo: segundos que queda sonando
  // espera: segundos hasta que suena · destino: a dónde va (por defecto, la salida general)
  function nota(semi, fuerza = 0.8, largo = 2.6, espera = 0, destino = salida) {
    iniciarAudio();
    destino ??= salida;
    const t = ctx.currentTime + 0.005 + espera;
    const f = 261.63 * 2 ** (semi / 12);
    const cola = Math.min(largo, 4.5) * Math.min(1.5, Math.max(0.5, (262 / f) ** 0.3)); // los graves duran más
    const vol = ctx.createGain();
    vol.gain.setValueAtTime(0.0001, t);
    vol.gain.exponentialRampToValueAtTime(0.3 * fuerza, t + 0.006);
    vol.gain.exponentialRampToValueAtTime(0.11 * fuerza, t + 0.22);
    vol.gain.exponentialRampToValueAtTime(0.0001, t + cola);
    // el brillo del ataque se cierra enseguida, como en una cuerda
    const filtro = ctx.createBiquadFilter(); filtro.type = 'lowpass'; filtro.Q.value = 0.4;
    filtro.frequency.setValueAtTime(Math.min(12000, f * (5 + 9 * fuerza)), t);
    filtro.frequency.exponentialRampToValueAtTime(Math.min(8000, Math.max(700, f * 2.6)), t + 0.7);
    filtro.connect(vol).connect(destino);
    const ARM = [1, 0.52, 0.3, 0.17, 0.11, 0.06, 0.035];
    ARM.forEach((amp, i) => {
      const n = i + 1, fn = f * n * Math.sqrt(1 + 0.00035 * n * n); // cuerda real: armónicos apenas corridos
      if (fn > 15000) return;
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.frequency.value = fn;
      g.gain.setValueAtTime(amp, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + cola / (1 + 0.55 * i)); // los agudos se apagan antes
      o.connect(g).connect(filtro); o.start(t); o.stop(t + cola + 0.05);
    });
    // segunda cuerda apenas desafinada: da el batido típico del piano
    [[1, 0.5], [2, 0.22]].forEach(([n, amp]) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.frequency.value = f * n; o.detune.value = 5;
      g.gain.setValueAtTime(amp, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + cola * 0.8);
      o.connect(g).connect(filtro); o.start(t); o.stop(t + cola);
    });
    const golpe = ctx.createBufferSource(); golpe.buffer = ruido;
    const gf = ctx.createBiquadFilter(); gf.type = 'bandpass'; gf.frequency.value = Math.min(5000, f * 3); gf.Q.value = 0.8;
    const gg = ctx.createGain(); gg.gain.value = 0.2 * fuerza;
    golpe.connect(gf).connect(gg).connect(destino); golpe.start(t);
  }
  window.mimSonido = { iniciar: iniciarAudio, nota, get ctx() { return ctx; }, get salida() { return salida; }, get ruido() { return ruido; } };

  function sonar(i, fuerza, largo) {
    nota(i + base, fuerza, largo);
    const k = keys[i];
    if (!k) return;
    k.classList.add('is-on');
    clearTimeout(k._t);
    k._t = setTimeout(() => k.classList.remove('is-on'), 220);
  }
  const teclaEn = (x, y) => { const k = document.elementFromPoint(x, y)?.closest('#piano .key'); return k ? +k.dataset.n : null; };
  let abajo = false, ultima = null;
  piano.addEventListener('pointerdown', (e) => { abajo = true; ultima = teclaEn(e.clientX, e.clientY); if (ultima !== null) sonar(ultima); e.preventDefault(); });
  piano.addEventListener('pointermove', (e) => {
    if (!abajo) return;
    const n = teclaEn(e.clientX, e.clientY);
    if (n !== null && n !== ultima) { ultima = n; sonar(n, 0.65); }
  });
  ['pointerup', 'pointercancel'].forEach((ev) => addEventListener(ev, () => { abajo = false; ultima = null; }));
  // Con el teclado de la compu, del Do central en adelante (solo si el piano está a la vista)
  addEventListener('keydown', (e) => {
    if (e.repeat || e.ctrlKey || e.metaKey || e.altKey || /^(INPUT|SELECT|TEXTAREA)$/.test(document.activeElement.tagName)) return;
    const r = piano.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return;
    const n = TECLADO.indexOf(e.key.toLowerCase());
    if (n >= 0) sonar(n - base);
  });

  // ----- Melodías (dominio público), con mano derecha y acompañamiento -----
  // Cada mano es una lista de [nota o acorde o null (silencio), duración en tiempos].
  // Las notas son semitonos desde el Do central.
  const DO = [-12, -5], SOL = [-10, -5], FA = [-7, -3], DO3 = [-12, -8, -5];
  const MELODIAS = [
    { nombre: 'Himno a la alegría', tempo: 340,
      der: [[4, 1], [4, 1], [5, 1], [7, 1], [7, 1], [5, 1], [4, 1], [2, 1], [0, 1], [0, 1], [2, 1], [4, 1], [4, 1.5], [2, .5], [2, 2],
        [4, 1], [4, 1], [5, 1], [7, 1], [7, 1], [5, 1], [4, 1], [2, 1], [0, 1], [0, 1], [2, 1], [4, 1], [2, 1.5], [0, .5], [0, 2]],
      izq: [[DO, 4], [SOL, 4], [DO, 4], [DO, 2], [SOL, 2], [DO, 4], [SOL, 4], [DO, 4], [SOL, 2], [DO3, 2]] },
    { nombre: 'Para Elisa', tempo: 185,
      der: [[16, 1], [15, 1], [16, 1], [15, 1], [16, 1], [11, 1], [14, 1], [12, 1], [9, 2], [null, 1], [0, 1], [4, 1], [9, 1],
        [11, 2], [null, 1], [4, 1], [8, 1], [11, 1], [12, 2], [null, 1], [4, 1], [16, 1], [15, 1],
        [16, 1], [15, 1], [16, 1], [11, 1], [14, 1], [12, 1], [9, 2], [null, 1], [0, 1], [4, 1], [9, 1],
        [11, 2], [null, 1], [4, 1], [12, 1], [11, 1], [9, 4]],
      izq: [[null, 8], [-15, 1], [-8, 1], [-3, 1], [null, 3], [-20, 1], [-8, 1], [-4, 1], [null, 3], [-15, 1], [-8, 1], [-3, 1], [null, 3],
        [null, 6], [-15, 1], [-8, 1], [-3, 1], [null, 3], [-20, 1], [-8, 1], [-4, 1], [null, 3], [-15, 1], [-8, 1], [-3, 2]] },
    { nombre: 'Estrellita', tempo: 360,
      der: [[0, 1], [0, 1], [7, 1], [7, 1], [9, 1], [9, 1], [7, 2], [5, 1], [5, 1], [4, 1], [4, 1], [2, 1], [2, 1], [0, 2]],
      izq: [[DO, 4], [FA, 2], [DO, 2], [FA, 2], [DO, 2], [SOL, 2], [DO3, 2]] },
  ];
  const player = document.querySelector('.player'), btn = document.getElementById('piano-demo');
  const nombre = document.getElementById('piano-song'), next = document.getElementById('piano-next');
  let actual = 0, timers = [];
  const parar = () => { timers.forEach(clearTimeout); timers = []; player.classList.remove('is-playing'); btn.setAttribute('aria-label', 'Escuchar melodía'); };
  function elegir(i) { actual = (i + MELODIAS.length) % MELODIAS.length; nombre.textContent = MELODIAS[actual].nombre; }
  function tocar() {
    parar();
    iniciarAudio();
    const m = MELODIAS[actual];
    player.classList.add('is-playing', 'is-used');
    btn.setAttribute('aria-label', 'Parar melodía');
    let fin = 0;
    const mano = (pasos, fuerza, sosten) => {
      let t = 0;
      pasos.forEach(([n, d], i) => {
        if (n !== null) {
          const notas = [].concat(n);
          // pequeñas diferencias de fuerza y de tiempo, para que no suene a máquina
          const f = fuerza * (0.86 + Math.random() * 0.2) * (i % 4 === 0 ? 1.08 : 1);
          notas.forEach((x, j) => timers.push(setTimeout(() => sonar(x - base, f, Math.max(1.4, d * m.tempo / 1000 * sosten)), t + j * 14 + Math.random() * 12)));
        }
        t += d * m.tempo;
      });
      fin = Math.max(fin, t);
    };
    mano(m.der, 0.9, 2.4);
    mano(m.izq, 0.5, 2);
    // al terminar queda lista la siguiente
    timers.push(setTimeout(() => { parar(); elegir(actual + 1); }, fin + 900));
  }
  btn.addEventListener('click', () => (player.classList.contains('is-playing') ? parar() : tocar()));
  next.addEventListener('click', () => { const sonaba = player.classList.contains('is-playing'); parar(); elegir(actual + 1); if (sonaba) tocar(); });
})();

// --- Galería: abrir la foto en grande ---
(() => {
  const lb = document.getElementById('lightbox'), img = lb.querySelector('img');
  document.querySelectorAll('#gallery .g').forEach((fig) => {
    fig.tabIndex = 0; fig.setAttribute('role', 'button');
    const abrir = () => { const i = fig.querySelector('img'); img.src = i.src; img.alt = i.alt; lb.showModal(); };
    fig.addEventListener('click', abrir);
    fig.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); abrir(); } });
  });
  lb.addEventListener('click', (e) => { if (e.target !== img) lb.close(); });
})();

// --- Reseñas: las estrellas aparecen una por una ---
(() => {
  const rv = document.getElementById('resenas');
  new IntersectionObserver((en, o) => { if (en[0].isIntersecting) { rv.classList.add('is-in'); o.disconnect(); } }, { threshold: 0.3 }).observe(rv);
})();

// --- Guitarra para rasguear ---
// Cada cuerda se sintetiza con Karplus-Strong (un ruido corto que se recicla y se va apagando),
// que es lo que más se parece a una cuerda pulsada sin usar grabaciones.
(() => {
  const gtr = document.getElementById('gtr'), ctl = document.getElementById('gtr-ctrl'), S = window.mimSonido;
  if (!gtr || !ctl || !S) return;
  const svg = gtr.querySelector('svg'), cuerdas = [...gtr.querySelectorAll('.gstr')], puntos = document.getElementById('gtr-dots');
  const AL_AIRE = [40, 45, 50, 55, 59, 64]; // Mi La Re Sol Si Mi (notas MIDI), de la más grave a la más aguda
  // traste por cuerda; null = esa cuerda no se toca
  const ACORDES = {
    Mim: [0, 2, 2, 0, 0, 0], Sol: [3, 2, 0, 0, 0, 3], Do: [null, 3, 2, 0, 1, 0],
    Re: [null, null, 0, 2, 3, 2], Lam: [null, 0, 2, 2, 1, 0], Si7: [null, 2, 1, 2, 0, 2],
  };
  const CEJUELA = 70, PUENTE = 522;
  const yTraste = (n) => CEJUELA + (PUENTE - CEJUELA) * (1 - 2 ** (-n / 12));
  const xCuerda = (i, y) => { const l = cuerdas[i].querySelector('line'); const k = (y - CEJUELA) / (PUENTE - CEJUELA); return +l.getAttribute('x1') + (l.getAttribute('x2') - l.getAttribute('x1')) * k; };
  let acorde = 'Mim';
  const cache = new Map(), sonando = [];

  function bufferDe(midi) {
    if (cache.has(midi)) return cache.get(midi);
    const sr = S.ctx.sampleRate, f = 440 * 2 ** ((midi - 69) / 12), N = Math.round(sr / f), largo = Math.floor(sr * 2.6);
    const buf = S.ctx.createBuffer(1, largo, sr), d = buf.getChannelData(0);
    let previo = 0;
    for (let i = 0; i < N; i++) { const r = Math.random() * 2 - 1; previo = d[i] = 0.55 * r + 0.45 * previo; } // púa blanda: ruido suavizado
    const freno = 0.9965 - (midi - 40) * 0.00008; // las agudas se apagan un poco antes
    for (let i = N; i < largo; i++) d[i] = freno * 0.5 * (d[i - N] + d[i - N + 1]);
    cache.set(midi, buf);
    return buf;
  }
  function pulsar(i, fuerza = 0.8) {
    const g = cuerdas[i];
    g.classList.remove('is-on'); void g.getBoundingClientRect(); g.classList.add('is-on');
    const traste = ACORDES[acorde][i];
    if (traste === null) return;
    S.iniciar();
    if (S.ctx.state !== 'running') return; // el navegador pide un clic antes de dejar sonar
    const t = S.ctx.currentTime;
    // una cuerda no puede sonar dos veces a la vez: la nota anterior se apaga
    if (sonando[i]) sonando[i].gain.setTargetAtTime(0, t, 0.015);
    const src = S.ctx.createBufferSource(), vol = S.ctx.createGain(), caja = S.ctx.createBiquadFilter();
    src.buffer = bufferDe(AL_AIRE[i] + traste);
    caja.type = 'peaking'; caja.frequency.value = 190; caja.Q.value = 0.9; caja.gain.value = 5; // resonancia de la caja
    vol.gain.value = 0.5 * fuerza;
    src.connect(caja).connect(vol).connect(S.salida);
    src.start(t);
    sonando[i] = vol;
  }
  const esperas = new Set();
  const luego = (fn, ms) => { const id = setTimeout(() => { esperas.delete(id); fn(); }, ms); esperas.add(id); };
  // hacia abajo pasa por las seis; hacia arriba, más suave y solo por las agudas
  function rasguear(abajo = true, fuerza = 0.75) {
    const orden = abajo ? [0, 1, 2, 3, 4, 5] : [5, 4, 3, 2];
    orden.forEach((i, k) => luego(() => pulsar(i, fuerza * (abajo ? 1 : 0.7)), k * (abajo ? 30 : 22)));
  }
  function mostrar(nombre) {
    acorde = nombre;
    ctl.querySelectorAll('[data-c]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.c === nombre));
    puntos.replaceChildren();
    ACORDES[nombre].forEach((t, i) => {
      cuerdas[i].classList.toggle('is-mute', t === null);
      if (!t) return;
      const y = (yTraste(t - 1) + yTraste(t)) / 2;
      const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      c.setAttribute('cx', xCuerda(i, y)); c.setAttribute('cy', y); c.setAttribute('r', 4.6);
      puntos.append(c);
    });
  }

  // ----- Mini canciones: la guitarra cambia de acorde y toca sola -----
  const bajo = (n) => ACORDES[n].findIndex((t) => t !== null);
  const CANCIONES = {
    // la vuelta de cuatro acordes de mil canciones, rasgueada: abajo, abajo-arriba, arriba-abajo-arriba
    cuatro: { paso: 210, vueltas: 2, acordes: ['Sol', 'Re', 'Mim', 'Do'], compas: (n) => [[0, () => rasguear(true, 0.85)], [2, () => rasguear(true, 0.6)], [3, () => rasguear(false)], [5, () => rasguear(false)], [6, () => rasguear(true, 0.65)], [7, () => rasguear(false)]], largo: 8, final: 'Sol' },
    // bajo y tres cuerdas agudas, de a una
    arpegio: { paso: 190, vueltas: 2, acordes: ['Mim', 'Do', 'Sol', 'Re'], compas: (n) => [bajo(n), 3, 4, 5, 4, 3].map((c, k) => [k, () => pulsar(c, k ? 0.6 : 0.9)]), largo: 6, final: 'Mim' },
    // bajo en 3-3-2 con rasgueos cortos, en Mi menor
    milonga: { paso: 170, vueltas: 2, acordes: ['Mim', 'Mim', 'Si7', 'Mim'], compas: (n) => [[0, () => pulsar(bajo(n), 0.95)], [2, () => rasguear(false)], [3, () => pulsar(bajo(n) + 1, 0.8)], [5, () => rasguear(false)], [6, () => pulsar(bajo(n) + 2, 0.8)], [7, () => rasguear(false, 0.6)]], largo: 8, final: 'Mim' },
  };
  let btnCancion = null;
  function parar() {
    esperas.forEach(clearTimeout); esperas.clear();
    if (btnCancion) { btnCancion.classList.remove('is-playing'); btnCancion = null; }
  }
  function tocar(btn) {
    parar();
    S.iniciar();
    const c = CANCIONES[btn.dataset.song];
    btnCancion = btn; btn.classList.add('is-playing');
    let t = 0;
    for (let v = 0; v < c.vueltas; v++) c.acordes.forEach((n) => {
      luego(() => mostrar(n), t);
      c.compas(n).forEach(([k, fn]) => luego(fn, t + 15 + k * c.paso));
      t += c.largo * c.paso;
    });
    luego(() => { mostrar(c.final); rasguear(true, 0.9); }, t);
    luego(parar, t + 1200);
  }
  ctl.querySelectorAll('[data-song]').forEach((b) => b.addEventListener('click', () => (b === btnCancion ? parar() : tocar(b))));
  ctl.querySelectorAll('[data-c]').forEach((b) => b.addEventListener('click', () => { parar(); mostrar(b.dataset.c); rasguear(); }));

  // Pasar por arriba de una cuerda (con el mouse o el dedo) la hace sonar
  const aSvg = (e) => new DOMPoint(e.clientX, e.clientY).matrixTransform(svg.getScreenCTM().inverse());
  let antes = null;
  svg.addEventListener('pointermove', (e) => {
    const p = aSvg(e);
    if (antes && p.y > CEJUELA && p.y < PUENTE) {
      for (let i = 0; i < 6; i++) {
        const x = xCuerda(i, p.y);
        if ((antes.x - x) * (p.x - x) < 0) pulsar(i, Math.min(1, 0.55 + Math.abs(p.x - antes.x) / 30));
      }
    }
    antes = p;
  });
  svg.addEventListener('pointerleave', () => { antes = null; });
  svg.addEventListener('pointerdown', (e) => {
    S.iniciar();
    const p = aSvg(e); antes = p;
    if (p.y <= CEJUELA || p.y >= PUENTE) return;
    // un toque suena la cuerda más cercana
    let mejor = 0;
    for (let i = 1; i < 6; i++) if (Math.abs(xCuerda(i, p.y) - p.x) < Math.abs(xCuerda(mejor, p.y) - p.x)) mejor = i;
    if (Math.abs(xCuerda(mejor, p.y) - p.x) < 9) pulsar(mejor);
  });
  mostrar('Mim');
})();
