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


