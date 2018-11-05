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