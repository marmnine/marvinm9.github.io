let wrapper = document.getElementsByClassName("wrapper")[0];
let audio = new Audio('sound/noise.mp3');
audio.volume = 0.1;

let oldTextColor = wrapper.style.color;
let oldBorderColor = wrapper.style.borderColor;

let newTextColor = "red";
let newBorderColor = "#e3e322";

function animate() {
    if (wrapper.style.color === oldTextColor) {
        audio.play();
        wrapper.style.borderColor = newBorderColor;
        wrapper.style.color = newTextColor;
    } else {
        audio.pause();
        audio.currentTime = 0;
        wrapper.style.borderColor = oldBorderColor;
        wrapper.style.color = oldTextColor;
    }
}

window.setInterval(animate, 850);
