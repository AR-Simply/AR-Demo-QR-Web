document.addEventListener('DOMContentLoaded', () => {
    const initialMessage = document.getElementById('initial-message');
    const buttonContainer = document.getElementById('button-container');
    const scene = document.querySelector('a-scene');
  
    // Show initial message with fade-in animation
    initialMessage.classList.remove('hidden');
  
    // Listen for the image target found event
    scene.addEventListener('targetFound', () => {
      // Fade out the initial message
      initialMessage.classList.add('fade-out');
      initialMessage.addEventListener('animationend', () => {
        initialMessage.classList.add('hidden');
      }, { once: true });
  
      // After 10 seconds, show the buttons with fade-in animation
      setTimeout(() => {
        buttonContainer.classList.remove('hidden');
        buttonContainer.classList.add('fade-in');
      }, 2000); // 10000 milliseconds = 10 seconds
    });
  });

  
  
  