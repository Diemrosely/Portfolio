let openStickyCount = 0;

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

// Display current time
function updateTime() {
    const timeElement = document.getElementById('current-time');
    const now = new Date();
    timeElement.textContent = now.toLocaleTimeString();
}
setInterval(updateTime, 1000);

// Modal Logic 
// Open Modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    const offset = openStickyCount * 30;
    modal.style.display = 'block';
    modal.style.left = `${20 + offset}px`;
    modal.style.top = `${80 + offset}px`;
    makeDraggable(modal);
    openStickyCount++;
}

// Close Modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
}

// Close Button Modal
document.querySelectorAll('.modal .close-btn').forEach(button => {
    button.addEventListener('click', function() {
        const modal = this.parentElement;
        modal.style.display = 'none';
    });
});

// Modal Draggable
function makeDraggable(modal) {
    let isDragging = false;
    let startX, startY, offsetX = modal.offsetLeft, offsetY = modal.offsetTop;

    modal.addEventListener('mousedown', function (e) {
        if (e.target.classList.contains('close-btn')) return;
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        document.body.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', function (e) {
        if (isDragging) {
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            offsetX += deltaX;
            offsetY += deltaY;
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
            modal.style.left = `${offsetX}px`;
            modal.style.top = `${offsetY}px`;
            startX = e.clientX;
            startY = e.clientY;
        }
    });

    document.addEventListener('mouseup', function () {
        if (isDragging) {
            isDragging = false;
            document.body.style.cursor = 'default';
        }
    });
}

// Modal Bring To Front Logic
function bringToFront(modal) {
    zIndexCounter++; 
    modal.style.zIndex = zIndexCounter;


    modal.parentElement.appendChild(modal);
}

// Modal Click Events
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function() {
        bringToFront(modal);  
    });
});

// Contact Me Icons
feather.replace({
    'height': 50,
    'width': 50,
    'stroke-width': 1
});

