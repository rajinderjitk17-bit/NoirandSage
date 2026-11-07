# NOIR & SAGE — Where Fire Meets Finesse
### Contemporary Dining Experience · Single-Page Web Showcase
**Crafted & Designed by:** Rajinderjit Kaur

---

## 1. Project Overview
**NOIR & SAGE** is a premier, contemporary restaurant website created as a showcase project. Designed from an editorial and luxury UI/UX perspective, it embodies the intimate atmosphere of modern open-flame dining, seasonal gastronomy, and botanical minimalism.

The website avoids AI cliches, generic templates, Bootstrap patterns, and excessive flashy animations. Every layout choice, typographic hierarchy, and micro-interaction was deliberately created to reflect the standards of a high-end design agency.

---

## 2. Tech Stack & Zero-Framework Constraint
To demonstrate pure mastery of foundational web technologies, this project uses **strictly vanilla technologies**:

* **HTML5**: Semantic, accessible structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<figure>`, `<footer>`, `<dialog>` patterns, ARIA attributes).
* **CSS3**: Modern CSS custom properties (variables), fluid typography with `clamp()`, CSS Grid (masonry layout), Flexbox, backdrop-filter blur effects, and custom cubic-bezier transitions.
* **Vanilla JavaScript (ES6+)**: Custom reactive engine without any runtime libraries (no React, Vue, jQuery, Bootstrap, or Tailwind).
* **Typography & Icons**: Cormorant Garamond & Plus Jakarta Sans via Google Fonts, Font Awesome CDN for icons, and an inline SVG monogram favicon.
* **Photography**: High-resolution, curated culinary and atmospheric imagery sourced directly from Unsplash.

---

## 3. Design System & Brand Identity

### Palette
| Color | Hex / Value | Purpose |
| :--- | :--- | :--- |
| **Primary Canvas** | `#0a0a0c` | Deep charcoal / near-black background |
| **Secondary Surface** | `#121215` | Elevated editorial sections |
| **Card / Highlight** | `#18181c` | Inputs, interactive elements, card surfaces |
| **Warm Ivory** | `#f5f2eb` | Primary headings and prominent text |
| **Muted Cream** | `#b5b0a4` | Secondary text and descriptive copy |
| **Muted Gold** | `#c5a880` | Accent badges, borders, key interactive highlights |
| **Ember Orange** | `#d46539` | Subtle open-flame ambient touch |

### Typography Hierarchy
* **Editorial Serif Headings**: *Cormorant Garamond* (Weights: 300, 400, 500, Italic)
* **UI & Body Typography**: *Plus Jakarta Sans* (Weights: 300, 400, 500, 600, 700)
* **Fluid Scaling**: Dynamic sizing utilizing CSS `clamp()` ensuring seamless fluidity from ultra-wide screens down to compact mobile displays.

---

## 4. Key Sections & Interactive Features

1. **Header & Navigation Bar**:
   - Transparent sticky header that smoothly gains blur and a subtle bottom border upon scrolling.
   - Live scroll-spy highlighting active navigation links.
   - Mobile animated drawer with toggle button and backdrop dismissal.

2. **Cinematic Hero**:
   - Full-bleed ambient photography with radial dark vignette.
   - Refined eyebrow badge: `EST. 2018 · CONTEMPORARY DINING`.
   - Large editorial title: *"WHERE FIRE MEETS FINESSE."*
   - Scroll indicator with micro bounce animation.

3. **Philosophy Story & Dynamic Craft Counters**:
   - Asymmetrical two-column editorial layout with open-flame badge.
   - IntersectionObserver triggers a smooth counter animation for stats:
     - `08+` Years of Craft
     - `42` Seasonal Dishes
     - `01` Unforgettable Table

4. **Interactive Signature Menu**:
   - Dynamic tab switching between categories (*Starters*, *From the Fire*, *Mains*, *Desserts*, *Drinks*).
   - Dotted line leaders connecting dish titles to Indian Rupee (₹) pricing.
   - Dietary badges (`V`, `GF`, `Signature`, `Chef's Pick`).

5. **Featured Dish Parallax**:
   - Spotlighting *Ember-Roasted Heritage Vegetables* (₹695).
   - Subtle scroll-linked parallax depth.

6. **Dining Experiences**:
   - Three curated atmospheres: *The Dining Room*, *Chef's Counter*, and *Private Dining*.
   - Image zoom, dark gradient reveal, and direct reservation links.

7. **8-Image Curated Gallery & Fullscreen Lightbox**:
   - Masonry layout showcasing plates, kitchen craft, wine cellar, and table settings.
   - Fullscreen vanilla JS Lightbox modal featuring:
     - Previous / Next buttons
     - Image counter (`01 / 08`)
     - Keyboard controls (`←`, `→`, `Escape`)
     - Mobile touch-swipe gestures (`swipe left`, `swipe right`)
     - Background lock and backdrop dismissal.

8. **Chef Profile (Arjun Mehra)**:
   - Profile of Executive Chef Arjun Mehra.
   - Accented frame layout and philosophy quote: *"Cook with instinct. Finish with intention."*

9. **Testimonials Slider**:
   - Editorial quotes from critics and culture writers (Rhea Kapoor, Vikram Sethi, Elena Rostova).
   - Auto-advancing rotation, dot controls, arrow triggers, pause on hover, and touch swipe.

10. **Reservation Engine**:
    - Form fields: Full Name, Email, Phone, Guests (1–8+), Date, Seating Time, Dining Atmosphere, and Special Requests.
    - Client-side validation with inline error messaging.
    - Confirmation state displaying:
      > *"Your reservation request has been received. We look forward to welcoming you."*
      along with a personalized summary of the booking.

11. **Location & Architectural Map**:
    - Complete address (42 Heritage Avenue, New Delhi, India), opening hours, and direct concierge contacts.
    - Custom stylized vector map graphic with an ambient location pulse.

12. **Footer & Attribution**:
    - Brand manifesto, navigation, social links, legal notices.
    - Custom credit: **"Crafted & Designed by Rajinderjit Kaur"**.

---

## 5. Responsive Design Breakpoints
Tested and optimized for:
* **Desktop & Ultra-wide**: 1440px+ and 1200px
* **Laptops & Tablets Landscape**: 1024px
* **Tablets Portrait**: 768px
* **Mobile Devices**: 480px and 375px

---

## 6. How to Run Locally

You can open the project directly in any modern browser without any build tools or dependencies:

1. Double click `index.html` to open in your browser (Google Chrome, Microsoft Edge, Safari, Firefox).
2. Alternatively, run a lightweight local server if desired:
   ```bash
   # Python 3
   python -m http.server 3000

   # Node.js (npx)
   npx serve .
   ```
3. Open `http://localhost:3000` in your web browser.

---
*© 2026 Noir & Sage. Designed & Developed by Rajinderjit Kaur.*

