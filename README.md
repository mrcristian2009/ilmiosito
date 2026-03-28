# 🏎️ Robert-Cristian Mocanu | Personal Portfolio 2026

![Lighthouse Score](https://img.shields.io/badge/Lighthouse-100%2F100-brightgreen?style=for-the-badge)
![Tech](https://img.shields.io/badge/Tech-WebGL%20%7C%20OGL%20%7C%20JS-black?style=for-the-badge)

Un portfolio ad alte prestazioni ispirato al design minimale di **Apple** e **Nothing**, focalizzato su automazione, efficienza del codice e un'esperienza utente fluida.

> **Status:** Live & Optimized at [mrcristian.vercel.app](https://mrcristian.vercel.app)

---

## 🛠️ Tech Stack & Performance

Il progetto è stato costruito con l'obiettivo di raggiungere il **Perfect Score** su Google Lighthouse, bilanciando effetti visivi avanzati e tempi di caricamento istantanei.

* **Core:** HTML5 Semantico, CSS3 (Bento Grid Layout).
* **Graphics:** [OGL](https://github.com/o-gl/ogl) (WebGL Library) per lo sfondo Plasma a basso impatto sulla GPU.
* **Interactions:** Custom JS con interpolazione lineare (**LERP**) per il cursore e **Intersection Observer API** per i reveal delle card.
* **Hosting:** Vercel con ottimizzazione automatica degli asset.

### ⚡ Performance Highlights
* **Lighthouse Score:** 100/100 (Desktop) | 99/100 (Mobile).
* **FCP (First Contentful Paint):** < 0.8s.
* **Zero Dependencies:** Nessuna libreria pesante (No jQuery, No Three.js).
* **GPU Accelerated:** Utilizzo di `translate3d` e `scale3d` per evitare il re-layout della CPU.

---

## 💎 Design Philosophy

### "Efficienza Invisibile"
Il design segue le linee guida del **Minimalismo Moderno**:
- **Bento Grid:** Organizzazione modulare dei contenuti per una leggibilità immediata.
- **Custom Cursor:** Sostituzione integrale del cursore di sistema con un puntatore fluido `mix-blend-mode: difference`.
- **True Black Mode:** Ottimizzato per display OLED (#000000).
- **Branding:** Accenti in Rosso Corsa e Blu Apple per guidare l'occhio sulle Call to Action.

---

## 📂 Struttura del Progetto

```text
├── index.html          # Home: The Entry Point
├── about.html          # Identity: Mission & Vision
├── projects.html       # Showcase: Automation & Web Tools
├── credentials.html    # Archive: Certificazioni Ministeriali
├── contact.html        # Business: Form & Networking
├── style.css           # Custom Design System
└── script.js           # WebGL Engine & Interactions
🚀 Future Roadmap
[ ] Integrazione Pagina "Setup" (Gear & Hardware).

[ ] Dark/Light mode dinamico basato sull'orario.

[ ] Backend in Python per automazione invio mail dal form contatti.

👨‍💻 Author
Robert-Cristian Mocanu

Instagram: @mcncrst

LinkedIn: Robert-Cristian Mocanu

GitHub: @mrcristian2009

<p align="center">
Creato con ossessione per il dettaglio. © 2026
</p>
