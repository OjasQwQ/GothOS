let state = false;
let btn = document.querySelector(".btn");
let record = document.querySelector(".record");
let toneArm = document.querySelector(".tone-arm");
let song = document.querySelector(".my-song");
let slider = document.querySelector(".slider");
let nxtbtn= document.querySelector(".nextbtn");
let backbtn= document.querySelector(".backbtn");

if (btn && record && toneArm && song && slider) {
  btn.addEventListener("click", () => {
    if (state === false) {
      record.classList.add("on");
      toneArm.classList.add("play");
      setTimeout(() => {
        song.play().catch(() => {});
      }, 1000);
    } else {
      record.classList.remove("on");
      toneArm.classList.remove("play");
      song.pause();
    }
    state = !state;
  });

  slider.addEventListener("input", (e) => {
    song.volume = Number(e.target.value);
  });
}

nxtbtn.addEventListener("click", () => {
  record.style.backgroundImage= 'url("Media/Gramophone_Vinyl_LP_Record_PNG_Transparent_Clip_Art_Image.png")';
  Audio= 'url("Media/My_Own_Summer.mp3")';
});
backbtn.addEventListener("click", () => {
  record.style.backgroundImage= 'url("Media/CD1.png")';
  Audio= 'url("Media/My_Own_Summer.mp3")';
});