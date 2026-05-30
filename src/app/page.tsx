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

    const cards = document.querySelectorAll<HTMLElement>('.glass-card');
    
    // Add subtle entrance animation
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 100 * index + 300); // 300ms initial delay
    });

    // Add mouse move parallax effect to background orbs
    const orbs = document.querySelectorAll<HTMLElement>('.orb');
    
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      
      orbs.forEach((orb, index) => {
        const speed = (index + 1) * -15; // Different speeds
        const xOffset = (window.innerWidth / 2 - x) / speed;
        const yOffset = (window.innerHeight / 2 - y) / speed;
        
        orb.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <>
      <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle theme">
        <span>{theme === "light" ? "🌙" : "☀️"}</span>
        <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
      </button>
      <div className="glass-container">
        <header className="hero">
          <h1>MCP Project Apps</h1>
          <p className="subtitle">Documentation for MCP's applications</p>
          <p className="description">
            Welcome to the central documentation hub for MCP's applications. Explore our system
            specifications, requirements, and architectural designs below.
          </p>
        </header>

        <main className="docs-grid">
          <Link href="/prd-hera" className="glass-card">
            <div className="card-icon">🗄️</div>
            <h2>HERA</h2>
            <p>Database terpusat menggunakan PostgreSQL dengan konsep multi-schema untuk berbagai aplikasi.</p>
          </Link>
          <a
            href="#"
            className="glass-card"
            style={{ opacity: 0.7, cursor: "not-allowed" }}
            onClick={(e) => e.preventDefault()}
          >
            <div className="card-icon">🏢</div>
            <h2>Creative-X</h2>
            <p>Aplikasi dengan multi-module untuk semua department. <i>(Coming soon)</i></p>
          </a>
          <Link href="/talos-wms" className="glass-card">
            <div className="card-icon">📦</div>
            <h2>Talos WMS</h2>
            <p>Aplikasi WMS yang digunakan untuk inventory management di dalam perusahaan.</p>
          </Link>
        </main>

        <footer>
          <p>&copy; 2026 MCP Project</p>
        </footer>
      </div>
      <div className="background-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>
    </>
  );
}
