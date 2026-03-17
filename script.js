// =========================================
// CONFIGURAZIONE PERFORMANCE E CURSORE
// =========================================
const cursor = document.getElementById('cursor');
const cards = document.querySelectorAll('.card');
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (isTouchDevice && cursor) cursor.style.display = 'none';

// Ottimizzazione Cursore (throttling per risparmiare CPU)
if (!isTouchDevice && cursor) {
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const updateCursor = () => {
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
        requestAnimationFrame(updateCursor);
    };
    updateCursor();
}

// =========================================
// GESTIONE REVEAL (OTTIMIZZATA)
// =========================================
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        const revealPoint = 150;
        if (revealTop < windowHeight - revealPoint) {
            el.classList.add('active');
        }
    });
}
window.addEventListener('scroll', reveal);

// =========================================
// SFONDO PLASMA (WEBGL OTTIMIZZATO)
// =========================================
window.addEventListener('load', () => {
    if (!window.OGL) return;

    const { Renderer, Program, Mesh, Triangle } = window.OGL;

    const renderer = new Renderer({ 
        canvas: document.createElement('canvas'),
        alpha: true, 
        premultipliedAlpha: false,
        antialias: false, // Disabilitato per guadagnare performance
        dpr: Math.min(window.devicePixelRatio, 1.5) // LIMITA IL CARICO SULLA GPU
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
                float time = uTime * 0.2; // Rallentato per effetto più elegante
                float color = sin(p.x * 10.0 + time) + cos(p.y * 8.0 + time);
                gl_FragColor = vec4(vec3(color * 0.05), 0.3); // Colore molto soft per non distrarre
            }
        `,
        uniforms: {
            uTime: { value: 0 }
        }
    });

    const mesh = new Mesh(gl, { geometry, program });

    // Loop di rendering a basso impatto
    function update(time) {
        requestAnimationFrame(update);
        program.uniforms.uTime.value = time * 0.001;
        renderer.render({ scene: mesh });
    }
    requestAnimationFrame(update);
    
    // Esegui reveal iniziale
    reveal();
});

// Tilt delle card (solo se non è mobile)
if (!isTouchDevice) {
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateX = (rect.height / 2 - y) / 20;
            const rotateY = (x - rect.width / 2) / 20;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    });
}