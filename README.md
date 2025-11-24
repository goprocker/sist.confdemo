# Sathyabama Conference 2025 - Interactive Event Website

A premium, high-performance conference website built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**. This project features a modern dark aesthetic, smooth scroll animations, and a fully responsive design tailored for a seamless user experience.

## 🚀 Tech Stack

*   **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/)
*   **Smooth Scrolling:** [Lenis](https://lenis.studiofreight.com/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Language:** TypeScript

## ✨ Key Features

*   **Premium Dark UI:** Sleek, modern design with deep gradients, glassmorphism effects, and a consistent dark theme.
*   **University Branding:** Custom Hero section featuring the Sathyabama Institute campus with a sophisticated dark overlay and animated elements.
*   **Advanced Animations:**
    *   **Text Reveal:** Premium line-by-line text reveal animations for headings.
    *   **Scale In:** Sophisticated image reveal effects.
    *   **Smooth Scroll:** Integrated Lenis for buttery smooth scrolling experiences.
    *   **Scroll-Triggered Entry:** Elements fade and slide in as you scroll down.
*   **Interactive Components:**
    *   **Timeline:** Vertical schedule with alternating layout and mobile adaptations.
    *   **Tabs:** Filterable tracks section.
    *   **Accordions:** FAQ section with smooth expand/collapse.
    *   **Carousels:** Testimonials and Speaker sliders.
*   **Responsive Navigation:**
    *   Sticky glassmorphic header.
    *   Mobile-first slide-in menu with nested accordion submenus.
    *   Active state highlighting and hover effects.

## 📂 Project Structure

```bash
├── app/                  # Next.js App Router pages
│   ├── page.tsx          # Main Landing Page (Hero + Sections)
│   ├── about/            # About Page
│   ├── tracks/           # Tracks Page
│   ├── speakers/         # Speakers Page
│   ├── schedule/         # Schedule Page
│   ├── venue/            # Venue Page
│   ├── registration/     # Registration Page
│   └── layout.tsx        # Root Layout (Fonts, SmoothScroll)
├── components/
│   ├── animations/       # Reusable animation wrappers (FadeIn, TextReveal, ScaleIn)
│   ├── layout/           # Global layout components (Navbar, Footer)
│   └── sections/         # Page-specific sections (Hero, AboutConference, etc.)
├── data/                 # JSON files for dynamic content (speakers.json, tracks.json)
├── public/               # Static assets (images, icons)
└── tailwind.config.ts    # Tailwind configuration
```

## 🛠️ Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd demowebsite
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

4.  **Build for production:**
    ```bash
    npm run build
    npm start
    ```

## 🎨 Customization

### Content
Most content is managed via JSON files in the `data/` folder or directly within the component files in `components/sections/`.
*   **Speakers:** Edit `data/speakers.json`
*   **Tracks:** Edit `data/tracks.json`
*   **Schedule:** Edit `components/sections/TimelineSection.tsx` or `Schedule.tsx`

### Images & Backgrounds
*   **Hero Background:** The main background image is located at `public/sathyabama_image.jpg`. To change it, simply replace this file with your own image (keeping the same name).
*   **Overlay Opacity:** To adjust the darkness of the background overlay (currently set to allow 75% image visibility), edit `components/sections/Hero.tsx`:
    ```tsx
    // Adjust opacity-75 to your preferred value (0-100)
    <Image className="object-cover opacity-75" ... />
    
    // Adjust gradient opacity (from-gray-950/30)
    <div className="absolute inset-0 bg-gradient-to-b from-gray-950/30 ..." />
    ```

### Colors & Fonts
*   **Colors:** Defined in `tailwind.config.ts`. The primary theme uses `gray-950` for backgrounds and `blue-500`/`purple-500` for accents.
*   **Fonts:** Configured in `app/layout.tsx` using `next/font/google` (Inter).

## 📱 Mobile Optimization

The site is fully optimized for mobile devices:
*   **Navigation:** The navbar transforms into a hamburger menu with a slide-out drawer.
*   **Typography:** Font sizes automatically adjust (e.g., Hero text scales down) to fit smaller screens.
*   **Layouts:** Grids stack vertically (e.g., Schedule, Tracks) for better readability.

## 🚀 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
