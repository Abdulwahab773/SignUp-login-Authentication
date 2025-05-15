let loginBtn = document.getElementById("loginBtn");
let loginEmail = document.getElementById("loginEmail");
let loginPass = document.getElementById("loginPass")

import { auth, signInWithEmailAndPassword } from "./firebase.js";


const login = () => {
    if (loginEmail.value && loginPass.value) {
        signInWithEmailAndPassword(auth, loginEmail.value, loginPass.value)
            .then((userCredential) => {
                let user = userCredential.user;
                if (user) {
                    Swal.fire({
                        icon: "success",
                        text: "Login Successful!",
                    });
                    setTimeout(() => {
                        location = "./dashboard.html";
                    }, 700)
                }

            })
            .catch((error) => {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Invalid email or password!",
                });
                loginEmail.value = "";
                loginPass.value = "";
            });
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please Fill Out Both Fields!",
        });
        loginEmail.value = "";
        loginPass.value = "";
    }
}


loginBtn.addEventListener('click', login);