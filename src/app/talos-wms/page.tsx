"use client";

import Link from "next/link";

export default function TalosWMSPortal() {
  return (
    <main className="landing-wrapper">
      <Link href="/" className="btn-back-portal">
        &larr; Back to MCP Portal
      </Link>

      <header className="hero-floating">
        {/* <h1>Talos</h1> */}
        <p className="subtitle">Warehouse Management System</p>
      </header>

      <div className="solar-system">
        {/* Orbit 3: SDD (outer) */}
        <div className="orbit orbit-sdd">
          <div className="planet-container">
            <Link href="/talos-wms/sdd" className="planet glass-card-system">
              {/* <div className="card-icon" style={{ fontSize: '2rem' }}>📐</div> */}
              <h2>SDD</h2>
              <p>Design</p>
            </Link>
          </div>
        </div>

        {/* Orbit 2: SRS (middle) */}
        <div className="orbit orbit-srs">
          <div className="planet-container">
            <Link href="/talos-wms/srs" className="planet glass-card-system">
              {/* <div className="card-icon" style={{ fontSize: '2rem' }}>⚙️</div> */}
              <h2>SRS</h2>
              <p>Specifications</p>
            </Link>
          </div>
        </div>

        {/* Orbit 1: PRD (inner) */}
        <div className="orbit orbit-prd">
          <div className="planet-container">
            <Link href="/talos-wms/prd" className="planet glass-card-system">
              {/* <div className="card-icon" style={{ fontSize: '2rem' }}>📄</div> */}
              <h2>PRD</h2>
              <p>Requirements</p>
            </Link>
          </div>
        </div>

        {/* Sun: Talos WMS */}
        <div className="sun-talos glass-card-system">
          {/* <div className="card-icon" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📦</div> */}
          <h2>HERA</h2>
          <p>schema.talos</p>
        </div>
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
