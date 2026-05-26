
# 🎧 Sonar - Podcast Platform

Sonar is a modern, responsive podcast web application built with React, TypeScript, and Vite. It allows users to search for their favorite podcasts, explore episodes, adjust playback settings, and manage audio seamlessly across different devices.

🚀 **Live Demo:** [sonnar.netlify.app](https://sonnar.netlify.app)

---

## ✨ Features

- **Podcast Search & Discovery:** Integrated with Apple iTunes API to browse and search for top podcasts.
- **Dynamic Routing & Pages:** Structured multi-page application handling separate views for search, podcasts, and discovery.
- **Advanced Audio Player:** Dynamic layout controller with support for playback speed adjustment, volume controls, responsive mobile views, and global player layout.
- **Custom React Hooks:** Dedicated custom hooks for decoupled logic, keeping the components clean and reusable.
- **Serverless CORS Proxy:** Uses Netlify Functions backend proxy to bypass client-side CORS issues securely when fetching external RSS feeds.
- **Modern UI/UX:** A clean, grid-based interface built using Tailwind CSS and components powered by Shadcn UI.
- **Global State Management:** High-performance, lightweight audio and episode state handling using Zustand stores.

---

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Styling & UI:** Tailwind CSS, Shadcn UI
- **State Management:** Zustand
- **Deployment & Serverless:** Netlify (Netlify Functions)

---

## 📁 Project Structure

```text
├── netlify/
│   └── functions/
│       └── rss.js          # Serverless function to proxy external RSS feeds (bypasses CORS)
├── src/
│   ├── assets/           # Media files and global assets
│   ├── components/       # Reusable UI components (Shadcn & custom elements)
│   ├── hooks/            # Custom React hooks for global logic
│   ├── layouts/          # Main application layouts (including the player container)
│   ├── lib/              # Core utility functions and Shadcn configuration
│   ├── pages/            # View components (Home, Search, Podcast Details)
│   ├── stores/           # Zustand stores for global audio player state
│   ├── App.css           # Custom styles for the core layout
│   ├── App.tsx           # Application entry layout
│   ├── index.css         # Global Tailwind directives
│   └── main.tsx          # DOM initialization
├── netlify.toml          # Netlify configuration file
├── tailwind.config.ts    # Tailwind CSS styling configuration
└── vite.config.ts        # Vite environment configurations
````

## 🚀 Getting Started

Follow these steps to set up the project locally:

### 1. Clone the Repository

Bash

```
git clone [https://github.com/TherealZoux/Sonar.git](https://github.com/TherealZoux/Sonar.git)
cd Sonar
```

### 2. Install Dependencies

Bash

```
npm install
```

### 4. Run the Development Server

To run both the Vite frontend and Netlify serverless functions simultaneously:

Bash

```
npm run dev
```

_(Alternatively, run `npm run dev` for frontend development only)._

## 🌐 How CORS Bypass Works

Since standard browsers block client-side fetch requests to external RSS feeds due to Same-Origin policy (CORS), Sonar utilizes a Serverless Proxy architecture:

1. The frontend dispatches a request to the Netlify endpoint (`/api/rss`).
    
2. The serverless function `netlify/functions/rss.js` fetches the raw XML feed on the server-side, bypassing browser constraints.
    
3. The serverless backend returns the data safely back to the user interface.
