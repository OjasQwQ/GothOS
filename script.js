    function updateTime() {
    var currentTime = new Date().toLocaleString();
    var timeText = document.querySelector("#timeElement");
    if (timeText) {
        timeText.innerHTML = currentTime;
    }
    }
    setInterval(updateTime, 1000);

    var selectedIcon = undefined;

    function selectIcon(element) {
        if (!element) {
            return;
        }

        if (selectedIcon) {
            selectedIcon.classList.remove("selected");
        }

        element.classList.add("selected");
        selectedIcon = element;
    }

//  Heading Click _______________________________________________________________________________________________________________________________
    var homescreen = document.getElementById("home-screen");
    if (homescreen) {
        homescreen.addEventListener("click", function() {
            window.location.href = "OS.html";
        });
    }

//  Music Window (Dragability)___________________________________________________________________________________________________________________
    var musicScreen = document.getElementById("musicwindow");
    var musicScreenHeader = document.getElementById("musicwindowheader");
    if (musicScreen && musicScreenHeader) {
        dragElement(musicScreen, musicScreenHeader);
    }

    function dragElement(element, handle) {
        var initialX = 0;
        var initialY = 0;
        var currentX = 0;
        var currentY = 0;

        handle.onmousedown = startDragging;

        function startDragging(e) {
            e = e || window.event;
            e.preventDefault();
            initialX = e.clientX;
            initialY = e.clientY;
            document.onmouseup = stopDragging;
            document.onmousemove = moveElement;
        }

        function moveElement(e) {
            e = e || window.event;
            e.preventDefault();
            currentX = initialX - e.clientX;
            currentY = initialY - e.clientY;
            initialX = e.clientX;
            initialY = e.clientY;
            element.style.top = (element.offsetTop - currentY) + "px";
            element.style.left = (element.offsetLeft - currentX) + "px";
        }

        function stopDragging() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

//  Music Window (Opening & Closing) _______________________________________________________________________________________________________
    function closeWindow(element, icon) {
        element.style.display = "none";

        if (icon) {
            icon.classList.remove("selected");
            if (selectedIcon === icon) {
                selectedIcon = undefined;
            }
        }
    }

    function openWindow(element, icon) {
        element.style.display = "flex";
        selectIcon(icon);
        bringWindowToFront(element);
    }

    var musicScreenClose = document.querySelector("#musiclose");
    var musicScreenOpen = document.querySelector("#musicopen");

    if (musicScreenClose && musicScreen) {
        musicScreenClose.addEventListener("click", function() {
            closeWindow(musicScreen, musicScreenOpen);
        });
    }

    if (musicScreenOpen && musicScreen) {
        musicScreenOpen.addEventListener("click", function() {
            openWindow(musicScreen, musicScreenOpen);
        });
    }

// Notes Window (Dragability)____________________________________________________________________________________________________________________________________
    var notesScreen = document.getElementById("noteswindow");
    var notesScreenHeader = document.getElementById("noteswindowheader");
    if (notesScreen && notesScreenHeader) {
        dragElement(notesScreen, notesScreenHeader);
    }

    function dragElement(element, handle) {
        var initialX = 0;
        var initialY = 0;
        var currentX = 0;
        var currentY = 0;

        handle.onmousedown = startDragging;

        function startDragging(e) {
            e = e || window.event;
            e.preventDefault();
            initialX = e.clientX;
            initialY = e.clientY;
            document.onmouseup = stopDragging;
            document.onmousemove = moveElement;
        }

        function moveElement(e) {
            e = e || window.event;
            e.preventDefault();
            currentX = initialX - e.clientX;
            currentY = initialY - e.clientY;
            initialX = e.clientX;
            initialY = e.clientY;
            element.style.top = (element.offsetTop - currentY) + "px";
            element.style.left = (element.offsetLeft - currentX) + "px";
        }

        function stopDragging() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

// Notes Window (Open & Close) ___________________________________________________________________________________________________

    var notesScreenClose = document.querySelector("#notesclose");
    var notesScreenOpen = document.querySelector("#notesopen");

    if (notesScreenClose && notesScreen) {
        notesScreenClose.addEventListener("click", function() {
            closeWindow(notesScreen, notesScreenOpen);
        });
    }
    if (notesScreenOpen && notesScreen) {
        notesScreenOpen.addEventListener("click", function() {
            openWindow(notesScreen, notesScreenOpen);
        });
    }

// Calculator Logic _________________________________________________________________________________________________________
    

    var currentOperandElement = document.getElementById("current-operand");
    var previousOperandElement = document.getElementById("previous-operand");
    var calcState = {
        previousOperand: "",
        currentOperand: "0",
        operator: null,
        shouldResetScreen: false
    };

    function formatCalculatorResult(value) {
        if (!Number.isFinite(value)) {
            return "Error";
        }

        return Number(value.toFixed(12)).toString();
    }

    function updateCalculatorDisplay() {
        if (previousOperandElement) {
            previousOperandElement.textContent = calcState.previousOperand && calcState.operator
                ? calcState.previousOperand + " " + calcState.operator
                : "";
        }

        if (currentOperandElement) {
            currentOperandElement.textContent = calcState.currentOperand || "0";
        }
    }

    function clearScreen() {
        calcState.previousOperand = "";
        calcState.currentOperand = "0";
        calcState.operator = null;
        calcState.shouldResetScreen = false;
        updateCalculatorDisplay();
    }

    function deleteLast() {
        if (calcState.shouldResetScreen) {
            clearScreen();
            return;
        }

        if (calcState.currentOperand === "" || calcState.currentOperand === "0") {
            calcState.currentOperand = "0";
            updateCalculatorDisplay();
            return;
        }

        calcState.currentOperand = calcState.currentOperand.slice(0, -1);
        if (calcState.currentOperand === "") {
            calcState.currentOperand = "0";
        }

        updateCalculatorDisplay();
    }

    function appendNumber(number) {
        if (calcState.shouldResetScreen) {
            calcState.currentOperand = "";
            calcState.shouldResetScreen = false;
        }

        if (number === "0" && calcState.currentOperand === "0") {
            return;
        }

        if (calcState.currentOperand === "0") {
            calcState.currentOperand = number;
        } else {
            calcState.currentOperand += number;
        }

        updateCalculatorDisplay();
    }

    function appendDecimal() {
        if (calcState.shouldResetScreen) {
            calcState.currentOperand = "0";
            calcState.shouldResetScreen = false;
        }

        if (calcState.currentOperand.includes(".")) {
            return;
        }

        calcState.currentOperand = calcState.currentOperand ? calcState.currentOperand + "." : "0.";
        updateCalculatorDisplay();
    }

    function appendOperator(value) {
        if (calcState.currentOperand === "" && !calcState.previousOperand && value !== "-") {
            return;
        }

        if (calcState.currentOperand === "" && value === "-") {
            calcState.currentOperand = "-";
            updateCalculatorDisplay();
            return;
        }

        if (calcState.previousOperand && calcState.operator && !calcState.shouldResetScreen) {
            calculate();
        }

        calcState.previousOperand = calcState.currentOperand || "0";
        calcState.operator = value;
        calcState.currentOperand = "";
        calcState.shouldResetScreen = false;
        updateCalculatorDisplay();
    }

    function calculate() {
        if (!calcState.operator || calcState.currentOperand === "" || calcState.previousOperand === "") {
            return;
        }

        var previousValue = parseFloat(calcState.previousOperand);
        var currentValue = parseFloat(calcState.currentOperand);

        if (Number.isNaN(previousValue) || Number.isNaN(currentValue)) {
            return;
        }

        var result;

        switch (calcState.operator) {
            case "+":
                result = previousValue + currentValue;
                break;
            case "-":
                result = previousValue - currentValue;
                break;
            case "*":
                result = previousValue * currentValue;
                break;
            case "/":
                result = currentValue === 0 ? Number.POSITIVE_INFINITY : previousValue / currentValue;
                break;
            case "%":
                result = currentValue === 0 ? Number.NaN : previousValue % currentValue;
                break;
            default:
                return;
        }

        calcState.currentOperand = formatCalculatorResult(result);
        calcState.previousOperand = "";
        calcState.operator = null;
        calcState.shouldResetScreen = true;
        updateCalculatorDisplay();
    }

    window.clearScreen = clearScreen;
    window.deleteLast = deleteLast;
    window.appendNumber = appendNumber;
    window.appendDecimal = appendDecimal;
    window.appendOperator = appendOperator;
    window.calculate = calculate;

    updateCalculatorDisplay();

// Calculator Window (Dragability)____________________________________________________________________________________________
    var calcScreen = document.getElementById("calc-window");
    var calcScreenHeader = document.getElementById("calcwindow-header");
    if (calcScreen && calcScreenHeader) {
        dragElement(calcScreen, calcScreenHeader);
    }

    function dragElement(element, handle) {
        var initialX = 0;
        var initialY = 0;
        var currentX = 0;
        var currentY = 0;

        handle.onmousedown = startDragging;

        function startDragging(e) {
            e = e || window.event;
            e.preventDefault();
            initialX = e.clientX;
            initialY = e.clientY;
            document.onmouseup = stopDragging;
            document.onmousemove = moveElement;
        }

        function moveElement(e) {
            e = e || window.event;
            e.preventDefault();
            currentX = initialX - e.clientX;
            currentY = initialY - e.clientY;
            initialX = e.clientX;
            initialY = e.clientY;
            element.style.top = (element.offsetTop - currentY) + "px";
            element.style.left = (element.offsetLeft - currentX) + "px";
        }

        function stopDragging() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

// Calculator Window ( Openning & Closing)______________________________________________________________________________________

    var calcScreenClose = document.querySelector("#calcclose");
    var calcScreenOpen = document.querySelector("#calcopen");

    if (calcScreenClose && calcScreen) {
        calcScreenClose.addEventListener("click", function() {
            closeWindow(calcScreen, calcScreenOpen);
        });
    }
    if (calcScreenOpen && calcScreen) {
        calcScreenOpen.addEventListener("click", function() {
            openWindow(calcScreen, calcScreenOpen);
        });
    }


// Bringing the window to the foreground_______________________________________________________________________________________-_-

    var topBar = document.querySelector(".taskbar");
    var biggestIndex = 1;

    function bringWindowToFront(element) {
        biggestIndex++;
        element.style.zIndex = biggestIndex;
        topBar.style.zIndex = biggestIndex + 1;
    }

    function addWindowTapHandling(element) {
        if (element) {
            element.addEventListener("mousedown", function() {
                bringWindowToFront(element);
            });
        }
    }

    addWindowTapHandling(musicScreen);
    addWindowTapHandling(notesScreen);
    addWindowTapHandling(calcScreen);

// Storing Objects ______________________________________________________________________________________________

var content = [
    {
    title: "Welcome",
    content: `
        <p contenteditable="True" style="word-spacing: 2px; line-height: 1.5">
        Welcome to RockOS!
        This is a Rock/Grunge/Goth theme based webOS (made by a poser) which I've been working on for quite some time now.
        </p>
        `
    },

    {
    title: "Introduction",
    content: `
        <p contenteditable="True" style="word-spacing: 2px; line-height: 1.5;">
        Hi! I'm Ojas.
        I'm a student leader and aspiring entrepreneur with a passion for STEM with Mechatronics and Astronomy as my core interests.
        I enjoy building, exploring & continuously learning through hands-on engineering and problem-solving.
        Beyond technology, I'm inspired by rock and alternative music, philosophy and other forms of art.
        </p>
        `
    }

]

function setNotesContent(index) {
  var note = content[index];
  var notesTitle = document.querySelector("#notesTitle");
  var notesContent = document.querySelector("#notesContent");

  notesTitle.textContent = note.title;
  notesContent.innerHTML = note.content;
}
setNotesContent(0)

function addToSideBar(index) {
    var sidebar = document.querySelector(".sidebar");
    var note = content[index];
    var newDiv = document.createElement("div");
    newDiv.textContent = note.title;
    newDiv.addEventListener("click",function() {
        setNotesContent(index);

    audio.currentTime=0;
    audio.play()
    });
    sidebar.appendChild(newDiv);
}

for (let i = 0; i < content.length; i++) {
    addToSideBar(i);
}

const audio = new Audio('Media/page-flip-01a.mp3');

// Google Search ____________________________________________________________________________________

document.getElementById('googleSearchForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    const query = document.getElementById('searchInput').value.trim();

    if (query) {
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        window.open(searchUrl,'_blank',);
        document.getElementById('searchInput').value = '';
    }
});

// To-Do__________________________________________________________________________________________________

// To-Do Window ____________________________________________________________________________________

var todoScreen = document.getElementById("todo-window");
var todoScreenHeader = document.getElementById("todowindow-header");
var todoScreenClose = document.querySelector("#todoclose");
var todoScreenOpen = document.querySelector("#todoopen");
var todoForm = document.getElementById("todoForm");
var todoInput = document.getElementById("todoInput");
var todoList = document.getElementById("todoList");

var todos = [];
try {
    todos = JSON.parse(localStorage.getItem("gothos-todos")) || [];
} catch (e) {
    todos = [];
}

function saveTodos() {
    try {
        localStorage.setItem("gothos-todos", JSON.stringify(todos));
    } catch (e) {}
}

function renderTodos() {
    todoList.innerHTML = "";

    todos.forEach(function(todo, index) {
        var li = document.createElement("li");
        li.className = "todo-item" + (todo.done ? " done" : "");

        var label = document.createElement("span");
        label.textContent = todo.text;
        label.addEventListener("click", function() {
            todos[index].done = !todos[index].done;
            saveTodos();
            renderTodos();
        });

        var remove = document.createElement("button");
        remove.type = "button";
        remove.textContent = "×";
        remove.setAttribute("aria-label", "Delete task");
        remove.addEventListener("click", function() {
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
        });

        li.appendChild(label);
        li.appendChild(remove);
        todoList.appendChild(li);
    });
}

if (todoForm) {
    todoForm.addEventListener("submit", function(event) {
        event.preventDefault();
        var text = todoInput.value.trim();
        if (!text) {
            return;
        }
        todos.push({ text: text, done: false });
        todoInput.value = "";
        saveTodos();
        renderTodos();
    });
}

if (todoScreen && todoScreenHeader) {
    dragElement(todoScreen, todoScreenHeader);
}

if (todoScreenClose && todoScreen) {
    todoScreenClose.addEventListener("click", function() {
        closeWindow(todoScreen, todoScreenOpen);
    });
}

if (todoScreenOpen && todoScreen) {
    todoScreenOpen.addEventListener("click", function() {
        openWindow(todoScreen, todoScreenOpen);
    });
}

addWindowTapHandling(todoScreen);
renderTodos();

// Mouse following pet ___________________________________________________________________________________

const bat = document.getElementById('bat');

if (bat) {
    const cursorOffsetX = 24;
    const cursorOffsetY = 30;
    const speed = 0.09;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let batX = mouseX + cursorOffsetX;
    let batY = mouseY + cursorOffsetY;

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    window.addEventListener('mousemove', (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });

    function animate() {
        const maxX = Math.max(0, window.innerWidth - bat.offsetWidth);
        const maxY = Math.max(0, window.innerHeight - bat.offsetHeight);
        const targetX = clamp(mouseX + cursorOffsetX, 0, maxX);
        const targetY = clamp(mouseY + cursorOffsetY, 0, maxY);

        batX += (targetX - batX) * speed;
        batY += (targetY - batY) * speed;

        let tilt = 0;
        let facingLeft = false;
        for (let i = 0; i < 3; i++) {
            const centerX = batX + bat.offsetWidth / 2;
            const centerY = batY + bat.offsetHeight / 2;
            facingLeft = mouseX < centerX;
            tilt = Math.atan2(mouseY - centerY, Math.abs(mouseX - centerX));
            tilt = clamp(tilt, -Math.PI / 4, Math.PI / 4);

            const rotatedWidth = Math.abs(bat.offsetWidth * Math.cos(tilt)) +
                Math.abs(bat.offsetHeight * Math.sin(tilt));
            const rotatedHeight = Math.abs(bat.offsetWidth * Math.sin(tilt)) +
                Math.abs(bat.offsetHeight * Math.cos(tilt));
            const minX = (rotatedWidth - bat.offsetWidth) / 2;
            const minY = (rotatedHeight - bat.offsetHeight) / 2;
            const maxX = window.innerWidth - (rotatedWidth + bat.offsetWidth) / 2;
            const maxY = window.innerHeight - (rotatedHeight + bat.offsetHeight) / 2;

            batX = clamp(batX, minX, maxX);
            batY = clamp(batY, minY, maxY);
        }

        const centerX = batX + bat.offsetWidth / 2;
        const centerY = batY + bat.offsetHeight / 2;
        facingLeft = mouseX < centerX;
        tilt = clamp(
            Math.atan2(mouseY - centerY, Math.abs(mouseX - centerX)),
            -Math.PI / 4,
            Math.PI / 4
        );

        bat.style.left = `${batX}px`;
        bat.style.top = `${batY}px`;
        bat.style.transform = `rotate(${facingLeft ? -tilt : tilt}rad) scaleX(${facingLeft ? -1 : 1})`;

        requestAnimationFrame(animate);
    }

    animate();
}
