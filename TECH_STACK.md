# "Neural Cosmos" Portfolio Tech Stack

This document details the exact foundational technologies, rendering libraries, and design frameworks utilized to build this immersive 3D personal portfolio. 

---

## 🚀 Core Framework
### Next.js (`v16.2.1`)
- **Usage:** Core application framework powering the entire routing and server-side rendering (SSR) infrastructure. 
- **Features Harnessed:** Utilizes the new App Router (`/src/app`) architecture for optimized partial hydration, dynamic metadata injection, and rapid compilation.

### React / React DOM (`v19.2.4`)
- **Usage:** Provides the UI rendering engine and core component state management architectures. 
- **Features Harnessed:** Intensive utilization of React hooks (`useRef`, `useState`, `useEffect`) specifically for mapping hardware-accelerated animations (like the custom `SplashScreen` and cursor trail physics) directly to the DOM without triggering thread-blocking re-renders.

---

## 🎨 Styling & Typography
### TailwindCSS (`v4.0.0`)
- **Usage:** Serves as the primary atomic CSS utility engine.
- **Features Harnessed:** Eliminates standard CSS files (except the base `globals.css`). Used heavily for responsive design break-pointing (`md:`, `lg:`), glassmorphism effects (`backdrop-blur-md`, `bg-white/5`), and arbitrary dynamic shadow calculations.
- **Dependency Integration:** Paired seamlessly with `tailwind-merge` (`v3.5.0`) and `clsx` (`v2.1.1`) to conditionally merge utility classes during runtime.

### Next/Font ecosystem
- **Usage:** Injects custom typography directly into the bundle without cumulative layout shift (CLS).
- **Fonts utilized:** 
  - *Orbitron* (Headers / Sci-Fi emphasis)
  - *Syne* (Primary headers & Subtitles)
  - *JetBrains Mono* (Tech text, descriptions, & Terminal outputs)
  - *Rajdhani* (Tech metrics)

---

## 🌌 3D & Graphics Rendering Layer
### Three.js (`v0.183.2`)
- **Usage:** The core WebGL engine mapping real 3D geometry onto the browser canvas.

### React Three Fiber (`@react-three/fiber` `v9.5.0`)
- **Usage:** The React reconciler for Three.js. 
- **Features Harnessed:** Wraps low-level Three.js imperatives into declarative React components. Powers the core `<Scene />` and the `Canvas` elements globally, translating JSX into WebGL scenes.

### React Three Drei (`@react-three/drei` `v10.7.7`)
- **Usage:** The utility ecosystem for React Three Fiber.
- **Features Harnessed:** Imports the `OrbitControls` for smooth panning/zooming around the hero model, and `Sphere` primitives to easily generate the holographic avatar mesh.

### Canvas Confetti (`v1.9.4` & `@types/canvas-confetti v1.9.0`)
- **Usage:** Renders interactive particle burst systems directly on the 2D canvas dynamically, creating the celebration effect when clicking specific UI elements.

---

## 🕹️ Animation & Physics
### Framer Motion (`v12.38.0`)
- **Usage:** The dominant structural animation orchestrator behind 90% of the movement on the page.
- **Features Harnessed:**
  - `AnimatePresence`: For smoothly mounting & unmounting the cinematic `SplashScreen`.
  - `motion.div`: High-performance deterministic key-framing mapping directly to CSS `transform` styles (e.g., The rocket launch sequence, the "Server Blade" hovers for achievements).
  - Spring Physics: Drives layout snap physics, hover interactions, and seamless glitch tracking without manual CSS transitions.

### React Lenis (`v1.3.19`)
- **Usage:** Modern native-like smooth scrolling provider.
- **Features Harnessed:** Wraps the entire `<body/>` element directly in Next's `layout.tsx` to hijack native browser scrolling and interpolate it dynamically (`lerp: 0.1`). Provides "buttery smooth" transitions that make traversing across large 3D DOM sections feel weightless.

### GSAP (`v3.14.2`)
- **Usage:** GreenSock Animation Platform.
- **Features Harnessed:** Historically utilized for deep scroll-trigger integrations when highly complex overlapping pin animations are required where Framer Motion proves computationally expensive.

### Lucide React (`v0.577.0`)
- **Usage:** Comprehensive SVG icon library.
- **Features Harnessed:** Provides the `Rocket`, `Github`, `Linkedin`, `Brain`, `Code`, and specific UI markers instantly without heavy asset bundles. (Note: Custom SVGs were implemented directly for specific overrides like the "X" logo and Astronaut visor).
