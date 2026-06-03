"use client";

import Link from "next/link";

export default function CreativeXPortal() {
  return (
    <main className="landing-wrapper">
      <Link href="/" className="btn-back-portal">
        &larr; Back to MCP Portal
      </Link>

      <header className="hero-floating">
        {/* <h1>Creative-X</h1> */}
        <p className="subtitle">Enterprise Resource Planning (ERP)</p>
      </header>

      <div className="solar-system creative-x-portal">
        {/* Orbit 3: SDD (outer - coming soon) */}
        <div className="orbit orbit-sdd">
          <div className="planet-container">
            <div className="planet glass-card-system" style={{ opacity: 0.5, cursor: "not-allowed" }}>
              <h2>SDD</h2>
              <p>Coming Soon</p>
            </div>
          </div>
        </div>

        {/* Orbit 2: SRS (middle - coming soon) */}
        <div className="orbit orbit-srs">
          <div className="planet-container">
            <div className="planet glass-card-system" style={{ opacity: 0.5, cursor: "not-allowed" }}>
              <h2>SRS</h2>
              <p>Coming Soon</p>
            </div>
          </div>
        </div>

        {/* Orbit 1: PRD (inner) */}
        <div className="orbit orbit-prd">
          <div className="planet-container">
            <Link href="/creative-x/prd" className="planet glass-card-system">
              <h2>PRD</h2>
              <p>Requirements</p>
            </Link>
          </div>
        </div>

        {/* Sun: HERA */}
        <div className="sun-creative-x glass-card-system">
          <h2>HERA</h2>
          <p>schema.moneta/ares</p>
        </div>
      </div>

      <div className="background-stars"></div>

      <div className="background-orbs" style={{ opacity: 0.3 }}>
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>
    </main>
  );
}
