$( document ).ready(function() {
  console.log( "ready!" );
  
  if (localStorage.getItem("token")) {
    initUserPage();
    getTask();
    onLoad();

    $(".signOut").click((e) => {
      var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          console.log('User signed out.');
        });
      localStorage.removeItem('token')
      window.location = '/index.html'
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
                      <p class="desc card-text">${value.description}</p>
                      <p class="card-text">Status : ${value.status}</p>
                      <button type="button" id="${value.id}" class="updateTask mr-3 btn btn-outline-primary" data-toggle="modal" data-target="#exampleModalCenter">
                        Update
                      </button>
                      <a href="#" onclick="return confirm('Are you sure you want to delete this item?');" class="card-link delete" id="${value.id}">Delete</a>
                    </div>
                  </div>`)
          })
        })
        .fail((err) => {
          console.log(err);
        })
    }
    
    function initUserPage() {
      $("#displaySuccess").hide();
      $("#displayError").hide();
      $(".signOut").show();
      $("#userContent").show();
    }

    function onLoad() {
      gapi.load('auth2', function () {
        gapi.auth2.init();
      })
    }
  
    $("#addTask").click((e) => {
        e.preventDefault();
        $.ajax({
          url : "http://localhost:3000/users/addTask",
          method : "POST",
          headers : {
            'token' : localStorage.getItem("token")
          },
          data : {
            'taskName' : $("#toDoName").val(),
            'description' : $("#toDoDesc").val(),
            'status' : $("#toDoStatus").val(),
            'dueDate' : $("#toDoDate").val()
          }
        })
        .done((response) => {
          console.log(response);
          location.reload(true);
        })
        .fail(err => {
          console.log(err);
        })
    })
    
    $("#toDoList").on('click', '.delete', event => {
      const id = $(event.currentTarget).attr('id');
      $.ajax({
        url : `http://localhost:3000/users/delete/${id}`,
        method : "DELETE",
        headers : {
          'token' : localStorage.getItem("token")
        }
      })
      .done((response) => {
        console.log(response);
        location.reload(true);
      })
      .fail(err => {
        console.log(err);
      })
    })
  
    $("#toDoList").on('click', '.updateTask', event => {
      const title = $(event.currentTarget).prevAll('h5').text();
      const description = $(event.currentTarget).prevAll('.desc').text();
      $("#descUpdate").val(description);
      $("#nameUpdate").val(title);$("#taskId").val($(event.currentTarget).attr('id'));
    })
  
    $("#clickUpdate").click((e) => {
      e.preventDefault();
      $.ajax({
        url : "http://localhost:3000/users/task/update",
        method : "PUT",
        headers : {
          token : localStorage.getItem("token")
        },
        data : {
          taskId : $("#taskId").val(),
          name : $("#nameUpdate").val(),
          desc : $("#descUpdate").val(),
          status : $("#statusUpdate").val(),
          date : $("#dateUpdate").val()
        }
      })
        .done((response) => {
          console.log(response);
          location.reload(true);
        })
        .fail(err => {
          console.log(err);
        })
  
    })
  } else {
    window.location = '/index.html'
  }
});