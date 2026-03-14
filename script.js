const cursor = document.getElementById('cursor');
const cards = document.querySelectorAll('.card');

// --- UPDATE MOBILE: Rileva se è un dispositivo touch (Telefono/Tablet) ---
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (isTouchDevice && cursor) {
    cursor.style.display = 'none'; // Nasconde il cursore personalizzato su mobile
}

// 1. MOVIMENTO CURSORE PALLINO (Solo su PC)
if (!isTouchDevice) {
    document.addEventListener('mousemove', (e) => {
        if (cursor) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        }
    });
}

// 2. MOVIMENTO TILT 3D CARD (INDIVIDUALE)
if (!isTouchDevice) {
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (centerY - y) / 15;
            const rotateY = (x - centerX) / 15;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    });
}

// 3. ANIMAZIONE REVEAL (Comparsa allo scroll)
function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", reveal);

// =========================================
// AGGIUNTA: LOGICA SFONDO PLASMA
// =========================================
const initPlasma = () => {
    const container = document.getElementById('plasma-bg');
    if (!container || !window.OGL) return;

    const { Renderer, Program, Mesh, Triangle } = window.OGL;

    const vertex = `#version 300 es
    precision highp float;
    in vec2 position;
    in vec2 uv;
    out vec2 vUv;
    void main() { vUv = uv; gl_Position = vec4(position, 0.0, 1.0); }`;

    const fragment = `#version 300 es
    precision highp float;
    uniform vec2 iResolution;
    uniform float iTime;
    uniform vec3 uCustomColor;
    uniform float uUseCustomColor;
    uniform float uSpeed;
    uniform float uDirection;
    uniform float uScale;
    uniform float uOpacity;
    uniform vec2 uMouse;
    uniform float uMouseInteractive;
    out vec4 fragColor;

    void mainImage(out vec4 o, vec2 C) {
      vec2 center = iResolution.xy * 0.5;
      C = (C - center) / uScale + center;
      vec2 mouseOffset = (uMouse - center) * 0.0002;
      C += mouseOffset * length(C - center) * step(0.5, uMouseInteractive);
      float i, d, z, T = iTime * uSpeed * uDirection;
      vec3 O, p, S;
      for (vec2 r = iResolution.xy, Q; ++i < 60.; O += o.w/d*o.xyz) {
        p = z*normalize(vec3(C-.5*r,r.y)); 
        p.z -= 4.; 
        S = p;
        d = p.y-T;
        p.x += .4*(1.+p.y)*sin(d + p.x*0.1)*cos(.34*d + p.x*0.05); 
        Q = p.xz *= mat2(cos(p.y+vec4(0,11,33,0)-T)); 
        z+= d = abs(sqrt(length(Q*Q)) - .25*(5.+S.y))/3.+8e-4; 
        o = 1.+sin(S.y+p.z*.5+S.z-length(S-p)+vec4(2,1,0,8));
      }
      o.xyz = tanh(O/1e4);
    }

    bool finite1(float x){ return !(isnan(x) || isinf(x)); }
    vec3 sanitize(vec3 c){
      return vec3(finite1(c.r)?c.r:0., finite1(c.g)?c.g:0., finite1(c.b)?c.b:0.);
    }

    void main() {
      vec4 o = vec4(0.);
      mainImage(o, gl_FragCoord.xy);
      vec3 rgb = sanitize(o.rgb);
      float intensity = (rgb.r + rgb.g + rgb.b) / 3.0;
      vec3 customColor = intensity * uCustomColor;
      vec3 finalColor = mix(rgb, customColor, step(0.5, uUseCustomColor));
      fragColor = vec4(finalColor, length(rgb) * uOpacity);
    }`;

    const renderer = new Renderer({ webgl: 2, alpha: true, antialias: false });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);

    const program = new Program(gl, {
        vertex, fragment,
        uniforms: {
            iTime: { value: 0 },
            iResolution: { value: new Float32Array([1, 1]) },
            uCustomColor: { value: new Float32Array([177/255, 158/255, 239/255]) },
            uUseCustomColor: { value: 1.0 },
            uSpeed: { value: 0.24 },
            uDirection: { value: 1.0 },
            uScale: { value: 1.1 },
            uOpacity: { value: 0.8 },
            uMouse: { value: new Float32Array([0, 0]) },
            uMouseInteractive: { value: 1.0 }
        }
    });

    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    window.addEventListener('mousemove', e => {
        program.uniforms.uMouse.value[0] = e.clientX;
        program.uniforms.uMouse.value[1] = window.innerHeight - e.clientY;
    });

    const setSize = () => {
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        program.uniforms.iResolution.value[0] = gl.drawingBufferWidth;
        program.uniforms.iResolution.value[1] = gl.drawingBufferHeight;
    };
    window.addEventListener('resize', setSize);
    setSize();

    const loop = t => {
        program.uniforms.iTime.value = t * 0.001;
        renderer.render({ scene: mesh });
        requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
};

window.onload = () => { 
    reveal(); 
    initPlasma(); 
};