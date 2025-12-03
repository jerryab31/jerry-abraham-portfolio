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
            // Ensure button reverts to default when stopped
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

// Function to handle scroll-triggered fade-in animations
let voiceTriggered = false; // Flag to ensure auto-play only happens once

function handleScrollAnimations() {
    const elements = document.querySelectorAll('section');
    const windowHeight = window.innerHeight;
    const voiceBtn = document.getElementById('voice-intro-btn');

    elements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight * 0.90) {
            el.classList.add('fade-in');
        }
    });

    // Logic: Auto-trigger voice only if the button is currently in the default 'Project Intro' state
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection && voiceBtn) {
        const portfolioTop = portfolioSection.getBoundingClientRect().top;
        
        // Trigger when the section is 70% into the viewport AND if the voice hasn't been triggered yet
        if (!voiceTriggered && portfolioTop < windowHeight * 0.70) {
            
            // Set voiceTriggered flag immediately to prevent re-triggering on subsequent scrolls
            voiceTriggered = true; 
            
            // Call the handler to start the voice
            handleVoiceIntro();
        }
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Ensure the button starts with the correct label on load
    const voiceBtn = document.getElementById('voice-intro-btn');
    if (voiceBtn) {
        voiceBtn.innerHTML = '<i class="fas fa-microphone"></i> Project Intro';
        voiceBtn.addEventListener('click', handleVoiceIntro);
    }
    
    // 1. Initial check for elements already in view
    handleScrollAnimations(); 

    // 2. Add scroll event listener for continuous checks
    window.addEventListener('scroll', handleScrollAnimations);
});
