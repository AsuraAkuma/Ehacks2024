const registerbutton = document.getElementById("register-button")
const password = document.getElementById("password")
const username = document.getElementById("username")
const email = document.getElementById("email")

window.addEventListener("load", ()=> {
    registerbutton.addEventListener("click", ()=>{
        if(username.value == ""){
            alert("Username not found");
            return 
        }
        if(password.value == ""){
            alert("Password not found");
            return 
        }
        fetch('http://localhost:3000/api/auth/register?'+ new URLSearchParams({email:email.value, username:username.value, password:password.value}) )
        .then(response => response.json())
        .then((response) => {
            const {success, msg, user} = response;
            if(success == false ){
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
