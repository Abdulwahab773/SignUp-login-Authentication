let signUpBtn = document.getElementById("signUpBtn");
let signUpEmail = document.getElementById("signUpEmail");
let signUpPass = document.getElementById("signUpPass")
let nameinput = document.getElementById("nameinput");
let googleSignUpBtn = document.getElementById("googleSignUpBtn");


import { createUserWithEmailAndPassword, auth, updateProfile, provider, signInWithPopup } from "./firebase.js";

const signUP = () => {
    if (signUpEmail.value && signUpPass.value && nameinput.value) {

        createUserWithEmailAndPassword(auth, signUpEmail.value, signUpPass.value)
            .then((userCredential) => {
                const user = userCredential.user;
                if (user) {
                    Swal.fire({
                        icon: "success",
                        text: "Successfuly Signed Up!",
                    });
                    setTimeout(() => {
                        location = "./dashboard.html";
                    }, 700)
                }
                return updateProfile(user, {
                    displayName: nameinput.value
                });
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Please enter a valid email and password!",
                });
                console.log("error-->", error);
                nameinput.value = "";
                signUpEmail.value = "";
                signUpPass.value = "";
            });

    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please Fill Out All Fields!",
        });
        signUpEmail.value = "";
        signUpPass.value = "";
    }
}


const signUpWithGoogle = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
        }).catch((error) => {
            console.log(error);
        });
}

signUpBtn.addEventListener('click', signUP, updateProfile);
googleSignUpBtn.addEventListener('click', signUpWithGoogle);