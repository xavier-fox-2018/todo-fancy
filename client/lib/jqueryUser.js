$("#signOut").click(function() {
  localStorage.removeItem('name')
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  window.location = "http://localhost:5500/index.html";
})

$.ajax({
  method: "GET",
  url: `http://localhost:4000/api/user/verifytoken/${localStorage.getItem('token')}`
})
  .done(function (result) {
    let localName = localStorage.getItem('name')
    let localId = localStorage.getItem('userId')
    console.log(result)
    if ((result.id.name != localName) || (result.id._id != localId)) {
      localStorage.removeItem('name')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      window.location = "http://localhost:5500/index.html";
    }
  })
  .fail(function (err) {
    console.log(err)
  })

function getDate (input) {
  return `${new Date(input).getMonth()}/${new Date(input).getDate()}/${new Date(input).getFullYear()}`
}

$("#errorCreateTask").hide()
$("#successCreateTask").hide()

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.fixed-action-btn');
  var instances = M.FloatingActionButton.init(elems, {
    direction: 'right'
  });
});

$(document).ready(function () {
  $('.collapsible').collapsible();
});

$(document).ready(function () {
  $('.datepicker').datepicker({
    format: 'mm/dd/yyyy',
    selectMonths: true,
    selectYears: 15
  });
});

$(document).ready(function () {
  $('select').formSelect();
});

