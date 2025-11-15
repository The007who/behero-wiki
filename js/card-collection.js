
function playSound(path) {
    let audio = new Audio(BASE_URL + '/resources/cards/' + path);
    console.log(BASE_URL + '/resources/cards/' + path);
    audio.play();
}

