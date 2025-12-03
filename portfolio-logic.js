// Function to find a generic male voice
function getMaleVoice(voices) {
    // Look for voice names containing keywords often associated with male voices
    const maleKeywords = ['male', 'man', 'david', 'mark', 'google us english', 'microsoft mark'];
    
    // Convert to lowercase for case-insensitive search
    const lowerVoices = voices.map(v => ({ 
        name: v.name.toLowerCase(), 
        voice: v 
    }));

    for (let i = 0; i < lowerVoices.length; i++) {
        const v = lowerVoices[i];
        if (maleKeywords.some(keyword => v.name.includes(keyword))) {
            return v.voice;
        }
    }
    
    // Fallback: If no male voice found, return null (browser will use default)
    return null;
}

// Function to handle the Revised Voice Intro
function handleVoiceIntro() {
    const script = "Welcome. This portfolio demonstrates the convergence of business transformation, AI, Machine Learning, and Robotic Process Automation. I am Jerry Abraham. My focus is delivering measurable business outcomes across complex digital programs. Explore the full suite of projects below.";
    
    const btn = document.getElementById('voice-intro-btn');
    
    if ('speechSynthesis' in window) {
        
        const utterance = new SpeechSynthesisUtterance(script);
        utterance.rate = 0.9; // Slightly slower
        utterance.pitch = 1.0; 

        // 1. Get the list of voices
        const voices = speechSynthesis.getVoices();
        
        // 2. Select the male voice
        let selectedVoice = getMaleVoice(voices);

        // This check is necessary if voices aren't loaded immediately
        if (voices.length === 0) {
            speechSynthesis.onvoiceschanged = () => {
                const updatedVoices = speechSynthesis.getVoices();
                selectedVoice = getMaleVoice(updatedVoices);
                if (selectedVoice) {
                    utterance.voice = selectedVoice;
                }
                // Continue with speaking logic after voice setup
                speakLogic(utterance, btn);
            };
        } else {
            if (selectedVoice) {
                utterance.voice = selectedVoice;
            }
            speakLogic(utterance, btn);
        }

    } else {
        alert("Text-to-Speech is not supported by your browser. Please upgrade to a modern browser.");
    }
}

// Helper function to contain the speaking and button logic
function speakLogic(utterance, btn) {
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
        // Button reverts to default when stopped
        btn.innerHTML = '<i class="fas fa-microphone"></i> Project Intro';
    } else {
        speechSynthesis.speak(utterance);
        // Change button text while speaking
        btn.innerHTML = '<i class="fas fa-microphone-slash"></i> Stop Intro';

        // Reset button text once speaking is done
        utterance.onend = () => {
            btn.innerHTML = '<i class="fas fa-microphone"></i> Project Intro';
        };
        // Handle error
        utterance.onerror = () => {
            btn.innerHTML = '<i class="fas fa-microphone"></i> Project Intro';
        };
    }
}


// Function to handle scroll-triggered fade-in animations ONLY
function handleScrollAnimations() {
    const elements = document.querySelectorAll('section');
    const windowHeight = window.innerHeight;

    elements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight * 0.90) {
            el.classList.add('fade-in');
        }
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Ensure the button starts with the correct default label on load
    const voiceBtn = document.getElementById('voice-intro-btn');
    if (voiceBtn) {
        // Set the correct initial state here
        voiceBtn.innerHTML = '<i class="fas fa-microphone"></i> Project Intro';
        voiceBtn.addEventListener('click', handleVoiceIntro);
    }
    
    // 2. Initial check for elements already in view for fade-in animations
    handleScrollAnimations(); 

    // 3. Add scroll event listener for continuous checks
    window.addEventListener('scroll', handleScrollAnimations);
});
