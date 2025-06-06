// Apply this script to fix scrolling issues on mobile devices
// This script ensures content will scroll properly on iOS Safari and other mobile browsers

document.addEventListener('DOMContentLoaded', function() {
    // Force document to be scrollable
    document.documentElement.style.height = 'initial';
    document.body.style.height = 'initial';
    document.documentElement.style.position = 'static';
    document.body.style.position = 'static';
    
    // Handle viewport height issues on mobile
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    // Set initial viewport height
    setViewportHeight();
    
    // Update on resize and orientation change
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);

    // Enable iOS momentum scrolling
    document.addEventListener('touchmove', function() {}, { passive: true });
});
