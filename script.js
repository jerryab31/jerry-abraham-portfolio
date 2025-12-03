// Function to handle the Revised Voice Intro
function handleVoiceIntro() {
    // New, professional voice script mentioning the variety of projects
    const script = "Welcome. This portfolio demonstrates the convergence of business transformation, AI, Machine Learning, and Robotic Process Automation. I am Jerry Abraham. My focus is delivering measurable business outcomes across complex digital programs. Explore the full suite of projects below.";
    
    const btn = document.getElementById('voice-intro-btn');
    
    // Check for speech synthesis support
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(script);
        utterance.rate = 0.9; // Slightly slower
        utterance.pitch = 1.0; 
        
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
            // Handle error, just in case
            utterance.onerror = () => {
                btn.innerHTML = '<i class="fas fa-microphone"></i> Project Intro';
            };
        }
    } else {
        alert("Text-to-Speech is not supported by your browser. Please upgrade to a modern browser.");
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
    // *** REMOVED AUTOPLAY VOICE LOGIC ***
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
