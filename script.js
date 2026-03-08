document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.navbar');
    const indicator = document.querySelector('.nav-indicator');
    const links = document.querySelectorAll('.navbar a');

    // Funzione per spostare la goccia
    function moveIndicator(target) {
        const linkRect = target.getBoundingClientRect();
        const navRect = nav.getBoundingClientRect();

        // Calcoliamo la posizione orizzontale relativa alla barra
        const leftPos = linkRect.left - navRect.left;

        // Applichiamo larghezza e posizione alla goccia
        indicator.style.opacity = '1';
        indicator.style.width = `${linkRect.width}px`;
        indicator.style.left = `${leftPos}px`;
    }

    // Gestione del movimento quando il mouse entra in un link
    links.forEach(link => {
        link.addEventListener('mouseenter', (e) => {
            moveIndicator(e.target);
        });
    });

    // La goccia scompare quando il mouse esce completamente dalla Navbar
    nav.addEventListener('mouseleave', () => {
        indicator.style.opacity = '0';
    });

    // Opzionale: Se vuoi che la goccia si posizioni automaticamente 
    // sulla pagina corrente all'avvio:
    const activeLink = Array.from(links).find(link => 
        window.location.href.includes(link.getAttribute('href'))
    );
    
    if (activeLink) {
        // Un piccolo ritardo per permettere al CSS di caricare le dimensioni
        setTimeout(() => moveIndicator(activeLink), 100);
    }
});