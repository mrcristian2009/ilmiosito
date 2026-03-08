const cursor = document.getElementById('cursor');
const cards = document.querySelectorAll('.card');

// CURSORE
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// EFFETTO TILT 3D
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
        cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// ANIMAZIONI AL CARICAMENTO E SCROLL
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');
const reveal = () => {
    document.querySelectorAll(".reveal").forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 50) el.classList.add("active");
    });
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > 100) navbar.classList.add('nav-hidden');
    else navbar.classList.remove('nav-hidden');
    lastScrollTop = scrollTop;
};
window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);

// THERMAL LAB
const slider = document.getElementById('temp-slider');
if (slider) {
    slider.addEventListener('input', (e) => {
        const val = e.target.value;
        document.getElementById('temp-value').innerText = val;
        document.getElementById('temp-liquid').style.height = ((val - (-10)) / 70) * 100 + "%";
    });
}

// INDICATORE NAVBAR
const links = document.querySelectorAll('.navbar a');
const indicator = document.querySelector('.nav-indicator');
links.forEach(link => {
    link.addEventListener('mouseenter', (e) => {
        indicator.style.width = `${e.target.offsetWidth}px`;
        indicator.style.left = `${e.target.offsetLeft}px`;
        indicator.style.opacity = '1';
    });
});
document.querySelector('.navbar').addEventListener('mouseleave', () => indicator.style.opacity = '0');