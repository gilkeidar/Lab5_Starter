// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
    const synth = window.speechSynthesis;
    const dropDown = document.querySelector("#voice-select");
    const smileyFace = document.querySelector("img");
    const textArea = document.querySelector("#text-to-speak");
    const talkButton = document.querySelector("button");


    //  Get speech synthesis voices once page is loaded
    window.addEventListener("load", e => {
        //console.log(e);

        //  Get voices
        let voices = synth.getVoices();

        //console.log(voices)

        //  Populate "Select Voice" dropdown
        let id = 0;
        voices.forEach(voice => {
            //  Create new option element for each voice
            let newVoice = document.createElement("option");
            newVoice.value = id++;
            newVoice.innerHTML = voice.name;

            //  Add option element to drop down
            dropDown.appendChild(newVoice);
            //console.log(voice);
        });

        //  On click, speak words
        talkButton.addEventListener("click", e => {
            //console.log(e);

            //  Get text to speak
            let text = textArea.value;

            //  Find voice
            let selectedVoiceID = dropDown.selectedOptions[0].value;

            //  If no voice selected, return
            if (selectedVoiceID == "select")
            {
                return;
            }

            //  Get voice
            let voice = voices[selectedVoiceID];
            
            //console.log(selectedVoiceID);
            //console.log("selected voice:", voice);

            //  Create new utterance
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.voice = voice;
            utterance.lang = voice.lang;
            synth.speak(utterance);

            //console.log(utterance);

            //  Set smiley face image to speak
            utterance.addEventListener("start", e => {
                smileyFace.src = "assets/images/smiling-open.png";
            });

            utterance.addEventListener("end", e => {
                smileyFace.src = "assets/images/smiling.png";
            });
        });
    });
}