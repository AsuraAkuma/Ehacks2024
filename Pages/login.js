const loginbutton = document.getElementById("login-button")
const password = document.getElementById("password")
const username = document.getElementById("username")
const discordButton = document.getElementById("")

window.addEventListener("load", () => {
    loginbutton.addEventListener("click", () => {
        if (username.value == "") {
            alert("Username not found");
            return
        }
        if (password.value == "") {
            alert("Password not found");
            return
        }
        fetch('http://localhost:3000/api/auth/login?' + new URLSearchParams({ username: username.value, password: password.value }))
            .then(response => response.json())
            .then((response) => {
                const { success, msg, user } = response;
                if (success == false) {
                    alert(msg);
                    return
                }
                document.cookie = `id=${user.id}`;
                document.cookie = `username=${user.username}`;
                window.location.pathname = "./homepage.html"
            });
    });

}
)
