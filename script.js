window.addEventListener("load", () => {
    var canvas = document.querySelector('viewport');
    //resizing it to fit the dimensions of the screen
    canvas.width = window.innterwidth;
    canvas.height = window.innerHeight;
    
    console.log('viewport');
})
