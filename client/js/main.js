$(document).ready(function(){
    tokenReady()
})

$('#register-btn').click(function(){

    let fullName = $('#fullName').val()
    let email = $('#email').val()
    let password1 = $('#password1').val()
    let password2 = $('#password2').val()  
    
    if (password1 !== password2) {
        $('#alert').css('display','')
        $('#alert').removeClass().addClass('alert alert-danger')
        $('#alert').text('password doesn\'t match')
    }else {
        $.ajax({
            method: 'POST',
            url: 'http://localhost:3000/register',
            data: {
                fullName: fullName,
                email: email,
                password: password1
            }
        })
        .done(function(response){                    
            $('#registerForm').hide()
            $('#loginForm').fadeIn()   
            $('#alert').css('display','')
            $('#alert').removeClass().addClass('alert alert-success')
            $('#alert').text('registration success')
        })
        .fail(function(err){
            console.log(err)
            $('#alert').addClass('alert-danger')
            $('#alert').text('registration failed')
        }) 
    }

})

$('#login-btn').click(function(){
    $('#registerForm').hide()
    $('#loginForm').fadeIn()   
})

$('#reg-btn').click(function(){
    $('#loginForm').hide()
    $('#registerForm').fadeIn()
})


$('#log-btn').click(function(){
    let email = $('#emailLogin').val()
    let password = $('#password').val()
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: {           
            email: email,
            password: password
        }
    })
    .done(function(response){
        localStorage.setItem('token', response.token)
        location.replace('/todo.html')
        tokenReady()
    })
    .fail(function(err){
        console.log(err)
    })
})

function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/googleLogin',
        data: {
            gToken: id_token
        }
    })
    .done((response) => {
        localStorage.setItem('token', response.token)   
        location.replace('/todo.html')     
        tokenReady()       
    })
    .fail((err) => {
        console.log(err)
    })  
    
  }

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      localStorage.removeItem('token')
    //   console.log('hahah')
      tokenReady()
    });
}

function tokenReady() {
    let token = localStorage.getItem('token')
    if (!token) {       
        $('#logoutsss').hide()
    } else {
        $('#logoutsss').show()
    }
}