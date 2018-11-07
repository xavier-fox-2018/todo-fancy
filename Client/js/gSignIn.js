

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token)
    $.ajax({
        method: 'POST',
        url: "http://localhost:3000/user/gsignin",
        data: {
            gToken: id_token
        }
    })
    .done(response => {
        localStorage.setItem('token',response.token)
        localStorage.setItem('email',response.email)
        allSignIn()
    })
    .fail(err => {
        console.log(err);
    })
}