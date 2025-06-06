// Explosion Effect
class ExplosionEffect {
    constructor() {
        this.createContainer();
        this.createFlash();
    }
    
    createContainer() {
        this.container = document.createElement('div');
        this.container.className = 'explosion-container';
        document.body.appendChild(this.container);
        
        this.explosion = document.createElement('div');
        this.explosion.className = 'explosion';
        this.container.appendChild(this.explosion);
    }
    
    createFlash() {
        this.flash = document.createElement('div');
        this.flash.className = 'explosion-flash';
        document.body.appendChild(this.flash);
    }
    
    createParticles(count = 30) {
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'explosion-particle';
            
            // Random direction and distance
            const angle = Math.random() * Math.PI * 2;
            const distance = 30 + Math.random() * 70; // 30-100px
            
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);
            
            // Random size
            const size = 5 + Math.random() * 15; // 5-20px
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random animation duration
            const duration = 0.5 + Math.random() * 0.5; // 0.5-1s
            particle.style.animation = `explode-particle ${duration}s ease-out forwards`;
            
            this.explosion.appendChild(particle);
            
            // Remove particle after animation ends
            setTimeout(() => {
                particle.remove();
            }, duration * 1000);
        }
    }
    
    createRings(count = 3) {
        for (let i = 0; i < count; i++) {
            const ring = document.createElement('div');
            ring.className = 'explosion-ring';
            
            // Delay between rings
            const delay = i * 0.2;
            const duration = 1 + Math.random() * 0.5; // 1-1.5s
            
            ring.style.animation = `explode-ring ${duration}s ${delay}s ease-out forwards`;
            
            this.explosion.appendChild(ring);
            
            // Remove ring after animation ends
            setTimeout(() => {
                ring.remove();
            }, (duration + delay) * 1000);
        }
    }
    
    trigger() {
        // Show container
        this.container.classList.add('active');
        
        // Create effects
        this.createParticles(30);
        this.createRings(3);
        
        // Flash effect
        this.flash.classList.add('active');
        
        // Shake the timer
        const timerContainer = document.querySelector('.container');
        timerContainer.classList.add('shake');
        
        // Reset after animation
        setTimeout(() => {
            this.container.classList.remove('active');
            this.flash.classList.remove('active');
            timerContainer.classList.remove('shake');
        }, 2000);
    }
}

// Audio Manager
class AudioManager {
    constructor() {
        this.sounds = {};
        this.loadSounds();
    }
    
    loadSounds() {
        // Alarm sound (when timer hits zero)
        this.sounds.alarm = new Audio('audio/alarm.mp3');
        this.sounds.alarm.volume = 0.7;
        
        // Optional backup for browsers that don't support the audio file
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    playAlarm() {
        try {
            // Try to play the audio file
            const promise = this.sounds.alarm.play();
            
            // Handle autoplay restrictions
            if (promise !== undefined) {
                promise.catch(() => {
                    // If audio file can't play, use Web Audio API as fallback
                    this.playFallbackAlarm();
                });
            }
        } catch (error) {
            this.playFallbackAlarm();
        }
    }
    
    // Fallback using Web Audio API
    playFallbackAlarm() {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        // Alarm sound pattern
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(440, this.audioContext.currentTime);
        oscillator.frequency.setValueAtTime(880, this.audioContext.currentTime + 0.25);
        oscillator.frequency.setValueAtTime(440, this.audioContext.currentTime + 0.5);
        oscillator.frequency.setValueAtTime(880, this.audioContext.currentTime + 0.75);
        
        // Volume envelope
        gainNode.gain.setValueAtTime(0.8, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 2);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 2);
    }
    
    stopAll() {
        this.sounds.alarm.pause();
        this.sounds.alarm.currentTime = 0;
    }
}

// Make these effects available globally
window.explosionEffect = new ExplosionEffect();
window.audioManager = new AudioManager();
