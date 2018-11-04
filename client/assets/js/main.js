const config = {
    host: 'http://localhost:3000'
}

function login() {
    $.ajax({
        method: 'POST',
        url: `${config.host}/login`,
        data: {
            email: $('#login-email').val(),
            password: $('#login-password').val()
        }
    })
        .done(function(result) {
            localStorage.setItem('token', result.token);
            $('#login-email').val('');
            $('#login-password').val('');
            $('#todo-list').empty();
            $('#todo-detail').empty();
            checkToken();
            getTodos();
        })
        .fail(function(err) {
            console.log("Login Error: ", err);
            fillErrorBoard(err);
        });
}

function logout() {
    // var auth2 = gapi.auth2.getAuthInstance();
    // auth2.signOut().then(function () {
    //   console.log('User signed out.');
    // });
    localStorage.removeItem('token');
    checkToken();
}

function fillErrorBoard(error) {
    $('#error-status').empty();
    $('#error-msg').empty();

    $('#error-status').text(`${error.status} ${error.statusText}`);
    $('#error-status').css({
        display: 'block',
        color: 'red',
        fontWeight: 'bold',
        fontSize: '40px',
        fontFamily: 'Oswald',
        border: '1px solid black',
        width: '300px',
        padding: '15px',
        margin: '0 auto'
    });

    if (error.responseJSON.errors.dueDate && !error.responseJSON.errors.title) {
        $('#error-msg').text(`${error.responseJSON.errors.dueDate.message}`);
        $('#error-msg').css({
            display: 'block',
            color: 'red',
            fontWeight: 'bold',
            fontSize: '40px',
            fontFamily: 'Oswald',
            border: '1px solid black',
            width: '300px',
            padding: '15px',
            margin: '0 auto'
        });
    } else if (!error.responseJSON.errors.dueDate && error.responseJSON.errors.title) {
        $('#error-msg').text(`${error.responseJSON.errors.title.message}`);
        $('#error-msg').css({
            display: 'block',
            color: 'red',
            fontWeight: 'bold',
            fontSize: '40px',
            fontFamily: 'Oswald',
            border: '1px solid black',
            width: '300px',
            padding: '15px',
            margin: '0 auto'
        });
    } else { // have both errors
        $('#error-msg').text(`${error.responseJSON.errors.title.message} & ${error.responseJSON.errors.dueDate.message}`);
        $('#error-msg').css({
            display: 'block',
            color: 'red',
            fontWeight: 'bold',
            fontSize: '40px',
            fontFamily: 'Oswald',
            border: '1px solid black',
            width: '300px',
            padding: '15px',
            margin: '0 auto'
        });
    }
}

function emptyErrorBoard() {
    $('#error-status').empty();
    $('#error-msg').empty();

    $('#error-status').css('display', 'none');
    $('#error-msg').css('display', 'none');
}

function checkToken() {
    const token = localStorage.getItem('token');

    if (token) {
        $('#btn-logout').show();
        $('#form-login').hide();
        $('#main-content').show();
    } else {
        $('#btn-logout').hide();
        $('#form-login').show();
        $('#main-content').hide();
    }
}

