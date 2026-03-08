// 1. EFFETTO REVEAL (FADE-IN ALLO SCROLL)
function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 100; // Trigger dell'animazione
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}
window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal); // Controlla all'avvio

// 2. LOGICA TERMOMETRO (Se presente nella pagina)
const slider = document.getElementById('temp-slider');
if (slider) {
    const liquid = document.getElementById('temp-liquid');
    const display = document.getElementById('temp-value');
    
    slider.addEventListener('input', (e) => {
        const val = e.target.value;
        display.innerText = val;
        const percent = ((val - (-10)) / 60) * 100;
        liquid.style.height = percent + "%";
    });
}

// 3. NAVBAR INDICATOR (GOCCIA)
const links = document.querySelectorAll('.navbar a');
const indicator = document.querySelector('.nav-indicator');

links.forEach(link => {
    link.addEventListener('mouseenter', (e) => {
        const rect = e.target.getBoundingClientRect();
        const navRect = e.target.parentElement.getBoundingClientRect();
        indicator.style.width = `${rect.width}px`;
        indicator.style.left = `${rect.left - navRect.left}px`;
        indicator.style.opacity = '1';
    });
});

document.querySelector('.navbar').addEventListener('mouseleave', () => {
    indicator.style.opacity = '0';
});