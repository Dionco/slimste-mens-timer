# De Slimste Mens Timer

A modern web-based countdown timer inspired by the popular TV quiz show "De Slimste Mens" (The Smartest Person). This timer features a clean, responsive design with intuitive controls perfect for quiz games, presentations, or any timing needs.

## Features

### ⏱️ Timer Functionality
- **60-second default countdown** with MM:SS format display
- **Start, Stop, and Reset** controls
- **Time adjustment buttons** to add or subtract 10 seconds
- **Visual warnings** with color changes and animations:
  - Orange glow when ≤ 10 seconds remaining
  - Red pulsing animation when ≤ 5 seconds remaining

### 🎨 Modern Design
- **Glass-morphism styling** with gradient backgrounds
- **Responsive layout** that works on desktop and mobile
- **Smooth animations** and hover effects
- **Large, readable timer display** in monospace font

### ⌨️ User Experience
- **Keyboard shortcuts** for quick control:
  - `Space` - Start/Stop timer
  - `R` - Reset timer
  - `↑/↓` - Increase/decrease time by 10 seconds
- **Audio notification** when timer reaches zero
- **Smart button states** (disabled when appropriate)
- **Status messages** to show current timer state

## Getting Started

### Option 1: Simple Setup
1. Download or clone this repository
2. Open `index.html` in any modern web browser
3. Start timing!

### Option 2: Local Development Server
```bash
# Navigate to the project directory
cd slimste_mens_timer

# Start a simple HTTP server (Python 3)
python -m http.server 8000

# Or with Node.js (if you have http-server installed)
npx http-server

# Then open http://localhost:8000 in your browser
```

## File Structure

```
slimste_mens_timer/
├── index.html          # Main HTML structure
├── style.css           # CSS styling and animations
├── script.js           # JavaScript timer logic
├── README.md           # This file
└── .github/
    └── copilot-instructions.md
```

## Usage

1. **Starting the Timer**: Click the "Start" button or press `Space`
2. **Stopping the Timer**: Click "Stop" or press `Space` while running
3. **Resetting the Timer**: Click "Reset" or press `R`
4. **Adjusting Time**: Use the "+10s" and "-10s" buttons, or arrow keys ↑/↓
5. **Visual Cues**: Watch for color changes as time runs low

## Browser Compatibility

This timer works in all modern browsers including:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Technical Details

- **Pure HTML/CSS/JavaScript** - No external dependencies
- **ES6+ JavaScript** with classes and modern syntax
- **CSS Grid and Flexbox** for responsive layouts
- **Web Audio API** for finish notification sound
- **CSS animations** for visual feedback

## Contributing

Feel free to fork this project and submit pull requests for:
- Bug fixes
- Feature enhancements
- UI/UX improvements
- Additional timer presets

## License

This project is open source and available under the MIT License.

---

Perfect for quiz shows, classroom activities, cooking timers, or any scenario where you need a reliable, attractive countdown timer! 🎯
