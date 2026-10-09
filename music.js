const btn = document.querySelector(".btn");
const record = document.querySelector(".record");
const toneArm = document.querySelector(".tone-arm");
const song = document.querySelector(".my-song");
const slider = document.querySelector(".slider");
const nextButton = document.querySelector(".nextbtn");
const backButton = document.querySelector(".backbtn");

const tracks = [
  {
    src: "Media/My_Own_Summer.mp3",
    cover: "Media/CD1.png"
  },
  {
    src: "Media/Your_face.mp3",
    cover: "Media/Gramophone_Vinyl_LP_Record_PNG_Transparent_Clip_Art_Image.png"
  }
];
let currentTrack = 0;

if (btn && record && toneArm && song && slider && nextButton && backButton) {
  const updatePlaybackState=(isPlaying) => {
    record.classList.toggle("on", isPlaying);
    toneArm.classList.toggle("play", isPlaying);
    btn.setAttribute("aria-label", isPlaying ? "Pause playback" : "Play playback");
    btn.setAttribute("aria-pressed", String(isPlaying));
  };

  const playSong= () => {
    song.play().catch((error) => {
      updatePlaybackState(false);
      console.error("Unable to play the selected track:", error);
    });
  };

  //Changes the music track playing && its img src respectively.
  const changeTrack = (direction) => {
    const wasPlaying = !song.paused;                                                // Song is playing
    currentTrack = (currentTrack + direction + tracks.length) % tracks.length;      // Formula to calculate the next track. If on 3rd track, current track = 1 when proceeded
    song.src = tracks[currentTrack].src;
    record.style.backgroundImage = `url("${tracks[currentTrack].cover}")`;

    if (wasPlaying) {
      playSong();
    }
  };

  song.volume = Number(slider.value);
  updatePlaybackState(false);

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
