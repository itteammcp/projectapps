"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function TalosWMSPortal() {
  useEffect(() => {
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

  return (
    <>
      <div className="glass-container">
        <header className="hero">
          <h1>Talos WMS</h1>
          <p className="subtitle">Inventory Management System</p>
          <p className="description">
            Welcome to the Talos WMS documentation hub. Explore our system
            specifications, requirements, and architectural designs below.
          </p>
        </header>

        <main className="docs-grid">
          <Link href="/talos-wms/prd" className="glass-card">
            <div className="card-icon">📄</div>
            <h2>PRD</h2>
            <p>Product Requirements Document detailing the product vision, user flows, and features.</p>
          </Link>
          <Link href="/talos-wms/srs" className="glass-card">
            <div className="card-icon">⚙️</div>
            <h2>SRS</h2>
            <p>Software Requirements Specification outlining functional and non-functional requirements.</p>
          </Link>
          <Link href="/talos-wms/sdd" className="glass-card">
            <div className="card-icon">📐</div>
            <h2>SDD</h2>
            <p>Software Design Document showcasing the system architecture, database schema, and APIs.</p>
          </Link>
        </main>

        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <Link
            href="/"
            className="glass-card"
            style={{ display: "inline-block", padding: "1rem 2rem", borderRadius: "8px" }}
          >
            &larr; Back to MCP Portal
          </Link>
        </div>

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
