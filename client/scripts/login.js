
$(document).ready(() => {
  let token = localStorage.getItem('token')
  if (token) {
    window.location = './main.html'
  }
})

const host = `http://localhost:3000`
// const host = 'https://api-todo.agungatidhira.tech'

function login() {
  let email = $('#email').val()
  let password = $('#password').val()  
  $.ajax({
    url: `${host}/users/login`,
    method: 'POST',
    json: true,
    data: {
      email: email,
      password: password
    }
  })
  .done(response => {
    localStorage.setItem('token', response.token)
    localStorage.setItem('username', response.username)
    localStorage.setItem('userId', response.userId)
    window.location = './main.html'
  })
  .fail(err => {
    console.log(err)
    $('#notifLogin').empty()
    $('#notifLogin').append('* ' + err.responseJSON.message)
  })
}

function regist () {
  let data = {
    username: $('#usernameRegist').val(),
    email: $('#emailRegist').val(),
    password: $('#passwordRegist').val()
  }
  console.log('masuk regist client', data)
  
  $.ajax({
    url: `${host}/users/register`,
    method: 'POST',
    data: data
  })
  .done(response => {
    $('#notifRegist').empty()
    $('#notifRegist').append('* '+ response.message)
  })
  .fail(err => {
    $('#notifRegist').empty()
    $('#notifRegist').append('* '+ err.responseJSON.message[0])
  })
}

function loginGoogle(token) {
  console.log('masuk login google client--', host)
  $.ajax({
    url: `${host}/users/login/google`,
    method: 'get',
    headers: {
      id_token : token
    }
  })
  .done(response => {
    console.log(response)
    localStorage.setItem('token', response.token)
    localStorage.setItem('username', response.username)
    localStorage.setItem('userId', response.userId)
    window.location.href = './main.html'
  })
  .fail(err => {
    console.log(err)
  })
}