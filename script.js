// =========================================
// CONFIGURAZIONE PERFORMANCE E CURSORE CUSTOM
// =========================================
const cursor = document.getElementById('cursor');
const cards = document.querySelectorAll('.card');
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Se è un dispositivo touch (come il tuo Phone 2a), nascondiamo il pallino
if (isTouchDevice && cursor) {
    cursor.style.display = 'none';
}

// Logica Cursore Custom (Sostituisce quello di sistema)
if (!isTouchDevice && cursor) {
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    let isClicking = false;

    // Tracciamento posizione mouse
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.opacity = "1"; // Mostra il cursore solo al primo movimento
    });

    // Effetti al Click
    document.addEventListener('mousedown', () => isClicking = true);
    document.addEventListener('mouseup', () => isClicking = false);

    const updateCursor = () => {
        // LERP: crea l'effetto scivolamento (0.15 = fluido stile Apple)
        currentX += (mouseX - currentX) * 0.15;
        currentY += (mouseY - currentY) * 0.15;

        // Gestione Scale (si rimpicciolisce se clicchi)
        const scale = isClicking ? 0.8 : 1;
        
        // Applichiamo la trasformazione (centrando il pallino di 12px -> -6px)
        cursor.style.transform = `translate3d(${currentX - 6}px, ${currentY - 6}px, 0) scale(${scale})`;
        
        requestAnimationFrame(updateCursor);
    };
    updateCursor();

    // Feedback visivo quando passi sopra link o card
    const interactiveElements = document.querySelectorAll('a, button, .card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.backgroundColor = "var(--apple-blue)"; // Cambia colore
            cursor.style.width = "40px";
            cursor.style.height = "40px";
            cursor.style.margin = "-14px"; // Ricentra per la nuova dimensione
            cursor.style.mixBlendMode = "normal";
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.backgroundColor = "#fff";
            cursor.style.width = "12px";
            cursor.style.height = "12px";
            cursor.style.margin = "0";
            cursor.style.mixBlendMode = "difference";
        });
    });
}

// =========================================
// GESTIONE REVEAL (INTERSECTION OBSERVER)
// =========================================
// Molto più fluido del vecchio scroll event
const observerOptions = {
    threshold: 0.1, // Attiva quando il 10% dell'elemento è visibile
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target); // Ottimizzazione: smette di osservare dopo il reveal
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// =========================================
// SFONDO PLASMA (WEBGL OGL OTTIMIZZATO)
// =========================================
window.addEventListener('load', () => {
    if (!window.OGL) return;

    const { Renderer, Program, Mesh, Triangle } = window.OGL;

    const renderer = new Renderer({ 
        canvas: document.createElement('canvas'),
        alpha: true, 
        premultipliedAlpha: false,
        antialias: false,
        dpr: Math.min(window.devicePixelRatio, 1.2) // Ottimizzato per GPU mobile
    });

    const container = document.getElementById('plasma-bg');
    if (container) container.appendChild(renderer.gl.canvas);

    const gl = renderer.gl;

    function resize() {
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', resize, false);
    resize();

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
        vertex: `
            attribute vec2 position;
            varying vec2 vUv;
            void main() {
                vUv = position * 0.5 + 0.5;
                gl_Position = vec4(position, 0.0, 1.0);
            }
        `,
        fragment: `
            precision highp float;
            uniform float uTime;
            varying vec2 vUv;
            void main() {
                vec2 p = vUv * 2.0 - 1.0;
                float time = uTime * 0.15;
                float color = sin(p.x * 3.5 + time) * 0.5 + cos(p.y * 2.5 - time) * 0.5;
                color += sin(p.x * p.y + time * 0.5);
                gl_FragColor = vec4(vec3(0.08, 0.08, 0.12) + (color * 0.04), 0.25); 
            }
        `,
        uniforms: { uTime: { value: 0 } }
    });

    const mesh = new Mesh(gl, { geometry, program });

    function update(time) {
        requestAnimationFrame(update);
        program.uniforms.uTime.value = time * 0.001;
        renderer.render({ scene: mesh });
    }
    requestAnimationFrame(update);
});

// =========================================
// TILT CARD (ACCELERAZIONE GPU)
// =========================================
if (!isTouchDevice) {
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calcolo rotazione (valori bassi = più eleganza)
            const rotateX = (rect.height / 2 - y) / 30;
            const rotateY = (x - rect.width / 2) / 30;
            
            // Usiamo scale3d per attivare la GPU
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });
}

// =========================================
// COPYRIGHT DINAMICO
// =========================================
const copyrightElement = document.querySelector('footer p, .copyright');
if (copyrightElement) {
    const currentYear = new Date().getFullYear();
    copyrightElement.innerHTML = `© ${currentYear} Robert-Cristian Mocanu`;
}
