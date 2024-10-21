// Display current time
function updateTime() {
    const timeElement = document.getElementById('current-time');
    const now = new Date();
    timeElement.textContent = now.toLocaleTimeString();
}
setInterval(updateTime, 1000); 

function displayLastLoggedIn() {
    const now = new Date();
    const formattedDate = now.toLocaleString(); 
    createText(`Last Logged In: ${formattedDate}`);
}

let openStickyCount = 0;  


function openModal(modalId) {
    const modal = document.getElementById(modalId);


    const offset = openStickyCount * 30;  
    modal.style.display = 'block';
    modal.style.left = `${20 + offset}px`;  
    modal.style.top = `${80 + offset}px`;   
    makeDraggable(modal);

    openStickyCount++;
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
}

// Add close button functionality for modals
document.querySelectorAll('.modal .close-btn').forEach(button => {
    button.addEventListener('click', function() {
        const modal = this.parentElement;
        modal.style.display = 'none';
    });
});

// Make the modals draggable and ensure they stay within the viewport
function makeDraggable(modal) {
    let isDragging = false;
    let startX, startY, offsetX = modal.offsetLeft, offsetY = modal.offsetTop;

    modal.addEventListener('mousedown', function (e) {
        if (e.target.classList.contains('close-btn')) return;  // Prevent dragging from close button
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        document.body.style.cursor = 'grabbing';  // Change cursor to grabbing
    });

    document.addEventListener('mousemove', function (e) {
        if (isDragging) {
            // Calculate the difference from where the mouse was clicked to where it is moved
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;

            // Update the modal's offset values
            offsetX += deltaX;
            offsetY += deltaY;

            // Constrain the modal within the viewport (window)
            const modalRect = modal.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            if (offsetX < 0) offsetX = 0;
            if (offsetY < 0) offsetY = 0;

            if (offsetX + modalRect.width > viewportWidth) {
                offsetX = viewportWidth - modalRect.width;
            }
            if (offsetY + modalRect.height > viewportHeight) {
                offsetY = viewportHeight - modalRect.height;
            }

            // Apply the new position to the modal
            modal.style.left = `${offsetX}px`;
            modal.style.top = `${offsetY}px`;

            // Reset the starting coordinates to prevent jumpy movement
            startX = e.clientX;
            startY = e.clientY;
        }
    });

    document.addEventListener('mouseup', function () {
        if (isDragging) {
            isDragging = false;
            document.body.style.cursor = 'default';  // Restore default cursor after dragging
        }
    });
}


// Terminal open/close and minimize logic
const terminalContainer = document.getElementById('terminal-container');
const openTerminalIcon = document.getElementById('open-terminal-icon');
const terminalTaskbarIcon = document.getElementById('terminal-taskbar-icon');
const minimizeTerminal = document.getElementById('minimize-terminal');
const closeTerminal = document.getElementById('close-terminal');
let terminalInitialized = false; // Track whether the terminal has been initialized

// Function to center the terminal
function centerTerminal() {
    terminalContainer.style.display = 'block';
    terminalContainer.style.left = '50%';
    terminalContainer.style.top = '50%';
    terminalContainer.style.transform = 'translate(-50%, -50%)';
    
    if (!terminalInitialized) {
        open_terminal(); 
        terminalInitialized = true;
    }
}

async function startServer() {
    createText("Last Logged In: " + new Date().toLocaleString());
    await delay(1000);

    const startingText = createText("Starting the server");
    let dotCount = 0;

    // Create a loading effect with the dots
    const intervalId = setInterval(() => {
        dotCount = (dotCount + 1) % 4; // Cycle through 0, 1, 2, 3 dots
        startingText.textContent = "Starting the server" + ".".repeat(dotCount);
    }, 500); // Change the dots every 500ms

    await delay(2500); // Simulate server starting for 2.5 seconds
    clearInterval(intervalId); // Stop the dots animation after the delay
    startingText.textContent = "Server started successfully."; // Final message
}



openTerminalIcon.addEventListener('click', () => {
    centerTerminal();  // Position the terminal in the center of the screen
    open_terminal();   // Trigger the terminal functionality (last logged in, loading, etc.)
});

// Minimize terminal (yellow button)
minimizeTerminal.addEventListener('click', () => {
    terminalContainer.style.display = 'none';
    terminalTaskbarIcon.style.display = 'flex'; // Show icon on taskbar
});

// Restore terminal from taskbar
terminalTaskbarIcon.addEventListener('click', () => {
    centerTerminal();
    terminalTaskbarIcon.style.display = 'none'; 
});

