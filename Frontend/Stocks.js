import config from '../Pages/config.json' assert { type: "json" };


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
// init capital
var capital = 1000;
const multipVals = ['1', '5', '10', 'All'];
var multipBuys = [1, 5, 10, Math.floor(capital / 100)]



let optionList = [];
let stockList = [];
let stockObjList = [];

// Company names
function getNames(count) {
    fetch(`${config.apiUri}/api/data/getnames?` + new URLSearchParams({ count: count })).then((result) => {
        return result.json();
    }).then((response) => {
        return response.names;
    });
}

// Page load event listener
window.addEventListener('load', (event) => {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    let accessToken;
    let tokenType;
    let gameStarted = false;
    let gameMode = "endless";
    let gameOver = false;
    if (fragment.toString() !== '') {
        document.cookie = `accessToken=${fragment.get('access_token;path=/')}`;
        document.cookie = `tokenType=${fragment.get('token_type')};path=/`;
        window.location.href = `${window.location.origin}${window.location.pathname}`;
    } else {
        document.cookie.split(";").forEach((cookie) => {
            const name = cookie.split(" ").join("").split("=")[0];
            const value = cookie.split(" ").join("").split("=")[1];
            if (name === 'accessToken') {
                accessToken = value;
            } else if (name === 'tokenType') {
                tokenType = value;
            } else if (name === 'mode') {
                gameMode = value;
            };
        })
    }
    fetch('https://discord.com/api/users/@me', {
        headers: {
            authorization: `${tokenType} ${accessToken}`,
        },
    }).then((result) => {
        return result.json()
    }).then((response) => {
        const { id, username, avatar, email, banner_color, mfa_enabled, verified, locale } = response;
        fetch(`${config.apiUri}/api/ingame-events/getId`, {
            headers: new Headers({
                "ngrok-skip-browser-warning": "69420",
            })
        }).then((result) => {
            return result.json();
        }).then((response) => {
            const { gameId } = response;

            // currentOption
            let currentBuyOption = null;
            let currentSellOption = null;
            var capitalTxt = document.getElementById("capital");
            capitalTxt.innerHTML = `Capital: ${capital}`;
            generateBuyOptions();

            multipButtonBuy.addEventListener('click', () => {
                multiplier("multipButton-multip-buy");
            })

            multipButtonSell.addEventListener('click', () => {
                multiplier("multipButton-multip-sell");
            })


            function generateBuyOptions() {
                fetch(`${config.apiUri}/api/data/getnames?` + new URLSearchParams({ count: 3 }), {
                    headers: new Headers({
                        "ngrok-skip-browser-warning": "69420",
                    })
                }).then((result) => {
                    return result.json();
                }).then((response) => {
                    sidemenuBuyList.innerHTML = "";
                    response.names.forEach((option) => {
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
                });
            }

            buyButton.addEventListener('click', () => {
                buy();
            });

            sellButton.addEventListener('click', () => {
                sell();
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
                        item.style.boxShadow = "inset 5px 5px 2px 2px rgb(87, 79, 79)";
                        currentSellOption = stock;
                    });
                });
            }
            let totalTime = 0;
            function buy() {
                if (gameStarted === false) {
                    gameStarted = true;
                    if (stockList.length === 4) {
                        alert("You have the maximum number of stocks.");
                        return;
                    }
                    fetch(`${config.apiUri}/api/ingame-events/startgame?` + new URLSearchParams({ players: id }), {
                        headers: new Headers({
                            "ngrok-skip-browser-warning": "69420",
                        })
                    })
                    const interval = setInterval(() => {
                        if (gameOver === false) {
                            fetch(`${config.apiUri}/api/ingame-events/getEvent?` + new URLSearchParams({ gameId: gameId }), {
                                headers: new Headers({
                                    "ngrok-skip-browser-warning": "69420",
                                })
                            }).then((result) => {
                                return result.json();
                            }).then((response) => {
                                const { event } = response;
                                console.log(event)
                                totalTime += 20;
                            });
                        } else {
                            clearInterval(interval)
                        }
                    }, 20 * 1000);
                }
                fetch(`${config.apiUri}/api/ingame-events/slope?` + new URLSearchParams({ gameId: gameId }), {
                    headers: new Headers({
                        "ngrok-skip-browser-warning": "69420",
                    })
                }).then((result) => {
                    return result.json();
                }).then((response) => {
                    const { slope } = response;
                    document.cookie = `gameId=${gameId};path=/`;
                    stockList.push(currentBuyOption);
                    generateSellOptions(stockList);
                    optionList = response.names;
                    generateBuyOptions(optionList);
                    multipBuys = [1, 5, 10, (capital / 100)]
                    var numStocks = multipBuys[currMultipBuy];
                    capital = capital - (100 * numStocks);
                    capitalTxt.innerHTML = `Capital: ${capital}`;

                    const stockObj = {
                        name: `${currentBuyOption}`,
                        canvas: `canvas${stockObjList.length + 1}`,
                        currStockVal: 100,
                        num: numStocks,
                        slope: slope,
                        prevX: 0,
                        prevY: 100
                    }
                    document.getElementById(stockObj.canvas).style.display = "block";
                    function createLine(x1, y1, x2, y2, color, width, ctx) {
                        ctx.beginPath()
                        ctx.moveTo(x1, y1);
                        ctx.lineTo(x2, y2);
                        ctx.strokeStyle = color;
                        ctx.lineWidth = width;
                        ctx.stroke();
                    };
                    let xIndex = 0;
                    function canvasStuff(ctx) {
                        fetch(`${config.apiUri}/api/ingame-events/slope?` + new URLSearchParams({ gameId: gameId }), {
                            headers: new Headers({
                                "ngrok-skip-browser-warning": "69420",
                            })
                        }).then((result) => {
                            return result.json();
                        }).then((response) => {
                            const { slope } = response;
                            const newY = (slope * 4) + stockObj.prevY;
                            let color;
                            if (newY < stockObj.prevY) {
                                color = 'green'
                            } else {
                                color = 'red';
                            }
                            xIndex += 8;
                            createLine(stockObj.prevX, stockObj.prevY, xIndex, newY, color, "4px", ctx);
                            stockObj['currStockVal'] = stockObj.currStockVal + (stockObj.prevY - newY);
                            stockObj['prevX'] = xIndex;
                            stockObj['prevY'] = newY;
                            // createLine(0, 50, 20, 100, "red", "2px", ctx1)
                        });
                        const interval = setInterval(() => {
                            const result = stockObjList.find(s => s.canvas === stockObj.canvas);
                            if (!result) {
                                clearInterval(interval);
                            } else {
                                fetch(`${config.apiUri}/api/ingame-events/slope?` + new URLSearchParams({ gameId: gameId }), {
                                    headers: new Headers({
                                        "ngrok-skip-browser-warning": "69420",
                                    })
                                }).then((result) => {
                                    return result.json();
                                }).then((response) => {
                                    const { slope } = response;
                                    const newY = (slope * 4) + stockObj.prevY;
                                    let color;
                                    if (newY < stockObj.prevY) {
                                        color = 'green'
                                    } else {
                                        color = 'red';
                                    }
                                    xIndex += 8;
                                    createLine(stockObj.prevX, stockObj.prevY, xIndex, newY, color, "4px", ctx);
                                    stockObj['currStockVal'] = stockObj.currStockVal + (stockObj.prevY - newY);
                                    stockObj['prevX'] = xIndex;
                                    stockObj['prevY'] = newY;
                                    // createLine(0, 50, 20, 100, "red", "2px", ctx1)
                                    if (xIndex === 300 && gameMode === "timed") {
                                        clearInterval(interval);
                                    }
                                });
                            }
                        }, 4000);
                    }
                    if (stockObj.canvas === "canvas1") {
                        canvasStuff(ctx1);
                    } else if (stockObj.canvas === "canvas2") {
                        canvasStuff(ctx2);
                    } else if (stockObj.canvas === "canvas3") {
                        canvasStuff(ctx3);
                    } else if (stockObj.canvas === "canvas4") {
                        canvasStuff(ctx4);
                    }
                    currentBuyOption = null;
                    stockObjList.push(stockObj);

                });
            }

            function sell() {
                if (currentSellOption === null) {
                    return;
                }
                var chosenObj;
                stockObjList.forEach((currStockObj) => {
                    if (currStockObj.name === currentSellOption) {
                        chosenObj = currStockObj;
                    }
                });
                var numToSell = document.getElementById("multipButton-multip-sell").value.split("x").join("");
                if (numToSell !== "All") {
                    if (parseInt(numToSell) > chosenObj.num) {
                        numToSell = chosenObj.num;
                        chosenObj['num'] = 0;
                    }
                    if (chosenObj.num !== 0) {
                        chosenObj['num'] = chosenObj.num - parseInt(numToSell);
                    }
                } else {
                    numToSell = chosenObj.num;
                    chosenObj['num'] = 0;
                }
                capital = capital + (chosenObj.currStockVal * parseInt(numToSell));
                capital = Math.floor(capital / 5) * 5;
                document.getElementById("capital").innerHTML = `Capital: ${capital}`
                if (chosenObj.num === 0) {
                    document.getElementById(`sideMenu-list-optionButton-sell-${chosenObj.name}`).remove();
                    const canvas = document.getElementById(chosenObj.canvas);
                    canvas.style.display = "none";
                    if (chosenObj.canvas === "canvas1") {
                        ctx1.clearRect(0, 0, canvas.width, canvas.height);
                    } else if (chosenObj.canvas === "canvas2") {
                        ctx2.clearRect(0, 0, canvas.width, canvas.height);
                    } else if (chosenObj.canvas === "canvas3") {
                        ctx3.clearRect(0, 0, canvas.width, canvas.height);
                    } else if (chosenObj.canvas === "canvas4") {
                        ctx4.clearRect(0, 0, canvas.width, canvas.height);
                    }
                    stockObjList = stockObjList.filter(s => s.name !== chosenObj.name)
                    stockList = stockList.filter(s => s !== chosenObj.name)
                    currentSellOption = null;
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
                stockObjects.forEach((stockObj) => {
                    let chosenCtx;
                    if (stockObj.canvas === "canvas1") {
                        chosenCtx = ctx1;
                    }
                    if (stockObj.canvas === "canvas2") {
                        chosenCtx = ctx2;
                    }
                    if (stockObj.canvas === "canvas3") {
                        chosenCtx = ctx3;
                    }
                    if (stockObj.canvas === "canvas4") {
                        chosenCtx = ctx4;
                    }
                    chosenCtx.beginPath();
                    chosenCtx.moveTo(stockObj.prevX, stockObj.prevY);
                    chosenCtx.lineTo(stockObj.prevX + 4, stockObj.prevY + (slope * 4));
                    if (slope < 0) {
                        chosenCtx.strokeStyle = 'red';
                    }
                    else {
                        chosenCtx.strokeStyle = 'green';
                    }
                    chosenCtx.stroke();

                    stockObj.prevX = stockObj.prevX + 4;
                    stockObj.prevY = stockObj.prevY + (slope * 4);
                });
            }

            function getEvent() {
                return;
            }

            function timerStart() {
                const timer = setTimeout(() => {
                    updateGraph();
                    getEvent();
                    timerStart();
                }, 4000);
                clearTimeout(timer);
            }

            timerStart();
        })
    });
});