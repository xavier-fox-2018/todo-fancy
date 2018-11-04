$( document ).ready(function(){
    checkToken()
})

function checkToken(){
    let token = localStorage.getItem('token')
    if(!token){
        window.location = 'login.html'
    }
}

function logOut(){
    localStorage.removeItem('token')
    checkToken()
}