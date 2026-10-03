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
    var heading = document.getElementById("heading");
    if (heading) {
        heading.addEventListener("click", function() {
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
