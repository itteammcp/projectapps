document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const icon = document.getElementById('theme-icon');
  const text = document.getElementById('theme-text');
  
  // Check for saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    updateButton('light');
  } else {
    // Default is dark
    document.documentElement.setAttribute('data-theme', 'dark');
    updateButton('dark');
  }

  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateButton(newTheme);
  });
  
  function updateButton(theme) {
    if (theme === 'light') {
      icon.textContent = '🌙';
      text.textContent = 'Dark Mode';
    } else {
      icon.textContent = '☀️';
      text.textContent = 'Light Mode';
    }
  }
  // Accordion Logic
  const sectionHeaders = document.querySelectorAll('.section-header');
  sectionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const section = header.parentElement;
      section.classList.toggle('collapsed');
    });
  });

  // Scroll to Top Logic
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    });

    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Default all sections to collapsed
  document.querySelectorAll('.section').forEach(sec => sec.classList.add('collapsed'));

  // TOC Drawer Logic
  const tocBurger = document.getElementById('toc-burger');
  const tocDrawer = document.getElementById('toc-drawer');
  const tocOverlay = document.getElementById('toc-overlay');

  if (tocBurger && tocDrawer && tocOverlay) {
    tocBurger.addEventListener('click', () => {
      tocDrawer.classList.add('open');
      tocOverlay.classList.add('visible');
    });

    tocOverlay.addEventListener('click', () => {
      tocDrawer.classList.remove('open');
      tocOverlay.classList.remove('visible');
    });

    // Close drawer when clicking a TOC link
    const tocLinks = tocDrawer.querySelectorAll('a');
    tocLinks.forEach(link => {
      link.addEventListener('click', () => {
        tocDrawer.classList.remove('open');
        tocOverlay.classList.remove('visible');
      });
    });
  }
});
