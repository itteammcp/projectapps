"use client";

import { useEffect, useRef } from "react";

interface Props {
  htmlContent: string;
}

export default function LegacyHtmlViewer({ htmlContent }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // 1. Theme Logic
    const toggleBtn = container.querySelector('#theme-toggle-btn');
    const icon = container.querySelector('#theme-icon');
    const text = container.querySelector('#theme-text');
    
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const updateButton = (theme: string) => {
      if (!icon || !text) return;
      if (theme === 'light') {
        icon.textContent = '🌙';
        text.textContent = 'Dark Mode';
      } else {
        icon.textContent = '☀️';
        text.textContent = 'Light Mode';
      }
    };
    updateButton(savedTheme);

    const handleThemeToggle = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateButton(newTheme);
    };
    if (toggleBtn) {
      toggleBtn.addEventListener('click', handleThemeToggle);
    }

    // 2. Accordion Logic
    const sectionHeaders = container.querySelectorAll('.section-header');
    const handleAccordion = (e: Event) => {
      const header = e.currentTarget as HTMLElement;
      const section = header.parentElement;
      if (section) section.classList.toggle('collapsed');
    };
    sectionHeaders.forEach(header => {
      header.addEventListener('click', handleAccordion);
    });

    // Default all sections to collapsed
    container.querySelectorAll('.section').forEach(sec => sec.classList.add('collapsed'));

    // 3. Scroll to Top Logic
    const scrollToTopBtn = container.querySelector('#scroll-to-top');
    const handleScroll = () => {
      if (window.scrollY > 300) {
        scrollToTopBtn?.classList.add('visible');
      } else {
        scrollToTopBtn?.classList.remove('visible');
      }
    };
    const handleScrollTopClick = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    if (scrollToTopBtn) {
      window.addEventListener('scroll', handleScroll);
      scrollToTopBtn.addEventListener('click', handleScrollTopClick);
    }

    // 4. TOC Drawer Logic
    const tocBurger = container.querySelector('#toc-burger');
    const tocDrawer = container.querySelector('#toc-drawer');
    const tocOverlay = container.querySelector('#toc-overlay');

    const openToc = () => {
      tocDrawer?.classList.add('open');
      tocOverlay?.classList.add('visible');
    };
    const closeToc = () => {
      tocDrawer?.classList.remove('open');
      tocOverlay?.classList.remove('visible');
    };

    if (tocBurger) tocBurger.addEventListener('click', openToc);
    if (tocOverlay) tocOverlay.addEventListener('click', closeToc);

    const tocLinks = container.querySelectorAll('#toc-drawer a');
    tocLinks.forEach(link => {
      link.addEventListener('click', closeToc);
      // Smooth scroll for internal anchors
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const target = container.querySelector(href);
          if (target) {
            const offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
          }
        });
      }
    });

    return () => {
      if (toggleBtn) toggleBtn.removeEventListener('click', handleThemeToggle);
      sectionHeaders.forEach(header => header.removeEventListener('click', handleAccordion));
      if (scrollToTopBtn) {
        window.removeEventListener('scroll', handleScroll);
        scrollToTopBtn.removeEventListener('click', handleScrollTopClick);
      }
      if (tocBurger) tocBurger.removeEventListener('click', openToc);
      if (tocOverlay) tocOverlay.removeEventListener('click', closeToc);
    };
  }, [htmlContent]);

  return <div ref={containerRef} dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}
