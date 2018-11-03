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
    .catch(err => {
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
      initUserPage();
      getTask(); 
    })
    .catch(err => {
      $("#msg").text('Email / password invalid');
      $("#displayError").show();
    })
  })

  $(".signOut").click((e) => {
    e.preventDefault();
    localStorage.clear();
    $("#userContent").hide();
    $("#loginPage").show();
    $(".signIn").show();
    $(".signUp").show();
    $(".signOut").hide();
  })

  function getTask () {
      $.ajax({
        url : "http://localhost:3000/users/task",
        method : "GET",
        headers : {
          token : localStorage.getItem("token")
        }
      })
      .done((response) => {
        $.each(response, (index, value) => {
          $("#toDoList")
          .append(`<div class="card content">
                  <div class="card-body">
                    <h5 class="card-title">${value.name}</h5>
                    <p class="card-subtitle mb-2 text-muted">Due date: ${value.date}</h6>
                    <p class="card-text">${value.description}</p>
                    <p class="card-text">Status : ${value.status}</p>
                    <button type="button" id="${value.id}" class="mr-3 btn btn-outline-primary" data-toggle="modal" data-target="#exampleModalCenter">
                      Update
                    </button>
                    <a href="#" onclick="return confirm('Are you sure you want to delete this item?');" class="card-link delete" id="${value.id}">Delete</a>
                  </div>
                </div>`)
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }
  
  function initUserPage() {
    $("#displaySuccess").hide();
    $("#displayError").hide();
    $("#loginPage").hide();
    $(".signUp").hide();
    $(".signIn").hide();
    $(".signOut").show();
    $("#userContent").show();
  }

  $("#addTask").click((e) => {
      e.preventDefault();
      $.ajax({
        url : "http://localhost:3000/users/addTask",
        method : "POST",
        data : {
          'token' : localStorage.getItem("token"),
          'taskName' : $("#toDoName").val(),
          'description' : $("#toDoDesc").val(),
          'status' : $("#toDoStatus").val(),
          'dueDate' : $("#toDoDate").val()
        }
      })
      .done((response) => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      })
  })
  
  $("#toDoList").on('click', '.delete', event => {
    const id = $(event.currentTarget).attr('id');
    $.ajax({
      url : `http://localhost:3000/users/delete/${id}`,
      method : "DELETE",
      data : {
        'token' : localStorage.getItem("token")
      }
    })
    .done((response) => {
      console.log(response);
    })
    .catch(err => {
      console.log(err);
    })
  })
  if (localStorage.getItem("token")) {
    initUserPage();
    getTask();
  }
});