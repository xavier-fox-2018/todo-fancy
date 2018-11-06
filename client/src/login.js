$( document ).ready(function() {
  console.log( "ready!" );
  
  $(".signUp").click((e) => {
    e.preventDefault();
    $("#loginPage").show();
    $("#loginForm").hide();
    $("#displayError").hide();
    $("#displaySuccess").hide();
    $("#registerForm").show(e);
  })

  $(".signIn").click((e) => {
    e.preventDefault();
    $("#loginPage").show();
    $("#loginForm").show(e);
    $("#registerForm").hide();
    $("#displayError").hide();
    $("#displaySuccess").hide();
  })

  $("#clickRegister").click((e) => {
    e.preventDefault();
    $.ajax({
      url : 'http://localhost:3000/users',
      method : 'POST',
      data : {
        username : $("#usernameRegister").val() ,
        email : $("#emailRegister").val(),
        password : $("#passwordRegister").val()
      }
    })
    .done(response => {
      $("#msg-success").text('User Successfully created. Please login');
      $("#displaySuccess").show();
    })
    .fail(err => {
      $("#msg").text('Registration failed, username or email already in use');
      $("#displayError").show();
    })
  })

  $("#clickLogin").click((e) => {
    e.preventDefault();
    $.ajax({
      url : 'http://localhost:3000/users/login',
      method : 'POST',
      data : {
        email : $("#emailLogin").val(),
        password : $("#passwordLogin").val()
      }
    })
    .done(response => {
      localStorage.setItem('token', response.JWT_TOKEN);
      window.location = '/user.html'
    })
    .fail(err => {
      $("#msg").text('Email / password invalid');
      $("#displayError").show();
    })
  })

});