const url = 'http://localhost:3000'

function doLogin(){
    let email = $(`#email`).val()
    let password = $(`#password`).val()

    $.ajax({
        url: url + `/user/signin`,
        method : "POST",
        data :{
          email, password
        }})
    .done(function(found) {
        if(found.token){
            localStorage.setItem('token', found.token)
            window.location ='/todo.html'
        }
    })
    .fail(function(err){
        console.log(err); 
    })
}

function registerForm() {
    $("#form").hide()
    $("#formAuth").html("")
    $("#formAuth").append(`
    <h1 class="text-white mt-3 mb-5">Todooku</h1>
    <div class="row h-100 justify-content-center align-items-center mt-3 mb-3">
        <form class="col-4 mt-4">
            <div class="form-group">
                <input type="text" class="form-control" id="name" placeholder="Full Name">
            </div>
            <div class="form-group">
                <input type="email" class="form-control" id="email" placeholder="Email">
            </div>
            <div class="form-group">
                <input type="password" class="form-control" id="password" placeholder="Password">
            </div>
            <input type="button" value="Sign Up" class="btn btn-outline-primary btn-block" onclick="toRegister()">
        </form>
    </div>
    `)
}

function toRegister(){
    let name = $('#name').val()
    let email = $('#email').val()
    let password = $('#password').val()

    $.ajax({
        url: url + `/user/signup`,
        method: 'POST',
        data: { name, email, password}
    })
    .done(function(result){
        console.log(result);
        
        if(result.token){
            localStorage.setItem('token', result.token)
            window.location = '/'
        }
    })
    .fail(function(err){
        console.log(`ini`,err);
    })
}

// google

function onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;  
    console.log(id_token);
    
    $.ajax({
        method: 'POST',
        url: url + '/user/gsignin',
        data: {
            gtoken: id_token
        }
    })
    .done(result =>{
        localStorage.setItem('token', result)
    })
    .fail(err =>{
        console.log(err);
    })
}


// facebook
function checkLoginState() {
    FB.getLoginStatus(function(response) {
        console.log(response);
    if(response.status == 'connected'){
        // testAPI()
        $.ajax({
            method: 'POST',
            url: url+'/user/signinfb',
            data: {
                accessToken: response.authResponse.accessToken
            }
        })
        .done(function(result){
            localStorage.setItem('token', result.token)
            window.location = '/todo.html'
        })
        .fail(function(err){
            console.log(`iinii`, err);
        })
    }
    });
}
  
window.fbAsyncInit = function() {
    FB.init({
    appId      : '1977550412544896',
    cookie     : true,  
    xfbml      : true,  
    version    : 'v2.8' 
    });

};
  
  
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

  
function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
        // window.location = '/todo.html'
    });
}

