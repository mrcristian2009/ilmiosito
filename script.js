const cursor = document.getElementById('cursor');
const cards = document.querySelectorAll('.card');

// Cursore
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Tilt 3D Card
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = (rect.height / 2 - y) / 15;
        const rotateY = (x - rect.width / 2) / 15;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// Reveal Animation
const reveal = () => {
    document.querySelectorAll(".reveal").forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 50) el.classList.add("active");
    });
};
window.addEventListener("scroll", reveal);
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(reveal, 100);
});