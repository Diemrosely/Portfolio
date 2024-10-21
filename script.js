document.addEventListener("DOMContentLoaded", function () {
  let myTerminalContainer = document.getElementById("terminal-container");
  let openTerminalIcon = document.getElementById("open-terminal-icon");
  let terminalTaskbarIcon = document.getElementById("terminal-taskbar-icon");
  let minimizeTerminal = document.getElementById("minimize-terminal");
  let closeTerminal = document.getElementById("close-terminal");
  let app = document.querySelector("#app");

  let terminalInitialized = false;
  let delay = (ms) => new Promise((res) => setTimeout(res, ms));

  // List of commands and their descriptions
  const commands = [
    { command: "about me", description: "Who am I and what do I do." },
    { command: "all", description: "See all commands." },
    { command: "social -a", description: "All my social networks." },
    { command: "projects", description: "My github projects." },
    { command: "clear", description: "Clean the terminal." },
    { command: "help", description: "Show available commands." },
  ];

  // Function to display the help screen without clearing the terminal
function displayHelp() {
    // Create a help container and style it with the help commands
    const helpContainer = document.createElement('div');
    helpContainer.setAttribute('class', 'help-container');

    // Title for help section
    const title = document.createElement('h3');
    title.textContent = 'Available Commands';
    helpContainer.appendChild(title);

    // Add each command with its description
    commands.forEach(({ command, description }) => {
        const commandElement = document.createElement('div');
        commandElement.setAttribute('class', 'help-command');
        commandElement.innerHTML = `<strong>${command}</strong>: ${description}`;
        helpContainer.appendChild(commandElement);
    });

    app.appendChild(helpContainer);
    scrollToBottom(); 
}

  // Display last logged in
  function displayLastLoggedIn() {
    const now = new Date();
    const formattedDate = now.toLocaleString();
    createText(`Last Logged In: ${formattedDate}`);
  }

  // Scroll to bottom
  function scrollToBottom() {
    app.scrollTop = app.scrollHeight;
  }

  // Terminal Keypress Event
  app.addEventListener("keypress", async function (event) {
    if (event.key === "Enter") {
      await delay(150);
      getInputValue();
      removeInput();
      await delay(150);
      new_line();
    }
  });

  // Open terminal functionality
  async function open_terminal() {
    if (terminalInitialized) return; 
    displayLastLoggedIn();
    await delay(1000);

    let startingText = createText("Starting the server");
    let dotCount = 0;

    // Loading dots animation
    const intervalId = setInterval(() => {
      dotCount = (dotCount + 1) % 4;
      startingText.textContent = "Starting the server" + ".".repeat(dotCount);
    }, 500);

    await delay(2500);
    clearInterval(intervalId);
    startingText.textContent = "Server started successfully.";

    await delay(1000);
    createText("Welcome");
    await delay(700);
    createText("You can run several commands:");
    createCode("about me", "Who am I and what do I do.");
    createCode("all", "See all commands.");
    createCode("social -a", "All my social networks.");
    createCode("--help", "Learn more.");
    await delay(500);
    new_line();
    scrollToBottom();
    terminalInitialized = true; // Terminal is now initialized
  }

  // Creating a new line for the terminal
  function new_line() {
    const p = document.createElement("p");
    const span1 = document.createElement("span");
    const span2 = document.createElement("span");
    p.setAttribute("class", "path");
    p.textContent = "# user";
    span1.textContent = " in";
    span2.textContent = " ~/diem";
    p.appendChild(span1);
    p.appendChild(span2);
    app.appendChild(p);

    const div = document.createElement("div");
    div.setAttribute("class", "type");
    const i = document.createElement("i");
    i.setAttribute("class", "fas fa-angle-right icon");

    const input = document.createElement("input");
    div.appendChild(i);
    div.appendChild(input);
    app.appendChild(div);
    input.focus();
  }

  // Removing the current input from the terminal
  function removeInput() {
    const div = document.querySelector(".type");
    app.removeChild(div);
  }

  // Get input value and handle commands
  async function getInputValue() {
    const value = document.querySelector("input").value;
    if (value === "all") {
      trueValue(value);
      createCode(
        "projects",
        "My github page with my projects. Follow me there ;)"
      );
      createCode("about me", "Who am I and what do I do.");
      createCode("social -a", "All my social networks.");
      createCode("--help", "Learn more.");
      createCode("clear", "Clean the terminal.");
    } else if (value === "projects") {
      trueValue(value);
      createText(
        "<a href='https://github.com/diemrosely' target='_blank'><i class='fab fa-github white'></i> github.com/diemrosely</a>"
      );
    } else if (value === "about me") {
      trueValue(value);
      createText("Hi, I'm Diem ;)");
      createText("I made this app!");
    } else if (value === "--help") {
      trueValue(value);
      displayHelp(); 
    } else if (value === "social -a") {
      trueValue(value);
      createText(
        "<a href='https://github.com/Diemrosely/' target='_blank'><i class='fab fa-github white'></i> github.com/</a>"
      );
      createText(
        "<a href='https://www.linkedin.com/in/' target='_blank'><i class='fab fa-linkedin-in white'></i> linkedin.com/in/</a>"
      );
      createText(
        "<a href='https://diemrosely.github.io/Portfolio/' target='_blank'><i class='fas fa-laptop-code'></i> porfolio.com/</a>"
      );
    } else if (value === "clear") {
      document
        .querySelectorAll("p")
        .forEach((e) => e.parentNode.removeChild(e));
      document
        .querySelectorAll("section")
        .forEach((e) => e.parentNode.removeChild(e));
    } else {
      falseValue(value);
      createText(`Command not found: ${value}`);
    }
  }

  // Adding correct command to the terminal output
  function trueValue(value) {
    const div = document.createElement("section");
    div.setAttribute("class", "type2");
    const i = document.createElement("i");
    i.setAttribute("class", "fas fa-angle-right icon error");
    const terminalMessage = document.createElement("h3");
    terminalMessage.setAttribute("class", "success");
    terminalMessage.textContent = `${value}`;
    div.appendChild(i);
    div.appendChild(terminalMessage);
    app.appendChild(div);
  }

  // Adding incorrect command to the terminal output
  function falseValue(value) {
    const div = document.createElement("section");
    div.setAttribute("class", "type2");
    const i = document.createElement("i");
    i.setAttribute("class", "fas fa-angle-right icone error");
    const terminalMessage = document.createElement("h3");
    terminalMessage.setAttribute("class", "error");
    terminalMessage.textContent = `${value}`;
    div.appendChild(i);
    div.appendChild(terminalMessage);
    app.appendChild(div);
  }

  // Create a text element for the terminal
  function createText(text) {
    const p = document.createElement("p");
    p.innerHTML = text;
    app.appendChild(p);
    return p; // Return the created element
  }

  // Create a code output in the terminal
  function createCode(code, text) {
    const p = document.createElement("p");
    p.setAttribute("class", "code");
    p.innerHTML = `${code} <br/><span class='text'> ${text} </span>`;
    app.appendChild(p);
  }

  // Define the functions that handle terminal minimize, close, and open
  const handleTerminalMinimize = () => {
    myTerminalContainer.style.display = "none";
    terminalTaskbarIcon.style.display = "flex";
  };

  const handleCloseTerminal = () => {
    myTerminalContainer.style.display = "none";
    terminalTaskbarIcon.style.display = "none";
  };

  const handleTerminalOpen = () => {
    console.log("Opening terminal");
    myTerminalContainer.style.display = "block"; // Show the terminal
    open_terminal(); // Trigger the terminal opening logic
  };

  // Terminal event handlers
  openTerminalIcon.addEventListener("click", handleTerminalOpen);
  minimizeTerminal.addEventListener("click", handleTerminalMinimize);
  closeTerminal.addEventListener("click", handleCloseTerminal);
});
