// login function
$('#login').click(() => {
  // validation first!
  let email = $("#email").val()
  if (!email) {
    $("p.alert").removeClass("d-none").remove("#error")
    $("#error").text('Please insert your email!')
    console.log('email error')
  } else {
    if (!validateEmail(email)) {
      $("p.alert").removeClass("d-none").remove("#error")
      $("#error").text('Please input your email correctly!')
      console.log('email error')
    }
  }

  let password = $("#password").val()
  if (!password) {
    $("p.alert").removeClass("d-none").remove("#error")
    $("#error").text('Please insert your password!')
    console.log('password error')
  }

  if (!email && !password) {
    $("p.alert").removeClass("d-none").remove("#error")
    $("#error").text('Please insert your email and password!')
    console.log('email & password error')
  }

  $.ajax({
    url: 'http://localhost:3000/login',
    method: 'POST',
    data: {
      email: $("#email").val(),
      password: $("#password").val()
    }
  })
    .done(response => {
      localStorage.setItem('token', response.token)
      localStorage.setItem('name', response.name)
      window.location.replace('./home.html')
    })
    .fail(error => {
      $("p.alert").removeClass("d-none").remove("#error")
      $("#error").text(error.responseJSON.message)
      console.log(error.responseJSON.message)
    })
})

// register function
$("#register").click(() => {
  // validation first!
  let password = $("#password").val()
  if (!password) {
    $("p.alert").removeClass("d-none").remove("#error")
    $("#error").text('Please insert your password!')
    console.log('password error')
  }

  let email = $("#email").val()
  if (!email) {
    $("p.alert").removeClass("d-none").remove("#error")
    $("#error").text('Please insert your email!')
    console.log('email error')
  } else {
    if (!validateEmail(email)) {
      $("p.alert").removeClass("d-none").remove("#error")
      $("#error").text('Please input your email correctly!')
      console.log('email error')
    }
  }


  let name = $("#name").val()
  if (!name) {
    $("p.alert").removeClass("d-none").remove("#error")
    $("#error").text('Please insert your name!')
    console.log('name error')
  }

  $.ajax({
    url: 'http://localhost:3000/register',
    method: 'POST',
    data: {
      name: $("#name").val(),
      email: $("#email").val(),
      password: $("#password").val()
    }
  })
    .done(response => {
      console.log(response)
      window.location.replace('./')
    })
    .fail(error => {
      $("p.alert").removeClass("d-none").remove("#error")
      $("#error").text(error.responseJSON.message)
      console.log(error.responseJSON.message)
    })
})

// function in here ------

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// google sign-in
function onSignIn(googleUser) {
  // var profile = googleUser.getBasicProfile();
  var id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    url: 'http://localhost:3000/googlelogin',
    method: 'POST',
    headers: { token: id_token }
  })
    .done(response => {
      localStorage.setItem('token', response.token)
      localStorage.setItem('name', response.name)
      console.log(response)
      window.location.replace('./home.html')
    })
    .fail(error => {
      console.log(error)
    })
  
}