function getTodos() {
    emptyErrorBoard();
    const token = localStorage.getItem('token');

    $.ajax({
        method: 'GET',
        url: `${config.host}/tasks`,
        headers: {
            'access-token': token
        }
    })
        .done(function(todos) {
            console.log("Todo List: ", todos);
            $('#todo-list').empty();
            $('#todo-detail').empty();

            for (let i = 0; i < todos.length; i++) {
                const escapedTitle = todos[i].title.replace(/'/g, "\\'");
                const escapedDescription = todos[i].description.replace(/'/g, "\\'");

                $('#todo-list').append(`
                    <div class="mb-3 border d-flex justify-content-between align-items-center" id="div-todo-${todos[i]._id}">
                        <h4 class="h4" onclick="seeDetail('${todos[i]._id}', '${escapedTitle}', '${escapedDescription}', '${todos[i].priority}', '${todos[i].dueDate}', '${todos[i].isDone}', '${todos[i].createdAt}', '${todos[i].updatedAt}')">${todos[i].title}</h4>
                    </div>
                `);

                if (todos[i].isDone === true) {
                    $(`#div-todo-${todos[i]._id}`).append(`
                        <div class="bg-danger text-white p-2">Done <i class="fas fa-check-circle ml-1"></i></div>
                    `);
                }
            }
        })
        .fail(function(err) {
            console.log("Get Todos Error: ", err);
            fillErrorBoard(err);
        });
}

function seeDetail(id, title, description, priority, dueDate, isDone, createdAt, updatedAt) {
    localStorage.setItem('taskId', id);
    let arrTimestamps = [createdAt, updatedAt, dueDate];
    let arrRealTimestamps = [];
    const escapedTitle = title.replace(/'/g, "\\'");

    for(let i = 0; i < arrTimestamps.length; i++) {
        let date = new Date(arrTimestamps[i]);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        let newDate = `${day}/${month}/${year}`;
        arrRealTimestamps.push(newDate);
    }

    if (description === 'null' || description === '') {
        description = '-';
        const escapedDescription = description.replace(/'/g, "\\'");
        var paramDesc = escapedDescription;
    } else {
        const escapedDescription = description.replace(/'/g, "\\'");
        var paramDesc = escapedDescription;
    }

    if (isDone === 'false') {
        var done = 'Not done yet';
    } else {
        var done = 'Done';
    }

    $('#todo-detail').empty();
    $('#todo-detail').append(`
        <div class="card mt-3">
            <div class="card-body">
                <div class="d-flex justify-content-end align-items-center">
                    <i class="fas fa-edit text-dark mr-3" onclick="fillEditModal('${escapedTitle}', '${paramDesc}', '${priority}', '${arrRealTimestamps[2]}')" data-toggle="modal" data-target="#editTodo" id="btn-edit-delete"></i>
                    <i class="fas fa-minus-circle text-danger" onclick="deleteTodo('${id}')" id="btn-edit-delete"></i>
                </div>
                <p class="card-text"> <b>Description:</b><br> ${description}</p>
                <p class="card-text"> <b>Priority:</b><br> ${priority}</p>
                <p class="card-text"> <b>Status:</b><br> ${done}</p>
                <p class="card-text"> <b>Due Date:</b><br> ${arrRealTimestamps[2]}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="card-text"> <b>Created At:</b><br> ${arrRealTimestamps[0]}</div>
                    <div class="card-text"> <b>Last Updated At:</b><br> ${arrRealTimestamps[1]}</div>
                </div>
                <div class="d-flex justify-content-center align-items-center">
                    <button class="btn btn-success mr-3" id="btn-done" onclick="done()">Mark as done</button>
                    <button class="btn btn-warning" id="btn-undone" onclick="undone()">Mark as undone</button>
                </div>
            </div>
        </div>
    `);

    if (done === 'Done') {
        $('#btn-done').prop('disabled', true);
    } else {
        $('#btn-undone').prop('disabled', true);
    }
}

function deleteTodo(id) {
    const token = localStorage.getItem('token');

    $.ajax({
        method: 'DELETE',
        url: `${config.host}/tasks/${id}`,
        headers: {
            'access-token': token
        }
    })
        .done(function(result) {
            console.log("Delete Todo Result: ", result);
            getTodos();
        })
        .fail(function(err) {
            console.log("Delete Todo Error: ", err);
            fillErrorBoard(err);
        });
}

function fillEditModal(title, description, priority, dueDate) {
    $('#edit-title').val(title);
    $('#edit-description').val(description);
    $('#edit-priority').val(priority);

    var date = new Date(dueDate);
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var today = date.getFullYear()+"-"+(month)+"-"+(day) ;

    $('#edit-dueDate').val(today);
}

function editTodo() {
    const token = localStorage.getItem('token');
    const taskId = localStorage.getItem('taskId');

    $.ajax({
        method: 'PUT',
        url: `${config.host}/tasks/${taskId}`,
        headers: {
            'access-token': token
        },
        data: {
            title: $('#edit-title').val(),
            description: $('#edit-description').val(),
            priority: $('#edit-priority').val(),
            dueDate: $('#edit-dueDate').val()
        }
    })
        .done(function(result) {
            console.log("Edit Todo Result: ", result);
            getTodos();
        })
        .fail(function(err) {
            console.log("Edit Todo Error: ", err);
            fillErrorBoard(err);
        });
}

function done() {
    const token = localStorage.getItem('token');
    const taskId = localStorage.getItem('taskId');

    $.ajax({
        method: 'PATCH',
        url: `${config.host}/tasks/markdone/${taskId}`,
        headers: {
            'access-token': token
        }
    })
        .done(function(result) {
            console.log("Mark As Done Todo Result: ", result);
            getTodos();
        })
        .fail(function(err) {
            console.log("Mark As Done Todo Error: ", err);
            fillErrorBoard(err);
        });
}

function undone() {
    const token = localStorage.getItem('token');
    const taskId = localStorage.getItem('taskId');

    $.ajax({
        method: 'PATCH',
        url: `${config.host}/tasks/markundone/${taskId}`,
        headers: {
            'access-token': token
        }
    })
        .done(function(result) {
            console.log("Mark As Undone Todo Result", result);
            getTodos();
        })
        .fail(function(err) {
            console.log("Mark As Undone Todo Error", err);
            fillErrorBoard(err);
        });
}

function emptyCreateModal() {
    $('#create-title').val('');
    $('#create-description').val('');
    $('#create-priority').val('');
    $('#create-dueDate').val('');
}

function createTodo() {
    const token = localStorage.getItem('token');

    $.ajax({
        method: 'POST',
        url: `${config.host}/tasks`,
        headers: {
            'access-token': token
        },
        data: {
            title: $('#create-title').val(),
            description: $('#create-description').val(),
            priority: $('#create-priority').val(),
            dueDate: $('#create-dueDate').val()
        }
    })
        .done(function(result) {
            console.log("Create Todo Result: ", result);
            getTodos();
        })
        .fail(function(err) {
            console.log("Create Todo Error: ", err);
            fillErrorBoard(err);
        });
}

$('#form-login').on('submit', function(e) {
    e.preventDefault();
    login();
})

$(document).ready(function() {
    checkToken();
    emptyErrorBoard();

    const token = localStorage.getItem('token');
    
    if (token) {
        getTodos();
    }
});