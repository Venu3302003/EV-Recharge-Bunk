auth.onAuthStateChanged(user=>{
    if(!user){
        location.href="login.html";
    }
});
