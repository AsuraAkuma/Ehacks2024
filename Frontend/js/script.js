const selectKingButton = document.getElementById("king-button");
const selectEndlessButton = document.getElementById("endless-button");
const selectTimedButton = document.getElementById("timed-button");
const startButton = document.getElementById("start-button");
import config from './config.json' assert { type: "json" };


window.addEventListener("load", () => {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    let accessToken;
    let tokenType;
    if (fragment.toString() !== '') {
        document.cookie = `accessToken=${fragment.get('access_token')};path=/`;
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
        fetch(`${config.apiUri}/api/auth/ping`).then((result) => {
            return result.json();
        }).then((response) => {

        });
        fetch(`${config.apiUri}/api/auth/discord?` + new URLSearchParams({ id: id, email: email, username: username }), {
            headers: new Headers({
                "ngrok-skip-browser-warning": "69420",
            })
        }).then((result) => {
            return result.json();
        }).then((response) => {
            if (response.success === true) {
                let currentOption = null;

                selectKingButton.addEventListener("click", () => {
                    if (currentOption !== null) {
                        selectKingButton.style.color = "white";
                    }
                    selectKingButton.style.color = "gray ";
                    selectEndlessButton.style.color = "white";
                    selectTimedButton.style.color = "white";
                    currentOption = "king";

                })
                selectEndlessButton.addEventListener("click", () => {
                    if (currentOption !== null) {
                        selectEndlessButton.style.color = "white";
                    }
                    selectKingButton.style.color = "white";
                    selectEndlessButton.style.color = "gray";
                    selectTimedButton.style.color = "white";
                    currentOption = "endless";
                })
                selectTimedButton.addEventListener("click", () => {
                    if (currentOption !== null) {
                        selectTimedButton.style.color = "white";
                    }
                    selectKingButton.style.color = "white";
                    selectEndlessButton.style.color = "white";
                    selectTimedButton.style.color = "gray";
                    currentOption = "timed";
                })
                startButton.addEventListener("click", () => {
                    if (currentOption === null) {
                        alert("No game mode selected!")
                        return;
                    }
                    document.cookie = `mode=${currentOption};path=/`;
                    window.location.pathname = "./Frontend/Stocks.html"
                })

            }
        });
    });
});

