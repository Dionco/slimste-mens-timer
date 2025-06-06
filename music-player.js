// Simplified Player for De Slimste Mens Timer
// Only plays Jan Smit - Boom Boom Bailando when timer ends

class MusicPlayer {
    constructor() {
        this.audioElement = null;
        this.songPath = "music/Jan Smit - Boom Boom Bailando (Official Audio).mp3";
        this.createAudioElement();
    }
    
    createAudioElement() {
        // Create audio element
        this.audioElement = document.createElement('audio');
        this.audioElement.id = 'bgMusic';
        this.audioElement.preload = 'auto';
        this.audioElement.src = this.songPath;
        document.body.appendChild(this.audioElement);
        
        // Set volume
        this.audioElement.volume = 0.7;
    }
    
    play() {
        try {
            // Reset audio to beginning and play
            this.audioElement.currentTime = 0;
            this.audioElement.play();
        } catch (error) {
            console.error('Error playing audio:', error);
        }
    }
    
    stop() {
        if (this.audioElement) {
            this.audioElement.pause();
            this.audioElement.currentTime = 0;
        }
    }
    
    // Simple fallback if needed
    playFallbackSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            // Connect nodes
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
            
            gainNode.gain.setValueAtTime(0.7, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 2);
        } catch (error) {
            console.error('Web Audio API fallback also failed:', error);
        }
    }
}

// Make the player available globally
window.musicPlayer = new MusicPlayer();
