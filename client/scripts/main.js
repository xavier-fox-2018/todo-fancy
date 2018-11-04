$(document).ready(() => {
  $('.alert').on('click', '.alert-exit', event => {
    $(event.currentTarget).parent().hide()
  })

  $('#submitRegister').on('click', event => {
    $.ajax({
      method: 'POST',
      data: {
        name: $('#registerName').val(),
        email: $('#registerEmail').val(),
        password: $('#registerPassword').val()
      },
      url: 'http://localhost:3000/users/'
    })
    .done(data => {
      let result = data.result
      $('.alert-paragraph').remove()
      $('.alert-success').append(
        `<p class="alert-paragraph">Register ${result.email} Successful!, You can now Sign In</p>
        <button class="alert-paragraph alert-exit">OK</button>`
      )
      $('.alert-success').show()
    })
    .fail(error => {
      $('.alert-paragraph').remove()
      $('.alert-danger').append(
        `<p class="alert-paragraph">Error! ${JSON.parse(error.responseText).error.message} </p>
        <button class="alert-paragraph alert-exit">OK</button>`
      )
      $('.alert-danger').show()
    })
  })

  $('.signinbutton').on('click', () => {
    $.ajax({
      method: 'POST',
      data: {
        email: $('#inputEmail').val(),
        password: $('#inputPassword').val()
      },
      url: 'http://localhost:3000/users/login'
    })
    .done(data => {
      localStorage.setItem('token', data.result.token)
      $('.alert-paragraph').remove()
      $('.alert-success').append(
        `<p class="alert-paragraph">${data.result.message}</p>
        <button class="alert-paragraph alert-exit">OK</button>`
      )
      $('.alert-success').show()
      $('.tododiv').show()
      $('.g-signin2').hide()
      $('.signinbutton').hide()
      $('.registerbutton').hide()
      $('.signout').show()
      $('.formlogin').hide()
    })
    .fail(error => {
      $('.alert-paragraph').remove()
      $('.alert-danger').append(
        `<p class="alert-paragraph">${JSON.parse(error.responseText).error.message}</p>
        <button class="alert-paragraph alert-exit">OK</button>`
      )
      $('.alert-danger').show()
      console.log(error)
    })
  })
})
