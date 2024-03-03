window.addEventListener("load", () => {
    var canvas = document.querySelector('viewport');
    //resizing it to fit the dimensions of the screen
    canvas.width = window.innterwidth;
    canvas.height = window.innerHeight;
    
    console.log('viewport');
})


// Get the canvas element
const ctx = document.getElementById('myChart').getContext('2d');

// Create the chart
const myChart = new Chart(ctx, {
    type: 'line', // Specify the type of chart (line, bar, pie, etc.)
    data: chartData, // Pass the chart data
    options: chartOptions // Pass the chart options
});