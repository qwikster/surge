function getNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function surge() {
    var number = document.getElementById("number");
    var pick = getNum(0, 9999);
    String(pick).padStart(4, "0");
    number.textContent = pick;
}