const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let audioContext;
let analyser;
let audioSource;
let animationId;

// Initialize audio context on first user interaction
function initAudioContext() {
    if (audioContext) return;
    
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.8;
}

// Connect audio element to visualizer
function connectAudioSource(audioElement) {
    initAudioContext();

    if (!audioSource) {
        audioSource = audioContext.createMediaElementSource(audioElement);
        audioSource.connect(analyser);
        analyser.connect(audioContext.destination);
    }

    if (audioContext.state === 'suspended') {
        audioContext.resume().catch((error) => {
            console.error('Unable to resume the audio context:', error);
        });
    }
}

// Visualizer drawing function
const dataArray = new Uint8Array(128);

function draw() {
    animationId = requestAnimationFrame(draw);
    
    if (!analyser) return;
    
    analyser.getByteFrequencyData(dataArray);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw vertical bars
    const barWidth = canvas.width / dataArray.length;
    
    for (let i = 0; i < dataArray.length; i++) {
        const barHeight = (dataArray[i] / 255) * (canvas.height / 2);
        
        ctx.fillStyle = '#fff';
        
        // Draw from center
        ctx.fillRect(
            i * barWidth, 
            canvas.height / 2 - barHeight, 
            barWidth - 1, 
            barHeight * 2
        );
    }
}

// Start drawing
draw();

// Expose to window
window.initAudio = initAudioContext;
window.connectAudio = connectAudioSource;