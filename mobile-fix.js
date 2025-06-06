// Mobile fixes for De Slimste Mens Timer
document.addEventListener('DOMContentLoaded', function() {
    // Function to set correct viewport height for mobile
    function setViewportHeight() {
        // First we get the viewport height and multiply it by 1% to get a value for a vh unit
        let vh = window.innerHeight * 0.01;
        // Then we set the value in the --vh custom property to the root of the document
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    // Set the viewport height initially
    setViewportHeight();
    
    // Resize event handler
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);

    // Enable iOS momentum scrolling
    document.addEventListener('touchmove', function() {}, { passive: true });
});
