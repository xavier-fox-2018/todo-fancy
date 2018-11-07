

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
    .done(jwt => {
        console.log(jwt.token);
        localStorage.setItem('token',jwt.token)
        allSignIn()
    })
    .fail(err => {
        console.log(err);
    })
}