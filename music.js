const btn = document.querySelector(".btn");
const record = document.querySelector(".record");
const toneArm = document.querySelector(".tone-arm");
const song = document.querySelector(".my-song");
const slider = document.querySelector(".slider");
const nextButton = document.querySelector(".nextbtn");
const backButton = document.querySelector(".backbtn");
const songtitle = document.querySelector(".song_title_popup");
const music_popup = document.querySelector(".music_popup");

const tracks = [
  {
    src: "Media/My_Own_Summer.mp3",
    cover: "Media/CD1.png",
    name: "My Own Summer"
  },
  {
    src: "Media/Your_face.mp3",
    cover: "Media/Gramophone_Vinyl_LP_Record_PNG_Transparent_Clip_Art_Image.png",
    name: "Your Face"
  }
];
let currentTrack = 0;

if (btn && record && toneArm && song && slider && nextButton && backButton) {
  let popupTimeout;

  const setPopupVisible = (visible) => {
    if (!music_popup) {
      return;
    }
    clearTimeout(popupTimeout);
    music_popup.style.display = visible ? "block" : "none";

    if (visible) {
      popupTimeout = setTimeout(() => {
        music_popup.style.display = "none";
      }, 3000);
    }
  };

  const updatePlaybackState=(isPlaying) => {
    record.classList.toggle("on", isPlaying);
    toneArm.classList.toggle("play", isPlaying);
    btn.setAttribute("aria-label", isPlaying ? "Pause playback" : "Play playback");
    btn.setAttribute("aria-pressed", String(isPlaying));
    setPopupVisible(isPlaying);
  };

  const playSong= () => {
    song.play().catch((error) => {
      updatePlaybackState(false);
      console.error("Unable to play the selected track:", error);
    });
  };

  const updateTrackDisplay = () => {
    record.style.backgroundImage = `url("${tracks[currentTrack].cover}")`;
    if (songtitle) {
      songtitle.textContent = tracks[currentTrack].name;
    }
  };

  //Changes the music track playing && its img src respectively.
  const changeTrack = (direction) => {
    const wasPlaying = !song.paused;                                                // Song is playing
    currentTrack = (currentTrack + direction + tracks.length) % tracks.length;      // Formula to calculate the next track. If on 3rd track, current track = 1 when proceeded
    song.src = tracks[currentTrack].src;
    updateTrackDisplay();
    
    if (wasPlaying) {
      playSong();
    }
  };

  song.volume = Number(slider.value);
  updatePlaybackState(false);
  updateTrackDisplay();

  btn.addEventListener("click", () => {
    if (song.paused) {
      playSong();
    } else {
      song.pause();
      updatePlaybackState(false);
    }
  });

  song.addEventListener("play", () => updatePlaybackState(true));
  song.addEventListener("pause", () => updatePlaybackState(false));

  slider.addEventListener("input", () => {
    song.volume = Number(slider.value);
  });

  nextButton.addEventListener("click", () => changeTrack(1));
  backButton.addEventListener("click", () => changeTrack(-1));
}
