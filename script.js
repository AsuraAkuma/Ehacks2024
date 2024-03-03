const selectKingButton = document.getElementById("king-button"); 
const selectEndlessButton = document.getElementById("endless-button"); 
const selectTimedButton = document.getElementById("timed-button"); 
const startButton = document.getElementById("start-button"); 


window.addEventListener("load", () => {
    // var canvas = document.querySelector('viewport');
    // //resizing it to fit the dimensions of the screen
    // // canvas.width = window.innterwidth;
    // // canvas.height = window.innerHeight;
    
    // console.log('viewport');
    let currentOption = null;

    selectKingButton.addEventListener("click",()=>{
        if(currentOption !== null) {
            selectKingButton.style.color = "white";
        }  
        selectKingButton.style.color = "gray";
        selectEndlessButton.style.color = "white";
        selectTimedButton.style.color = "white";
        currentOption = "king";
        
     }) 
     selectEndlessButton.addEventListener("click",()=>{
        if(currentOption !== null) {
            selectEndlessButton.style.color = "white";
        }  
        selectKingButton.style.color = "white";
        selectEndlessButton.style.color = "gray";
        selectTimedButton.style.color = "white";
        currentOption = "endless";
     }) 
     selectTimedButton.addEventListener("click",()=>{
        if(currentOption !== null) {
            selectTimedButton.style.color = "white";
        }  
        selectKingButton.style.color = "white";
        selectEndlessButton.style.color = "white";
        selectTimedButton.style.color = "gray";
        currentOption = "timed";
     }) 
     startButton.addEventListener("click",()=>{
        if(currentOption === null) {
            alert("No game mode selected!")
            return;
        }  
        console.log(currentOption)
        // window.location.pathname = "./Stocks.html"
    }) 

})


// // Get the canvas element
// const ctx = document.getElementById('myChart').getContext('2d');

// // Create the chart
// const myChart = new Chart(ctx, {
//     type: 'line', // Specify the type of chart (line, bar, pie, etc.)
//     data: chartData, // Pass the chart data
//     options: chartOptions // Pass the chart options
// });