// Close terminal (red button)
closeTerminal.addEventListener('click', () => {
    terminalContainer.style.display = 'none';
    terminalTaskbarIcon.style.display = 'none'; 
});

// Terminal functionality
const app = document.querySelector("#app");  
const delay = ms => new Promise(res => setTimeout(res, ms));  

app.addEventListener("keypress", async function(event){
  if(event.key === "Enter"){
    await delay(150);
    getInputValue();
    removeInput();
    await delay(150);
    new_line();
    scrollToBottom(); 
  }
});

// Open terminal from taskbar icon
async function open_terminal() {
    displayLastLoggedIn();  // Display the last logged in time
    await startServer();    // Start the server with animated loading
    await delay(1000);
    createText("You can run several commands:");
    
    createCode(">about me", "Who am I and what do I do.");
    createCode(">all", "See all commands.");
    createCode(">social -a", "All my social networks.");
    
    await delay(600);
    new_line();
    scrollToBottom();  // Ensure the terminal scrolls to the bottom
}

// async function open_terminal(){
//   createText("Starting the server...");
//   await delay(2500);
//   createText("You can run several commands:");
 
//   createCode(">about me", "Who am I and what do I do.");
//   createCode(">all", "See all commands.");
//   createCode(">social -a", "All my social networks.");
  
//   await delay(600);
//   new_line();
//   scrollToBottom(); // Ensure scrolling to the bottom
// }

// Terminal helper functions
function new_line(){
  const p = document.createElement("p");
  const span1 = document.createElement("span");
  const span2 = document.createElement("span");
  p.setAttribute("class", "path")
  p.textContent = "# user";
  span1.textContent = " in";
  span2.textContent = " ~/portfolio";
  p.appendChild(span1);
  p.appendChild(span2);
  app.appendChild(p);

  const div = document.createElement("div");
  div.setAttribute("class", "type");
  const i = document.createElement("i");
  i.setAttribute("class", "fas fa-angle-right icone");
  div.appendChild(i);

  const input = document.createElement("input");
  input.setAttribute("type", "text");
  div.appendChild(input);

  app.appendChild(div);

  input.focus();
}

function createText(text){
  const p = document.createElement("p");
  p.textContent = text;
  app.appendChild(p);
}

function createCode(code, description){
  const p = document.createElement("p");
  p.innerHTML = `<span class="code">${code}:</span> ${description}`;
  app.appendChild(p);
}

function removeInput(){
  const div = document.querySelector(".type");
  app.removeChild(div);
}

function getInputValue(){
  const value = document.querySelector("input").value;
  if (value === "about me") {
    createText("Hi, I am a web developer...");
  } else if (value === "all") {
    createText("You can type: 'about me', 'all', 'social -a'");
  } else if (value === "social -a") {
    createText("GitHub: github.com");
  } else {
    createText(`Command not found: ${value}`);
  }
}

function scrollToBottom(){
  app.scrollTop = app.scrollHeight;
}

// Theme toggle functionality
const themeIcon = document.getElementById('theme-icon');
let isDarkMode = false;

themeIcon.addEventListener('click', function() {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        document.querySelectorAll('.modal').forEach(modal => modal.classList.add('dark-mode'));
        document.querySelector('.status-bar').classList.add('dark-mode');
        document.querySelectorAll('.navigation ul li a').forEach(link => link.classList.add('dark-mode'));
        themeIcon.textContent = '🌞';  
    } else {
        document.body.classList.remove('dark-mode');
        document.querySelectorAll('.modal').forEach(modal => modal.classList.remove('dark-mode'));
        document.querySelector('.status-bar').classList.remove('dark-mode');
        document.querySelectorAll('.navigation ul li a').forEach(link => link.classList.remove('dark-mode'));
        themeIcon.textContent = '🌙';  
    }
});

// Array of words to cycle through in the animation
const words = ['a Developer', 'a Designer', 'a Consultant', 'a Problem Solver'];
const animatedWordsElement = document.querySelector('.animated-words');
let wordIndex = 0;

// Function to show words one after another with smooth transitions
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

// Function to trigger the animation when modal is opened
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

let zIndexCounter = 100; 

// Make the sticky note move to the top when clicked
function bringToFront(modal) {
    zIndexCounter++; 
    modal.style.zIndex = zIndexCounter;


    modal.parentElement.appendChild(modal);
}

// Attach click event to all modals
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function() {
        bringToFront(modal);  
    });
});

feather.replace({
    'height': 50,
    'width': 50,
    'stroke-width': 1
});

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
    });
  });
  