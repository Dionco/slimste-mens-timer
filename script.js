class CountdownTimer {
    constructor() {
        this.defaultTime = 60; // Default 60 seconds
        this.timeLeft = this.defaultTime;
        this.isRunning = false;
        this.intervalId = null;
        
        // DOM elements
        this.timerDisplay = document.getElementById('timerDisplay');
        this.startBtn = document.getElementById('startBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.increaseBtn = document.getElementById('increaseBtn');
        this.decreaseBtn = document.getElementById('decreaseBtn');
        this.status = document.getElementById('status');
        this.startTimeInput = document.getElementById('startTimeInput');
        this.setTimeBtn = document.getElementById('setTimeBtn');
        
        this.initializeEventListeners();
        this.updateDisplay();
    }
    
    initializeEventListeners() {
        this.startBtn.addEventListener('click', () => this.start());
        this.stopBtn.addEventListener('click', () => this.stop());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.increaseBtn.addEventListener('click', () => this.adjustTime(10));
        this.decreaseBtn.addEventListener('click', () => this.adjustTime(-10));
        this.setTimeBtn.addEventListener('click', () => this.setCustomTime());
        
        // Allow Enter key to set time
        this.startTimeInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                this.setCustomTime();
            }
        });
    }
    
    start() {
        if (!this.isRunning && this.timeLeft > 0) {
            this.isRunning = true;
            this.updateStatus('Timer is running...', 'running');
            this.updateButtons();
            
            this.intervalId = setInterval(() => {
                this.timeLeft--;
                this.updateDisplay();
                
                if (this.timeLeft <= 0) {
                    this.finish();
                }
            }, 1000);
        }
    }
    
    stop() {
        if (this.isRunning) {
            this.isRunning = false;
            clearInterval(this.intervalId);
            this.updateStatus('Timer stopped', 'stopped');
            this.updateButtons();
        }
    }
    
    reset() {
        this.isRunning = false;
        clearInterval(this.intervalId);
        this.timeLeft = this.defaultTime;
        this.updateDisplay();
        this.updateStatus('Ready to start', '');
        this.updateButtons();
        
        // Stop music if it's playing
        if (window.musicPlayer) {
            window.musicPlayer.stop();
        }
    }
    
    setCustomTime() {
        if (!this.isRunning) {
            const inputValue = parseInt(this.startTimeInput.value);
            
            if (inputValue && inputValue > 0 && inputValue <= 999) {
                this.defaultTime = inputValue;
                this.timeLeft = inputValue;
                this.updateDisplay();
                this.updateStatus(`Timer set to ${inputValue} seconds`, '');
            } else {
                this.updateStatus('Please enter a valid time (1-999 seconds)', 'stopped');
            }
        } else {
            this.updateStatus('Cannot change starting time while timer is running', 'stopped');
        }
    }
    
    adjustTime(seconds) {
        this.timeLeft = Math.max(0, this.timeLeft + seconds);
        this.updateDisplay();
        
        // If timer hits zero while running, finish the timer
        if (this.timeLeft === 0 && this.isRunning) {
            this.finish();
        } else if (!this.isRunning) {
            if (this.timeLeft === 0) {
                this.updateStatus('Timer at zero - press Start to begin', '');
            } else {
                this.updateStatus('Ready to start', '');
            }
        }
    }
    
    finish() {
        this.isRunning = false;
        clearInterval(this.intervalId);
        this.timeLeft = 0;
        this.updateDisplay();
        this.updateStatus('Time\'s up!', 'finished');
        this.updateButtons();
        
        // Play Jan Smit song
        if (window.musicPlayer) {
            window.musicPlayer.play();
        }
        
        // Trigger explosion effect
        if (window.explosionEffect) {
            window.explosionEffect.trigger();
        }
    }
    
    updateDisplay() {
        const timeString = this.timeLeft.toString().padStart(2, '0');
        
        this.timerDisplay.textContent = timeString;
        
        // Add visual warnings
        this.timerDisplay.classList.remove('warning', 'danger');
        
        if (this.timeLeft <= 10 && this.timeLeft > 5) {
            this.timerDisplay.classList.add('warning');
        } else if (this.timeLeft <= 5) {
            this.timerDisplay.classList.add('danger');
        }
    }
    
    updateButtons() {
        this.startBtn.disabled = this.isRunning || this.timeLeft === 0;
        this.stopBtn.disabled = !this.isRunning;
        // Remove the disabled state for time adjustment buttons
        // They can now be used while timer is running
        this.increaseBtn.disabled = false;
        this.decreaseBtn.disabled = false;
        // Disable set time button while running
        this.setTimeBtn.disabled = this.isRunning;
    }
    
    updateStatus(message, className) {
        this.status.textContent = message;
        this.status.className = `status ${className}`;
    }
    
    playFinishSound() {
        // Create a simple beep sound using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 1);
        } catch (error) {
            console.log('Audio not supported in this browser');
        }
    }
    
    // Keyboard shortcuts
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (event) => {
            switch(event.code) {
                case 'Space':
                    event.preventDefault();
                    if (this.isRunning) {
                        this.stop();
                    } else {
                        this.start();
                    }
                    break;
                case 'KeyR':
                    event.preventDefault();
                    this.reset();
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    this.adjustTime(10);
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    this.adjustTime(-10);
                    break;
            }
        });
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const timer = new CountdownTimer();
    timer.setupKeyboardShortcuts();
    
    // Add keyboard shortcut hints
    const hints = document.createElement('div');
    hints.className = 'keyboard-hints';
    hints.innerHTML = `
        <small style="color: #b0bec5; margin-top: 1rem; display: block; text-shadow: 0 1px 2px rgba(0,0,0,0.3);">
            <strong>Controls:</strong> Space = Start/Stop | R = Reset | ↑/↓ = Adjust time | Enter in input = Set custom time
        </small>
    `;
    document.querySelector('.container').appendChild(hints);
    
    // Fix for iOS Safari scrolling issues
    document.addEventListener('touchstart', {});
    
    // Disable pull-to-refresh on mobile
    document.body.addEventListener('touchmove', function(e) {
        if (window.innerHeight >= document.body.scrollHeight) {
            e.preventDefault();
        }
    }, { passive: false });
});
