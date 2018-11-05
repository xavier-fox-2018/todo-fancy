
$('#register-button').click(function(){
    $.ajax({
        method : "POST",
        url: "http://localhost:3000/users/register",
        data: {
            name: $('#full_name').val(),
            email: $('#email').val(),
            password: $('#password').val(),
        }
    })
    .done(data=>{
        window.location = '/login.html'
    })
    .fail('error register')
})