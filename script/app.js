const container = document.getElementById('container');
let mobileSignUp = document.getElementById("mobileSignUp");
let mobileSignIn = document.getElementById("mobileSignIn");
let signInContainer = document.getElementById("sign-in-container");
let signUpContainer = document.getElementById("sign-up-container")

 
document.getElementById('signUp').addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

document.getElementById('signIn').addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});


mobileSignUp.addEventListener('click', () => {
    location = "./signup.html"
})

