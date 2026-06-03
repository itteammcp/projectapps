"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import "./deepspace.css";

interface Section {
  id: string;
  num: string;
  title: string;
  content: string;
}

export default function DeepSpaceViewer({ 
  htmlContent, 
  docTitle,
  backUrl = "/",
  accentColor = "#38f0c0",
  accentColorRgb = "56, 240, 192"
}: { 
  htmlContent: string; 
  docTitle: string;
  backUrl?: string;
  accentColor?: string;
  accentColorRgb?: string;
}) {
  const [sections, setSections] = useState<Section[]>([]);
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const sectionNodes = Array.from(doc.querySelectorAll(".section"));

    const schemaMap: Record<string, Section> = {};

    sectionNodes.forEach(sec => {
      const id = sec.id;
      const num = sec.querySelector(".section-num")?.textContent?.trim() || "";
      const title = sec.querySelector(".section-title")?.textContent?.trim() || "";
      const content = sec.querySelector(".content")?.innerHTML || "";

      let groupName = "Lainnya";
      let groupNum = "0.0";
      let isTable = false;

      const schemaMatch = title.match(/^([a-z_]+)\.([a-z_]+)/i);

      if (schemaMatch) {
        const schema = schemaMatch[1];
        groupName = `Schema ${schema}`;
        groupNum = num.split('.')[0] + ".0";
        isTable = true;
      } else if (num.startsWith('1.')) {
        groupName = "Ringkasan Arsitektur";
        groupNum = "1.0";
      } else {
        groupName = title;
        groupNum = num;
      }

      if (!schemaMap[groupName]) {
        schemaMap[groupName] = {
          id: groupName.replace(/\s+/g, '-').toLowerCase(),
          num: groupNum,
          title: groupName,
          content: ""
        };
      }

      if (isTable) {
        schemaMap[groupName].content += `
          <div class="schema-table-block" style="margin-top: 2rem; border-top: 1px dashed rgba(var(--accent-color-rgb), 0.4); padding-top: 1.5rem;">
            <h3 style="color: var(--accent-color); font-size: 1.4rem; font-family: 'DM Mono', monospace;">${title}</h3>
            ${content}
          </div>
        `;
      } else {
        schemaMap[groupName].content += `<div style="margin-bottom: 2rem;">${content}</div>`;
      }
    });

    const finalSections = Object.values(schemaMap).sort((a, b) => a.num.localeCompare(b.num));
    setSections(finalSections);
  }, [htmlContent]);

  const closeModal = useCallback(() => {
    if (activeSection === null) return;
    setIsClosing(true);
    setTimeout(() => {
      setActiveSection(null);
      setIsClosing(false);
    }, 400);
  }, [activeSection]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeModal]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || activeSection !== null) return;
    const { clientX, clientY } = e;

    // Calculate mouse position relative to the center of the viewport
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const deltaX = (clientX - centerX) / centerX; // -1 to 1
    const deltaY = (clientY - centerY) / centerY; // -1 to 1

    const planets = containerRef.current.querySelectorAll('.parallax-planet-container');
    planets.forEach((planetWrapper) => {
      const el = planetWrapper as HTMLElement;
      // Get the depth factor stored in data-depth
      const depth = parseFloat(el.getAttribute('data-depth') || "1");

      // Farther objects move less, closer objects move more
      const moveX = deltaX * depth * -80; // Opposite to mouse movement for parallax
      const moveY = deltaY * depth * -80;

      el.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  };

  const openModal = (index: number) => {
    setActiveSection(index);
    setIsClosing(false);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) closeModal();
  };

  // Deterministic random for layout
  const getRand = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  return (
    <div
      className="deepspace-container"
      onMouseMove={handleMouseMove}
      ref={containerRef}
      style={{
        // @ts-ignore
        "--accent-color": accentColor,
        "--accent-color-rgb": accentColorRgb
      }}
    >
      <Link 
        href={backUrl} 
        style={{ 
          position: 'fixed', 
          top: 'auto',
          bottom: '24px', 
          left: '24px', 
          zIndex: 9999, 
          padding: '10px 20px', 
          background: 'var(--accent-color)', 
          color: 'var(--bg-color, #0f172a)', 
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


      <div className="background-stars-3d"></div>

      <div className="deepspace-header">
        {/* <p>{docTitle}</p> */}
        <span className="subtitle-hint">{docTitle}</span>
      </div>

      <div className="deepspace-world" style={{ width: '100vw', height: '100vh' }}>
        {sections.map((sec, index) => {
          // Distribute in a grid to avoid overlap, then jitter
          const cols = Math.ceil(Math.sqrt(sections.length));
          const col = index % cols;
          const row = Math.floor(index / cols);

          // Use 80% of the screen width/height to keep them away from the extreme edges
          const cellWidth = 80 / cols;
          const cellHeight = 80 / cols;

          const baseX = 10 + (col * cellWidth);
          const baseY = 15 + (row * cellHeight);

          // Jitter (reduced so they stay within their cells and on screen)
          const jX = getRand(index * 2) * (cellWidth * 0.5);
          const jY = getRand(index * 2 + 1) * (cellHeight * 0.5);

          const finalX = baseX + jX;
          const finalY = baseY + jY;

          // Determine depth layer (1: Foreground, 2: Midground, 3: Background)
          const layerRand = getRand(index * 3);
          let layerClass = "layer-mid";
          let depthFactor = 0.5;
          let baseScale = 0.8;

          if (layerRand > 0.7) {
            layerClass = "layer-front";
            depthFactor = 1.2;
            baseScale = 1.1; // Reduced from 1.3 to avoid covering too much screen
          } else if (layerRand < 0.3) {
            layerClass = "layer-back";
            depthFactor = 0.2;
            baseScale = 0.6; // Increased from 0.5 to be more legible
          }

          return (
            <div
              key={sec.id}
              className={`parallax-planet-container ${layerClass}`}
              data-depth={depthFactor}
              style={{
                position: 'absolute',
                left: `${finalX}vw`,
                top: `${finalY}vh`,
                zIndex: Math.floor(depthFactor * 100)
              }}
            >
              <div
                className={`ds-planet planet-${index % 6}`}
                onClick={() => openModal(index)}
                style={{ transform: `scale(${baseScale})` }}
              >
                <div className="planet-num">{sec.num || (index + 1).toString().padStart(2, '0')}</div>
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
                <span className="crt-num">{sections[activeSection].num || (activeSection + 1).toString().padStart(2, '0')}</span>
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
