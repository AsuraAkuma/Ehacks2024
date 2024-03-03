// get canvas elements
const canvas1 = document.getElementById('canvas1');
const canvas2 = document.getElementById('canvas2');
const canvas3 = document.getElementById('canvas3');
const canvas4 = document.getElementById('canvas4');

// get 2D contexts
const ctx1 = canvas1.getContext('2d');
const ctx2 = canvas2.getContext('2d');
const ctx3 = canvas3.getContext('2d');
const ctx4 = canvas4.getContext('2d');

// sidemenu
const sidemenuBuy = document.getElementById("sideMenu-buy");
const sidemenuBuyList = document.getElementById("sideMenu-list-buy");
const sidemenuSellList = document.getElementById("sideMenu-list-sell");

const buyButton = document.getElementById("multipButton-buy");
const sellButton = document.getElementById("multipButton-sell");
const multipButtonBuy = document.getElementById("multipButton-multip-buy");
const multipButtonSell = document.getElementById("multipButton-multip-sell");

// multiplication selector
var currMultipBuy = 0;
var currMultipSell = 0;
const multipVals = ['1', '5', '10', 'All'];
var multipBuys = [1, 5, 10, (capital / 100)]

// init capital
var capital = 1000;

// currentOption
var currentOption = null;
var currentStock = null;

let optionList = [];
let stockList = [];

// Page load event listener
window.addEventListener('load', (event) => {
    var capitalTxt = document.getElementById("capital");
    capitalTxt.innerHTML = `Capital: ${capital}`;
    let currentOption = null;
    optionList = generateOptionList();
    generateBuyOptions(optionList);
    sellButton.addEventListener('click', () => {
        sell();
    })

    multipButtonBuy.addEventListener('click', () => {
        multiplier("multipButton-multip-buy");
    })

    multipButtonSell.addEventListener('click', () => {
        multiplier("multipButton-multip-sell");
    })

    function generateOptionList() {
        let list = ['Option 1', 'Option 2', 'Option 3']

        return list
    }

    function generateBuyOptions(options) {
        sidemenuBuyList.innerHTML = "";
        options.forEach((option) => {
            const item = document.createElement("li");
            item.className = "sideMenu-list-optionButton";
            item.id = `sideMenu-list-optionButton-${option}`;
            sidemenuBuyList.appendChild(item);
            const text = document.createElement("h2");
            text.className = "sideMenu-list-optionButton-text";
            text.innerHTML = option;
            item.appendChild(text);
            item.addEventListener('click', () => {
                if (currentOption !== null) {
                    const oldItem = document.getElementById(`sideMenu-list-optionButton-${currentOption}`);
                    oldItem.style.boxShadow = "";
                }
                currentOption = option
                item.style.boxShadow = "inset 5px 5px 2px 2px rgb(87, 79, 79)";
            });
        });
    }

    buyButton.addEventListener('click', () => {

        buy(currentOption);
    });

    function generateSellOptions(stocks) {
        if (stocks[stocks.length - 1] === null) {
            stocks.splice(stocks.length - 1, 1);
            capital = capital + (multipBuys[currMultipBuy] * 100);
            return;
        }
        sidemenuSellList.innerHTML = "";
        stocks.forEach((stock) => {
            const item = document.createElement("li");
            item.className = "sideMenu-list-optionButton";
            item.id = `sideMenu-list-optionButton-${stock}`;
            sidemenuSellList.appendChild(item);
            const text = document.createElement("h2");
            text.className = "sideMenu-list-optionButton-text";
            text.innerHTML = stock;
            item.appendChild(text);
            item.addEventListener('click', () => {
                if (currentStock !== null) {
                    const oldItem = document.getElementById(`sideMenu-list-optionButton-${currentStock}`);
                    oldItem.style.boxShadow = "";
                }
                item.style.boxShadow = "inset 5px 5px 2px 2px rgb(87, 79, 79)";
                currentStock = stock;
            });
        });
    }

    function buy(stock) {
        if (stockList.length === 4) {
            alert("You have the maximum number of stocks.");
            return;
        }
        stockList.push(stock);
        generateSellOptions(stockList);
        generateBuyOptions(optionList);
        multipBuys = [1, 5, 10, (capital / 100)]
        var numStocks = multipBuys[currMultipBuy];
        capital = capital - (100 * numStocks);
        capitalTxt.innerHTML = `Capital: ${capital}`;
    }

    function sell() {

    }

    function multiplier(elemID) {
        if (elemID === 'multipButton-multip-buy') {
            currMultipBuy++;
            if (currMultipBuy > 3) {
                currMultipBuy = 0;
            }
            let item = document.getElementById('multipButton-multip-buy');
            item.value = `x${multipVals[currMultipBuy]}`;
        }
        else {
            currMultipSell++;
            if (currMultipSell > 3) {
                currMultipSell = 0;
            }
            let item = document.getElementById('multipButton-multip-sell');
            item.value = `x${multipVals[currMultipSell]}`;
        }
    }

    function updateGraphs(ctx, x1, y1, x2, y2, color, width) {
        canvasList.forEach((ctx) => {
            ctx.beginPath()
            ctx.moveTo(0, startVal);
            ctx.lineTo(prevx + 4, y2);
            ctx.strokeStyle = color;
            ctx.lineWidth = width;
            ctx.stroke();
        });
    };

    function updateGraphs(canvasList) {
        canvasList.forEach((ctx) => {
            ctx.moveTo(prevx, prevy);
            ctx.lineTo(prevx + 4, y2);
        });
    }

    function run(condition) {
        while (!(condition)) {
            setInterval(updateGraphs(), 4000)
        }
    }
});

run();