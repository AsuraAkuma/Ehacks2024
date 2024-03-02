// Variables
const canvas = document.getElementById('CANVAS');
const body = document.getElementById('body');
// import config from './config.json' assert { type: "json" };
const ctx = canvas.getContext("2d");

// Page load event listener
body.addEventListener('click', (event) => {
    console.log(event.target.id.split("-")[2])
});


function createLine(x1, y1, x2, y2, color, width) {
    ctx.beginPath()
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
};