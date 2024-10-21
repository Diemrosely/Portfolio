// About Me Animation
const words = ['a Developer', 'a Designer', 'a Consultant', 'a Problem Solver'];
const animatedWordsElement = document.querySelector('.animated-words');
let wordIndex = 0;
let zIndexCounter = 100; 

function showWords() {
    if (wordIndex < words.length) {
        animatedWordsElement.classList.add('fade-out');
        setTimeout(() => {
            animatedWordsElement.classList.remove('fade-out');
            animatedWordsElement.textContent = words[wordIndex];
            animatedWordsElement.classList.add('fade-in');
            wordIndex++;
            setTimeout(() => {
                animatedWordsElement.classList.remove('fade-in');
                showWords(); 
            }, 2000); 
        }, 500);
    } else {
        wordIndex = 0; 
        showWords();
    }
}

// Trigger animation upon modal open
function openAboutMeModal() {
    const aboutMeModal = document.getElementById('about-me');
    aboutMeModal.style.display = 'block';
    wordIndex = 0;
    showWords();
}

document.querySelector('[onclick="openModal(\'about-me\')"]').onclick = function() {
    openModal('about-me'); 
    openAboutMeModal(); 
};

// Homepage animation
document.addEventListener('DOMContentLoaded', () => {
    const meText = document.getElementById('me-text');
    const newName = document.getElementById('new-name');
  
    // Trigger the backspace animation on page load
    meText.classList.add('backspace-anim');
  
    // Once "Me" is backspaced, trigger the typing animation for "Diem"
    meText.addEventListener('animationend', () => {
      meText.style.display = 'none'; // Hide "Me" after backspace
      newName.textContent = 'Diem. '; // Set the new name text
      newName.style.width = '5ch'; // Start typing animation by increasing the width
    })
})