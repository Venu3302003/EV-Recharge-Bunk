function logoutUser(){
    auth.signOut().then(()=> location.href="index.html");
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    if(loginForm){
        loginForm.addEventListener("submit", e=>{
            e.preventDefault();
            auth.signInWithEmailAndPassword(
                loginEmail.value, loginPassword.value
            ).then(()=> location.href="dashboard.html");
        });
    }

    if(registerForm){
        registerForm.addEventListener("submit", e=>{
            e.preventDefault();
            auth.createUserWithEmailAndPassword(
                registerEmail.value, registerPassword.value
            ).then(()=> location.href="dashboard.html");
        });
    }
});
function logoutUser() {
    firebase.auth().signOut().then(() => {
        window.location.href = "login.html";
    }).catch((error) => {
        console.error("Logout Error:", error);
    });
}
