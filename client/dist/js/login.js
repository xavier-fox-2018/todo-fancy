$('#sign-in').click(function(){
    $.ajax({
      method: "POST",
      url: "http://localhost:3000/users/signin",
      data: {
        email: $('#email').val(),
        password: $('#password').val()
      }
    })
    .done(function(response){
        console.log(response)
        if(response.token){
            localStorage.setItem('token', response.token)
            window.location = '/index.html'
        } else {
            let message = "Error Signin!"
        }
    })
    .fail(error=>{
        console.log(error)
    })
})

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/users/gsignin",
        data: {
            gtoken: id_token
        }
    })
    .done(response=>{
        console.log('response : ', response)
        let token = response.token
        localStorage.setItem('token', token)
        window.location = '/index.html'
    })
    .fail(err=>{
        console.log(err.message)
    })
}