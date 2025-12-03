// Function to handle the Revised Voice Intro
function handleVoiceIntro() {
    // New, professional voice script mentioning the variety of projects
    const script = "Welcome. This portfolio demonstrates the convergence of business transformation, AI, Machine Learning, and Robotic Process Automation. I am Jerry Abraham. My focus is delivering measurable business outcomes across complex digital programs. Explore the full suite of projects below.";
    
    // Check for speech synthesis support
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(script);
        utterance.rate = 0.9; // Slightly slower
        utterance.pitch = 1.0; 
        
        const btn = document.getElementById('voice-intro-btn');

        if (speechSynthesis.speaking) {
            speechSynthesis.cancel();
            btn.innerHTML = '<i class="fas fa-microphone"></i> Project Intro';
        } else {
            speechSynthesis.speak(utterance);
            btn.innerHTML = '<i class="fas fa-microphone-slash"></i> Stop Intro';

            // Reset button text once speaking is done
            utterance.onend = () => {
                btn.innerHTML = '<i class="fas fa-microphone"></i> Project Intro';
            };
        }
    } else {
        alert("Text-to-Speech is not supported by your browser. Please upgrade to a modern browser.");
    }
}

// Function to handle scroll-triggered fade-in animations AND Voice Button Activation
let voiceTriggered = false; // Flag to ensure it only auto-plays once

function handleScrollAnimations() {
    const elements = document.querySelectorAll('section');
    const windowHeight = window.innerHeight;

    elements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight * 0.90) {
            el.classList.add('fade-in');
        }
    });

    // New logic: Auto-trigger voice when user scrolls to the portfolio section for the first time
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
        const portfolioTop = portfolioSection.getBoundingClientRect().top;
        // Trigger when the section is 30% into the viewport
        if (!voiceTriggered && portfolioTop < windowHeight * 0.70) {
            handleVoiceIntro();
            voiceTriggered = true; 
        }
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial check for elements already in view
    handleScrollAnimations(); 

    // 2. Add scroll event listener for continuous checks
    window.addEventListener('scroll', handleScrollAnimations);
    
    // 3. Add click listener for the voice intro button
    const voiceBtn = document.getElementById('voice-intro-btn');
    if (voiceBtn) {
        voiceBtn.addEventListener('click', handleVoiceIntro);
    }
});
