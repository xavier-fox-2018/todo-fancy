// when document ready
$(document).ready(() => {
  if (!localStorage.getItem('token')) {
    location.replace('./')
  }
  onLoad()
  let token = localStorage.getItem('token')
  let user = localStorage.getItem('name')
  $("#welcome").text(`Hello, ${user}!`)
  $.ajax({
    url: 'http://localhost:3000/todo/task',
    method: 'GET',
    headers: { token }
  })
    .done(response => {
      if (response.length) {
        response.forEach(val => {
          let check = 'Check'
          let btn_type = ''
          if (val.status) {
            check += 'ed'
            btn_type = 'btn-success'
          } else {
            btn_type = 'btn-secondary'
          }
          $("#listTodo").append(`
            <div class="row border border-primary p-3 rounded m-2 text-white bg-semi-transparent-dark">
              <p class="col-3">${val.due_date.slice(0, 10)}</p>
              <p class="col-6 h5"><strong>${val.name}</strong></p>
              <div class="col-3">
              <button type="button" class="btn btn-primary edit" value="${val._id}" data-toggle="modal" data-target="#updateTodo">Edit</button>
              <button type="button" class="btn btn-danger delete" value="${val._id}">Delete</button>
              </div>
              <div class="col-9">
                <h6 class="text-white text-left">Description:</h6>
                <pre style="font-family: Arial, Helvetica, sans-serif; font-size: 1em;"><p class="text-left ml-3 text-white ">${val.description}</p></pre>
              </div>
              <div class="col-3">
                <button type="button" class="mt-4 btn ${btn_type} check" value="${val._id}">${check}</button>
            </div>
          `)
        })
      } else {
        $("#listTodo").append(`
        <p>You don't have any task right now</p>
        `)
      }
    })
    .fail(error => {
      console.log(error)
    })
})

// to create a new task
$("#createTask").click(() => {
  let data = {
    name: $("#name").val(),
    description: $("#description").val(),
    due_date: $("#dueDate").val()
  }

  let token = localStorage.getItem('token')
  
  $.ajax({
    url: 'http://localhost:3000/todo/task',
    method: 'POST',
    headers: { token },
    data
  })
    .done(response => {
      console.log(response)
    })
    .fail(error => {
      alert(error)
      console.log(error)
    })

  $("#name").val("")
  $("#description").val("")
  $("#dueDate").val("")
})

// when closing the create new task modal
$("#cancel").click(() => {
  location.reload()
})

// check button here
$("#listTodo").on('click', '.check', event => {
  let token = localStorage.getItem('token')
  let id = $(event.currentTarget).val()
  let check = $(event.currentTarget).text()

  $(event.currentTarget).click(() => {
    if (check == 'Check') {
      $.ajax({
        url: 'http://localhost:3000/todo/check',
        method: 'PUT',
        headers: { token },
        data: { check, id }
      })
        .done(response => {
          $(event.currentTarget).text('Checked')
          console.log('success', response)
          location.reload()
        })
        .fail(error => {
          console.log('fail', error)
        })
    } else {
      $.ajax({
        url: 'http://localhost:3000/todo/check',
        method: 'PUT',
        headers: { token },
        data: { check, id }
      })
        .done(response => {
          $(event.currentTarget).text('Check')
          console.log('success', response)
          location.reload()
        })
        .fail(error => {
          console.log('fail', error)
        })
    }
    $(event.currentTarget).off()
  })
})

// now to the update thing
let updateCount = 0
$("#listTodo").on('mouseover click', '.edit', event => {
  let token = localStorage.getItem('token')
  updateCount++
  if (updateCount > 1) {
    $(event.currentTarget).off()
  }
  let updateId = $(event.currentTarget).val()
  $(event.currentTarget).click(() => {
    $.ajax({
      url: 'http://localhost:3000/todo/onetask',
      method: 'GET',
      headers: { id: updateId, token }
    })
    .done(data => {
        $("#updateName").val(data.name)
        $("#updateDescription").val(data.description)
        $("#updateDueDate").val(data.due_date.slice(0, 10))
        $("#updateTask").val(updateId)
        $(event.currentTarget).off()
      })
      .fail(error => {
        console.log(error)
        alert(error)
      })
    })
})

// confirmation button
$("#updateTask").click(() => {
  let token = localStorage.getItem('token')
  let updateData = {
    name: $("#updateName").val(),
    description: $("#updateDescription").val(),
    due_date: new Date($("#updateDueDate").val())
  }
  $.ajax({
    url: 'http://localhost:3000/todo/task',
    method: 'PUT',
    headers: { id: $("#updateTask").val(), token },
    data: updateData
  })
    .done(response => {
      console.log(response)
      $("#updateTask").val("")
      location.reload()
    })
    .fail(error => {
      console.log(error)
      alert('Error!')
    })
})

let deleteCount = 0
$("#listTodo").on('mouseover click', '.delete', event => {
  let token = localStorage.getItem('token')
  deleteCount++
  if (deleteCount > 1) {
    $(event.currentTarget).off()
  }
  let deleteId = $(event.currentTarget).val()
  $(event.currentTarget).click(() => {
    if (confirm('Are you sure?')) {
      $.ajax({
        url: 'http://localhost:3000/todo/task',
        method: 'DELETE',
        headers: { id: deleteId, token }
      })
        .done(response => {
          console.log(response)
          location.reload()
        })
        .fail(error => {
          console.log(error)
          alert('Error!')
        })
    }
  })
})
// yep. its for signout button
$("#signOut").click(() => {
  let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  localStorage.removeItem('token')
  localStorage.removeItem('name')
  window.location.replace('./')
})

// function for google sign out
function onLoad() {
  gapi.load('auth2', function() {
    gapi.auth2.init();
  });
}