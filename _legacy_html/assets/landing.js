document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.glass-card');
    
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
    const orbs = document.querySelectorAll('.orb');
    
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * -15; // Different speeds
            const xOffset = (window.innerWidth / 2 - x) / speed;
            const yOffset = (window.innerHeight / 2 - y) / speed;
            
            orb.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });
});
