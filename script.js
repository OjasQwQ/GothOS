    function updateTime() {
    var currentTime = new Date().toLocaleString();
    var timeText = document.querySelector("#timeElement");
    if (timeText) {
        timeText.innerHTML = currentTime;
    }
    }
    setInterval(updateTime, 1000);

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
    function closeWindow(element) {
        element.style.display = "none";
    }

    function openWindow(element) {
        element.style.display = "flex";
    }

    var musicScreenClose = document.querySelector("#musiclose");
    var musicScreenOpen = document.querySelector("#musicopen");

    if (musicScreenClose && musicScreen) {
        musicScreenClose.addEventListener("click", function() {
            closeWindow(musicScreen);
        });
    }
    if (musicScreenOpen && musicScreen) {
        musicScreenOpen.addEventListener("click", function() {
            openWindow(musicScreen);
        });
    }

//____________________________________________________________________________________________________________________________________
