const cursor = document.getElementById('cursor');
const cards = document.querySelectorAll('.card');

// --- UPDATE MOBILE: Rileva se è un dispositivo touch (Telefono/Tablet) ---
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (isTouchDevice && cursor) {
    cursor.style.display = 'none'; // Nasconde il cursore personalizzato su mobile
}
// -------------------------------------------------------------------------

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
// L'effetto si attiva solo sulla card specifica sotto il mouse
if (!isTouchDevice) {
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            
            // Calcola la posizione del mouse relativa alla card
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;
            
            // Centro della card
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calcola l'inclinazione (più naturale)
            const rotateX = (centerY - y) / 15;
            const rotateY = (x - centerX) / 15;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        // Reset della card quando il mouse esce
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
        if (elementTop < windowHeight - 100) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", reveal);
reveal();