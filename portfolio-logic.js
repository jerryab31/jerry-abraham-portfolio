// Function to find a specific target male voice
function getSpecificMaleVoice(voices) {
    // Target common high-quality male voices across platforms
    const targetVoices = [
        'Google UK English Male', // Excellent general choice
        'Microsoft David Desktop',  // Common on Windows
        'Microsoft Mark', // Alternative on Windows
        'David' // Generic, high probability male name
    ];
    
    // Convert target voices to lowercase for case-insensitive matching
    const lowerTargetVoices = targetVoices.map(name => name.toLowerCase());

    for (let i = 0; i < voices.length; i++) {
        const voiceName = voices[i].name.toLowerCase();
        
        // Check if the voice name includes any of our specific targets
        if (lowerTargetVoices.some(target => voiceName.includes(target))) {
            return voices[i];
        }
    }
    
    // Fallback: Return null, let the browser use its default (but the previous attempt failed)
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

        const voices = speechSynthesis.getVoices();
        let selectedVoice = getSpecificMaleVoice(voices);

        // Check if voices are loaded. If not, wait for the voiceschanged event.
        if (voices.length === 0) {
            speechSynthesis.onvoiceschanged = () => {
                const updatedVoices = speechSynthesis.getVoices();
                selectedVoice = getSpecificMaleVoice(updatedVoices);
                if (selectedVoice) {
                    utterance.voice = selectedVoice;
                }
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
        btn.innerHTML = '<i class="fas fa-microphone"></i> Project Intro';
    } else {
        speechSynthesis.speak(utterance);
        btn.innerHTML = '<i class="fas fa-microphone-slash"></i> Stop Intro';

        utterance.onend = () => {
            btn.innerHTML = '<i class="fas fa-microphone"></i> Project Intro';
        };
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
        voiceBtn.innerHTML = '<i class="fas fa-microphone"></i> Project Intro';
        voiceBtn.addEventListener('click', handleVoiceIntro);
    }
    
    // 2. Initial check for elements already in view for fade-in animations
    handleScrollAnimations(); 

    // 3. Add scroll event listener for continuous checks
    window.addEventListener('scroll', handleScrollAnimations);
});
