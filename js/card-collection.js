
function playSound(path) {
    let audio = new Audio(BASEURL + '/resources/cards/' + path);
    audio.play();
}

