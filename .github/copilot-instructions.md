<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# De Slimste Mens Timer - Copilot Instructions

This is a web-based countdown timer application inspired by the "De Slimste Mens" TV quiz show.

## Project Structure
- **HTML**: `index.html` - Main structure with timer display and controls
- **CSS**: `style.css` - Modern, responsive styling with gradients and animations
- **JavaScript**: `script.js` - Timer logic using vanilla JavaScript ES6+ classes

## Key Features
- 60-second countdown timer with MM:SS format display
- Start, Stop, Reset functionality
- Time adjustment buttons (+10s, -10s)
- Visual warnings (orange at ≤10s, red at ≤5s with pulsing animation)
- Audio notification when timer finishes
- Keyboard shortcuts (Space, R, Arrow keys)
- Responsive design for mobile devices

## Coding Guidelines
- Use vanilla JavaScript (no frameworks)
- Follow ES6+ standards with classes and arrow functions
- Maintain clean, semantic HTML structure
- Use CSS Grid/Flexbox for responsive layouts
- Implement smooth animations and transitions
- Ensure accessibility with proper button states and keyboard navigation

## Visual Design
- Modern gradient background
- Glass-morphism effect for main container
- Color-coded timer states (red=normal, orange=warning, red pulsing=danger)
- Clean typography with appropriate font weights and shadows
