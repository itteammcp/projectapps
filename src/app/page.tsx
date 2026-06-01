"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    // Initialize theme
    const savedTheme = localStorage.getItem('theme') as "light" | "dark" | null;
    const initialTheme = savedTheme || "dark";
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <main className="landing-wrapper">
      <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle theme">
        <span>{theme === "light" ? "🌙" : "☀️"}</span>
        <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
      </button>

      <header className="hero-floating">
        {/* <h1>MCP Project Apps</h1> */}
        <p className="subtitle">Documentation for MCP's applications</p>
      </header>

      <div className="solar-system">
        {/* Orbit 2: Talos WMS (outer) */}
        <div className="orbit orbit-talos">
          <div className="planet-container">
            <Link href="/talos-wms" className="planet talos glass-card-system">
              {/* <div className="card-icon">📦</div> */}
              <h2>Talos</h2>
              <p>Warehouse Management System</p>
            </Link>
          </div>
        </div>

        {/* Orbit 1: Creative-X (inner) */}
        <div className="orbit orbit-creative-x">
          <div className="planet-container">
            <a href="#" className="planet creative-x glass-card-system" onClick={(e) => e.preventDefault()}>
              {/* <div className="card-icon">🏢</div> */}
              <h2>Creative-X</h2>
              <p>Super Apps</p>
            </a>
          </div>
        </div>

        {/* Sun: HERA */}
        <Link href="/prd-hera" className="sun-hera glass-card-system">
          {/* <div className="card-icon" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🗄️</div> */}
          <h2>HERA</h2>
          <p>Integrated Database</p>
        </Link>
      </div>

      <div className="background-stars"></div>

      <div className="background-orbs" style={{ opacity: 0.3 }}>
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      {/* <footer className="footer-floating">
        <p>&copy; 2026 MCP Project</p>
      </footer> */}
    </main>
  );
}
