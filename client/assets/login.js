const config = {
    port : 'http://localhost:3000'
}

$( document ).ready(function() {
    checkToken()
});

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    
    $.ajax({
        method : "POST",
        url : 'http://localhost:3000/users/gsignin',
        data : {gtoken : id_token}
    })
    .done((response)=>{
        console.log(response)
        localStorage.setItem('token',response.token)
        localStorage.setItem('userId',response.userId)
        checkToken()
    })
    .fail(err=>{
        console.log(err)
    })
}

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
        localStorage.setItem('userId',response.userId)
        checkToken()
    })
    .fail(err=>{
        toastr["warning"](`${err.responseJSON.message}`)
    })
}

function showRegisterMenu(){
    $('#register_form').empty()
    $('#login_form').removeClass('animated slideInRight fast').addClass('animated fadeOutLeft fast')

    $('#register_form').append(`
    <div class="text-center border border-light p-5 bg-white z-depth-3 animated slideInRight slow">

        <p class="h4 mb-4">Sign up</p>

        <div class="form-row mb-4">
            <div class="col">
                <!-- First name -->
                <input id="register_name" type="text" id="defaultRegisterFormFirstName" class="form-control" placeholder="Name">
            </div>
        </div>

        <!-- E-mail -->
        <input id="register_email" type="email" id="defaultRegisterFormEmail" class="form-control mb-4" placeholder="E-mail">

        <!-- Password -->
        <input id="register_password" type="password" id="defaultRegisterFormPassword" class="form-control" placeholder="Password"
            aria-describedby="defaultRegisterFormPasswordHelpBlock">
        <small id="defaultRegisterFormPasswordHelpBlock" class="form-text text-muted mb-4">
            At least 4 characters
        </small>

        <!-- Sign up button -->
        <button class="btn btn-default my-4 btn-block" onclick="register()">Sign Up</button>
        <p>Already a member?
            <a href="#" onclick="showLoginMenu()">Login</a>
        </p>

    </div>
    `)
}

function showLoginMenu(){
    $('#register_form').empty()
    $('#login_form').removeClass('animated fadeOutLeft fast').addClass('animated slideInRight fast')
}

function register(){
    let data = {
        name : $( '#register_name' ).val(),
        email : $( '#register_email' ).val(),
        password : $( '#register_password' ).val()
    }

    $.ajax({
        method : 'POST',
        url : `${config.port}/users/register`,
        data
    })
    .done(response=>{

        $('#register_form').empty()
        $('#login_form').removeClass('animated fadeOutLeft fast').addClass('animated slideInRight fast')
        toastr["success"](`${response.message}`)
        
    })
    .fail(err=>{
        toastr["error"](`${err.responseJSON.message}`)
    })
}