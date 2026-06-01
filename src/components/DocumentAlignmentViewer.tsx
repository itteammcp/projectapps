"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import "./alignment.css";

interface Section {
  id: string;
  num: string;
  title: string;
  content: string;
}

export default function DocumentAlignmentViewer({ htmlContent, docTitle }: { htmlContent: string, docTitle: string }) {
  const [sections, setSections] = useState<Section[]>([]);
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const sectionNodes = Array.from(doc.querySelectorAll(".section"));

    const parsedSections = sectionNodes.map(sec => {
      const id = sec.id;
      const num = sec.querySelector(".section-num")?.textContent?.trim() || "";
      const title = sec.querySelector(".section-title")?.textContent?.trim() || "";
      const content = sec.querySelector(".content")?.innerHTML || "";
      return { id, num, title, content };
    });

    setSections(parsedSections);
  }, [htmlContent]);

  const closeModal = useCallback(() => {
    if (activeSection === null) return;
    setIsClosing(true);
    setTimeout(() => {
      setActiveSection(null);
      setIsClosing(false);
    }, 400); // Wait for crt-off animation
  }, [activeSection]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeModal]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || activeSection !== null) return;
    const { clientX, clientY } = e;

    const wrappers = containerRef.current.querySelectorAll('.parallax-wrapper');
    wrappers.forEach((wrapper) => {
      const rect = wrapper.getBoundingClientRect();
      const elCenterX = rect.left + rect.width / 2;
      const elCenterY = rect.top + rect.height / 2;

      const distX = clientX - elCenterX;
      const distY = clientY - elCenterY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      const planet = wrapper.querySelector('.parallax-planet') as HTMLElement;
      const threshold = 180;

      if (distance < threshold) {
        const pullForce = (threshold - distance) / threshold;
        const moveX = distX * pullForce * 0.4;
        const moveY = distY * pullForce * 0.4;
        planet.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.15)`;
        planet.classList.add('magnetic-active');
      } else {
        planet.style.transform = `translate(0px, 0px) scale(1)`;
        planet.classList.remove('magnetic-active');
      }
    });
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    const planets = containerRef.current.querySelectorAll('.parallax-planet');
    planets.forEach((planet) => {
      const el = planet as HTMLElement;
      el.style.transform = `translate(0px, 0px) scale(1)`;
      el.classList.remove('magnetic-active');
    });
  };

  const openModal = (index: number) => {
    setActiveSection(index);
    setIsClosing(false);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const isCompact = sections.length > 8;
  const spacing = isCompact ? 10 : 15; // Reduce spacing in compact mode
  const totalWidth = 20 + (sections.length * spacing);

  return (
    <div
      className="alignment-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
    >
      <Link 
        href="/talos-wms" 
        style={{ 
          position: 'fixed', 
          top: 'auto',
          bottom: '24px', 
          left: '24px', 
          zIndex: 9999, 
          padding: '10px 20px', 
          background: '#6366f1', 
          color: 'white', 
          borderRadius: '8px', 
          textDecoration: 'none', 
          fontFamily: "'Syne', sans-serif", 
          fontWeight: 600, 
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          pointerEvents: 'auto',
          width: 'fit-content',
          height: 'fit-content'
        }}>
        &larr; Back
      </Link>

      <div className="background-stars"></div>

      {/* Title */}
      <div className="alignment-header">
        <p>{docTitle}</p>
      </div>

      {/* Planets */}
      <div 
        className={`planets-scroll-area ${isCompact ? 'compact-mode' : ''}`}
        style={{ width: `max(100vw, ${totalWidth}vw)` }}
      >
        {sections.map((sec, index) => {
          // Equalizer horizontal pattern
          const equalizerHeights = [60, 25, 70, 30, 65, 20]; // Y positions

          const xPos = 10 + (index * spacing); // vw
          const yPos = equalizerHeights[index % equalizerHeights.length];
          const scale = 0.8 + (Math.random() * 0.4); // Random scale

          return (
            <div
              key={sec.id}
              className="parallax-wrapper"
              style={{
                left: `${xPos}vw`,
                top: `${yPos}%`,
                transform: `translate(-50%, -50%) scale(${scale})`,
                zIndex: Math.floor(scale * 10)
              }}
            >
              <div
                className={`parallax-planet planet-${index % 6}`}
                onClick={() => openModal(index)}
              >
                <div className="planet-num">{sec.num}</div>
                <div className="planet-title-external">
                  {sec.title}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CRT Modal */}
      {activeSection !== null && (
        <div className="crt-modal-overlay" onClick={handleOverlayClick}>
          <div className={`crt-modal-content ${isClosing ? 'crt-closing' : 'crt-opening'}`}>
            <button className="crt-close-btn" onClick={closeModal}>✕</button>
            <div className="crt-screen">
              <div className="crt-header">
                <span className="crt-num">{sections[activeSection].num}</span>
                <h2>{sections[activeSection].title}</h2>
              </div>
              <div
                className="crt-body markdown-body"
                dangerouslySetInnerHTML={{ __html: sections[activeSection].content }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