// POPULATING THE PAGE
function populateTasks() {
  $("#progressCol").empty()
  $("#newCol").empty()
  $("#finishCol").empty()
  $("#backlogCol").empty()
  $("#allTaskUpdate").empty()

  $.getJSON(`http://localhost:4000/api/user/${localStorage.getItem('userId')}`)
    .done(function(data) {
      console.log(data)
      data = data[0]
      for (let i in data.tasksId) {
        console.log(i)
        let eachData = `
          <li>
            <div class="collapsible-header">${data.tasksId[i].name}</div>
            <div class="collapsible-body">
              <p>${data.tasksId[i].description}</p>
              <p class="red-text">${getDate(data.tasksId[i].dueDate)}</p>
              <br>
              <a class="modal-trigger btn-floating waves-effect waves-light red" href="#${data.tasksId[i]._id}"><i class="material-icons">edit</i></a>
            </div>
          </li>
          `

          let eachModal = `
            <div id="${data.tasksId[i]._id}" class="modal">
    
              <div class="modal-content center-align">
                <h4>Change task content</h4>

              <!-- Error when creating -->
                <div class="row errorUpdateTask">
                  <div class="col s12 card red white-text">
                    <h6>Something went wrong. Try again.</h6>
                  </div>
                </div>

                <!-- Success when creating -->
                <div class="row successUpdateTask">
                  <div class="col s12 card teal lighten-2 white-text">
                    <h6>Successfully updated your new task.</h6>
                  </div>
                </div>
            
                <!-- INPUT FOR UPDATING -->
                <div class="row">
                  <div class="input-field col s12">
                    <input value="${data.tasksId[i].name}" id="${data.tasksId[i]._id}name" type="text" class="validate" required>
                  </div>
                </div>
            
                <div class="row">
                  <div class="input-field col s12">
                    <input value="${data.tasksId[i].description}" id="${data.tasksId[i]._id}description" type="text" class="validate" required>
                  </div>
                </div>

                <div class="row">
                  <div class="input-field col s12">
                    <input value="${getDate(data.tasksId[i].dueDate)}" id="${data.tasksId[i]._id}dueDate" type="text" class="datepicker">
                  </div>
                </div>

                <div class="row">
                  <div class="input-field col s12">
                    <p class="range-field">
                      <input value="${data.tasksId[i].priority}" type="range" id="${data.tasksId[i]._id}priority" min="0" max="100" />
                    </p>
                  </div>
                </div>

                <div class="row">
                  <div class="input-field col s12">
                    <select id="${data.tasksId[i]._id}status">
                      <option value="Backlog">Backlog</option>
                      <option value="New">New</option>
                      <option value="Progress">Progress</option>
                      <option value="Finish">Finish</option>
                    </select>
                  </div>
                </div>

                <div class="modal-footer">
                <button type="submit" class="waves-effect waves-green btn-flat deleteTask" id="${data.tasksId[i]._id}">Delete</button>
                  <button type="submit" class="waves-effect waves-green btn-flat updateTask" id="${data.tasksId[i]._id}">Update</button>
                  <a href="#!" class="modal-close waves-effect waves-green btn-flat" id="closeAddTaskModal">Close</a>
                </div>
              </div>
            </div>
          `

        data.tasksId[i].status === "Progress" ? $("#progressCol").append(eachData) && $("#allTaskUpdate").append(eachModal) :
        data.tasksId[i].status === "New" ? $("#newCol").append(eachData) && $("#allTaskUpdate").append(eachModal) :
        data.tasksId[i].status === "Finish" ? $("#finishCol").append(eachData) && $("#allTaskUpdate").append(eachModal) :
        data.tasksId[i].status === "Backlog" ? $("#backlogCol").append(eachData) && $("#allTaskUpdate").append(eachModal) : null

        // $(document).ready(function () {
        //   $(`#${}`).modal(data.tasksId[i]._id);
        // });
        $(document).ready(function () {
          $('.modal').modal();
        });

        $(document).ready(function () {
          $('.datepicker').datepicker({
            format: 'mm/dd/yyyy',
            selectMonths: true,
            selectYears: 15
          });
        });

        $(document).ready(function () {
          $('select').formSelect();
        });

        $(".errorUpdateTask").hide()
        $(".successUpdateTask").hide()

        $(".updateTask").click(function () {
          let eachTaskId = $(this).prop('id')

          $.ajax({
            method: "PUT",
            url: `http://localhost:4000/api/task/${eachTaskId}`,
            data: {
              "name": $(`#${eachTaskId}name`).val(),
              "description": $(`#${eachTaskId}description`).val(),
              "priority": Number($(`#${eachTaskId}priority`).val()),
              "status": $(`#${eachTaskId}status`).val(),
              "dueDate": new Date($(`#${eachTaskId}dueDate`).val())
            }
          })
            .done(function (result) {
              if (result.message === "Task successfully updated") {
                $("#successCreateTask").fadeIn().delay(5000).fadeOut()
                $(`#${eachTaskId}name`).val("")
                $(`#${eachTaskId}description`).val("")
                $(`#${eachTaskId}dueDate`).val("")
                $(`#${eachTaskId}status`).val("")
                $(`#${eachTaskId}priority`).val(50)

                $("#closeAddTaskModal").click()
                location.reload();

              } else {
                $("#errorCreateAccount").fadeIn().delay(5000).fadeOut()
              }
            })
            .fail(function () {
              $("#errorCreateAccount").fadeIn().delay(5000).fadeOut()
            })

        })

        $(".deleteTask").click(function () {
          let eachTaskId = $(this).prop('id')

          $.ajax({
            method: "DELETE",
            url: `http://localhost:4000/api/task/${eachTaskId}`
          })
            .done(function (result) {
              if (result.message === "Task successfully removed") {
                location.reload();

              } else {
                $("#errorCreateAccount").fadeIn().delay(5000).fadeOut()
              }
            })
            .fail(function () {
              $("#errorCreateAccount").fadeIn().delay(5000).fadeOut()
            })

        })

      }
    })
}

populateTasks()

$("#submitCreateTask").click(function() {
  if ($("#name").val().length < 1) {
    $("#errorCreateTask").fadeIn().delay(3000).fadeOut()
  } else if ($("#description").val().length < 1) {
    $("#errorCreateTask").fadeIn().delay(3000).fadeOut()    
  } else if ($("#dueDate").val().length < 1) {
    $("#errorCreateTask").fadeIn().delay(3000).fadeOut()        
  } else if ($("#status").val() === null) {
    $("#errorCreateTask").fadeIn().delay(3000).fadeOut()            
  } else {
    $.ajax({
      method: "POST",
      url: `http://localhost:4000/api/task/${localStorage.getItem('userId')}`,
      data: {
        "name": $("#name").val(),
        "description": $("#description").val(),
        "priority": Number($("#priority").val()),
        "status": $("#status").val(),
        "dueDate": new Date($("#dueDate").val())
      }
    })
      .done(function (result) {
        if (result.message === "Task successfully added") {
          $("#successCreateTask").fadeIn().delay(5000).fadeOut()
          $("#name").val("")
          $("#description").val("")
          $("#dueDate").val("")
          $("#status").val("")
          $("#priority").val(50)

          $("#closeAddTaskModal").click()
          populateTasks()

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

$(document).ready(function () {
  $('.modal').modal();
});

