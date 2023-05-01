// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
    let image = document.querySelector("img");
    let select = document.querySelector("select");
    let audio = document.querySelector("audio");
    let volumeControls = document.querySelector("#volume-controls");
    let volume = volumeControls.children[0];
    let volumeImage = volumeControls.children[1];
    let playButton = document.querySelector("button");

    const jsConfetti = new JSConfetti();

    select.addEventListener("input", e => {
        let horn = e.target.value;
        image.src = `assets/images/${horn}.svg`;
        audio.src = `assets/audio/${horn}.mp3`;
    });

    volume.addEventListener("input", e => {
        let sliderValue = e.target.value;
        audio.volume = sliderValue / 100;
        if (sliderValue == 0) {
            volumeImage.src = "assets/icons/volume-level-0.svg";
        }
        else if (sliderValue < 33)
        {
            volumeImage.src = "assets/icons/volume-level-1.svg";
        }
        else if (sliderValue < 67)
        {
            volumeImage.src = "assets/icons/volume-level-2.svg";
        }
        else
        {
            volumeImage.src = "assets/icons/volume-level-3.svg";
        }
    });

    playButton.addEventListener("click", e => {
        if (select.value != "select")
        {
            audio.play();
            if (select.value == "party-horn")
            {
                jsConfetti.addConfetti();
            }
        } 
    });
}