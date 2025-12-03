// Function to handle the Dramatic Voice Intro
function handleVoiceIntro() {
    const script = "Welcome. You’ve entered the RAG — a containerized, enterprise-grade system built and battle-tested. I am Jerry Abraham. I build AI that moves industries, simplifies complexity, and delivers results. Click through the portfolio — and prepare to be impressed.";
    
    // Check for speech synthesis support
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(script);
        
        // Optional: Set voice, though browser defaults are usually okay
        // utterance.voice = speechSynthesis.getVoices().find(v => v.lang.includes('en-GB') && v.name.includes('Google')); 
        utterance.rate = 0.9; // Slightly slower
        utterance.pitch = 1.0; 
        
        const btn = document.getElementById('voice-intro-btn');

        if (speechSynthesis.speaking) {
            speechSynthesis.cancel();
            btn.innerHTML = '<i class="fas fa-microphone"></i> Play Dramatic Intro';
        } else {
            speechSynthesis.speak(utterance);
            btn.innerHTML = '<i class="fas fa-microphone-slash"></i> Stop Intro';

            // Reset button text once speaking is done
            utterance.onend = () => {
                btn.innerHTML = '<i class="fas fa-microphone"></i> Play Dramatic Intro';
            };
        }
    } else {
        alert("Text-to-Speech is not supported by your browser. Please upgrade to Chrome, Firefox, or Edge.");
    }
}

// Function to handle scroll-triggered fade-in animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('section');
    const windowHeight = window.innerHeight;

    elements.forEach(el => {
        // Get the position of the element relative to the viewport
        const elementTop = el.getBoundingClientRect().top;

        // If the element is within the viewport (e.g., 10% from the bottom)
        if (elementTop < windowHeight * 0.90) {
            el.classList.add('fade-in');
        }
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial check for elements already in view (e.g., the first section)
    handleScrollAnimations(); 

    // 2. Add scroll event listener for continuous checks
    window.addEventListener('scroll', handleScrollAnimations);
    
    // 3. Add click listener for the voice intro button
    const voiceBtn = document.getElementById('voice-intro-btn');
    if (voiceBtn) {
        voiceBtn.addEventListener('click', handleVoiceIntro);
    }
});
