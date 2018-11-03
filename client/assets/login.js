const config = {
    port : 'http://localhost:3000'
}

$( document ).ready(function() {
    checkToken()
});

function checkToken(){
    let token = localStorage.getItem('token')
    if(token){
        window.location = 'index.html'
    }
}

function login(){
    let email = $( '#input_email' ).val()
    let password = $( '#input_password' ).val()

    $.ajax({
        method : 'POST',
        url : `${config.port}/users/login`,
        data : {
            email : email,
            password : password   
        }
    })
    .done(response=>{
        localStorage.setItem('token',response.token)
        checkToken()
        console.log(response)
    })
    .fail(err=>{
        console.log(err)
    })
}