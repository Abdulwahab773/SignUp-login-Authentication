import { auth, signOut, onAuthStateChanged, sendEmailVerification, deleteUser } from "./firebase.js";

let panel = document.getElementById("verification-panel");
let userName = document.getElementById("user-name");
let userEmail = document.getElementById("user-email");
let uid = document.getElementById("uid");
let createdDate = document.getElementById("created-date");
let logoutBtn = document.getElementById("logout-btn");
let userImage = document.getElementById("userImage");
let verifyBtn = document.getElementById("verifyBtn");
let deleteBtn = document.getElementById("delete-btn");

onAuthStateChanged(auth, (user) => {
    if (user) {
        const email = user.email;
        const userId = user.uid;
        const date = user.metadata.creationTime;
        const creationTime = date.slice(4, 17);
        const nameOfUser = user.displayName;

        userName.innerHTML = nameOfUser || "Not Provided";
        userEmail.innerHTML = email;
        uid.innerHTML = userId;
        createdDate.innerHTML = creationTime;

        if (user.photoURL === null) {
            userImage.src = "https://i.pravatar.cc/100";
        } else {
            userImage.src = "https://lh3.googleusercontent.com/a/ACg8ocJuCMUwOU0mInt0cn1Jn4EsxO7jpdnqN0-cOtkUzRANI6-bKYmh=s96-c";
        }

        if (user.emailVerified === true) {
            panel.style.display = "none";
        }
    }
});



let logOut = () => {
    signOut(auth).then(() => {
        location = "./index.html";

    }).catch((error) => {
        console.log(error);
    });
}


let emailVerify = () => {
    sendEmailVerification(auth.currentUser)
        .then(() => {
            Swal.fire({
                icon: "success",
                title: "Sent",
                text: "Email Verifcation sent!",
            });
        });
}


let deleteAcc = () => {
    const user = auth.currentUser;

    deleteUser(user).then(() => {
        Swal.fire({
            title: "Deleted!",
            text: "Your Account has been deleted.",
            icon: "success"
        });
        setTimeout(() => {
            location = "./index.html"
        }, 700)
    })
        .catch((error) => {
            console.log(error);
        });
}

deleteBtn.addEventListener('click', deleteAcc);
logoutBtn.addEventListener('click', logOut);
verifyBtn.addEventListener('click', emailVerify);
