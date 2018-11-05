// GOOGLE
// function onSignIn(googleUser) {
//   // Useful data for your client-side scripts:
//   var profile = googleUser.getBasicProfile();
//   console.log("ID: " + profile.getId()); // Don't send this directly to your server!
//   console.log('Full Name: ' + profile.getName());
//   console.log('Given Name: ' + profile.getGivenName());
//   console.log('Family Name: ' + profile.getFamilyName());
//   console.log("Image URL: " + profile.getImageUrl());
//   console.log("Email: " + profile.getEmail());

//   // The ID token you need to pass to your backend:
//   var id_token = googleUser.getAuthResponse().id_token;
//   console.log("ID Token: " + id_token);
// };

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  const idToken = googleUser.getAuthResponse().id_token,
        fullName = profile.getName(),
        email = profile.getEmail()
  
  $.ajax({
    method: "POST",
    url: "http://localhost:4000/api/google",
    data: {
      "gToken": idToken,
      "fullName": fullName,
      "email": email
    }
  })
    .done(function (result) {
    })
    .fail(function () {
      $("#errorCreateAccount").fadeIn().delay(5000).fadeOut()
    })

}

// OPENING MODALS
$(document).ready(function () {
  $('.modal').modal();
});

// CREATING THE ACCOUNT
$("#errorCreateAccount").hide()
$("#successCreateAccount").hide()
$("#errorEmailCreateAccount").hide()

$("#submitCreateAccount").click(function() {
  if (($("#first_name").val().length || $("#last_name").val().length || $("#email").val().length || $("#password").val().length) < 1 ) {
       $("#errorCreateAccount").fadeIn()
      } else {
        $.ajax({
          method: "POST",
          url: "http://localhost:4000/api/user/",
          data: {
            "name": `${$("#first_name").val()} ${$("#last_name").val()}`,
            "email": $("#email").val(),
            "password": $("#password").val()
          }
        })
          .done(function (result) {
            if (result.message === "New User has been successfully made made!") {
              $("#successCreateAccount").fadeIn().delay(5000).fadeOut()
              $("#first_name").val("")
              $("#last_name").val("")
              $("#email").val("")
              $("#password").val("")
            } else if (result.message === "Email has ben used") {
              $("#errorEmailCreateAccount").fadeIn().delay(5000).fadeOut()
            }
            else {
              $("#errorCreateAccount").fadeIn().delay(5000).fadeOut()
            }
          })
          .fail(function () {
            $("#errorCreateAccount").fadeIn().delay(5000).fadeOut()
          })
      }
})

$("#errorSignIn").hide()
$("#submitSignIn").click(function() {
  if (($("#emailSignIn").val().length || $("#passwordSignIn").val().length) < 1) {
    $("#errorSignIn").fadeIn()
  }

  $.ajax({
    method: "POST",
    url: `http://localhost:4000/api/user/email`,
    data: {
      email: $("#emailSignIn").val(),
      password: $("#passwordSignIn").val()
    }
  })
    .done(function(result) {
      localStorage.setItem('token', result.jwtUser)
      localStorage.setItem('name', result.name)
      localStorage.setItem('userId', result.userId)
      window.location = "http://localhost:5500/user.html";
    })
    .fail(function(err) {
      console.log(`gagal`)
      console.log(err)
    })
})