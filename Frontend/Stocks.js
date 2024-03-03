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
var currentBuyOption = null;
var currentSellOption = null;

let optionList = [];
let stockList = [];
let stockObjList = [];

// Page load event listener
window.addEventListener('load', (event) => {
    var capitalTxt = document.getElementById("capital");
    capitalTxt.innerHTML = `Capital: ${capital}`;
    optionList = generateOptionList();
    generateBuyOptions(optionList);

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
            item.id = `sideMenu-list-optionButton-buy-${option}`;
            sidemenuBuyList.appendChild(item);
            const text = document.createElement("h2");
            text.className = "sideMenu-list-optionButton-text";
            text.innerHTML = option;
            item.appendChild(text);
            item.addEventListener('click', () => {
                if (currentBuyOption !== null) {
                    const oldItem = document.getElementById(`sideMenu-list-optionButton-buy-${currentBuyOption}`);
                    oldItem.style.boxShadow = "";
                }
                currentBuyOption = option
                item.style.boxShadow = "inset 5px 5px 2px 2px rgb(87, 79, 79)";
            });
        });
    }

    buyButton.addEventListener('click', () => {
        buy(currentBuyOption);
    });

    sellButton.addEventListener('click', () => {
        sell(currentSellOption);
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
            item.id = `sideMenu-list-optionButton-sell-${stock}`;
            sidemenuSellList.appendChild(item);
            const text = document.createElement("h2");
            text.className = "sideMenu-list-optionButton-text";
            text.innerHTML = stock;
            item.appendChild(text);
            item.addEventListener('click', () => {
                if (currentSellOption !== null) {
                    const oldItem = document.getElementById(`sideMenu-list-optionButton-sell-${currentSellOption}`);
                    oldItem.style.boxShadow = "";
                }
                //console.log(currentSellOption);
                item.style.boxShadow = "inset 5px 5px 2px 2px rgb(87, 79, 79)";
                currentSellOption = stock;
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

        const stockObj = {
            name: `${stock}`,
            currStockVal: 100,
            num: numStocks,
            prevX: 0,
            prevY: 0
        }

        stockObjList.push(stockObj);
    }

    function sell(currentSellOption) {
        if (currentSellOption === null) {
            return;
        }
        var chosenObj;
        stockObjList.forEach(currStockObj => {
            if (currStockObj.name === currentSellOption) {
                chosenObj = currStockObj;
            }
        });
        var numToSell = document.getElementById("multipButton-multip-sell").value.split("x").join("");
        capital = capital + (chosenObj.currStockVal * numToSell);
        chosenObj.num = chosenObj.num - numToSell;
        document.getElementById("capital").innerHTML = `Capital: ${capital}`
        if (chosenObj.num === 0) {
            document.getElementById(`sideMenu-list-optionButton-sell-${chosenObj.name}`).remove();
            stockObjList = stockObjList.filter(s => s.name !== chosenObj.name)
            stockList = stockList.filter(s => s !== chosenObj.name)
        }
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

    function updateGraph() {
        stockObjList.forEach((stock) => {
            stock
        });
    }

    function getEvent() {

    }

    function timerStart() {
        const timer = setTimeout(() => {
            updateGraph();
            getEvent();
            timerStart();
        }, 4000);
        clearTimeout(timer);
    }
});