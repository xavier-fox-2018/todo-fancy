const config = {
    host: 'http://localhost:3000'
}

function register() {
    $.ajax({
        method: 'POST',
        url: `${config.host}/register`,
        data: {
            username: $('#register-username').val(),
            email: $('#register-email').val(),
            password: $('#register-password').val()
        }
    })
        .done(function(result) {
            console.log('Register Result: ', result);
            $('#register-username').val('');
            $('#register-email').val('');
            $('#register-password').val('');
        })
        .fail(function(err) {
            console.log('Register Error: ', err);
            fillErrorBoard(err);
        });
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
            getGroups();
            getProfile();
        })
        .fail(function(err) {
            console.log("Login Error: ", err);
            fillErrorBoard(err);
        });
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: 'POST',
        url: `${config.host}/googlelogin`,
        data: {
            googleToken: id_token
        }
    })
        .done(function(result) {
            console.log('Google Login Result: ', result);
            localStorage.setItem('token', result.token);
            checkToken();
            getTodos();
            getGroups();
            getProfile();
        })
        .fail(function(err) {
            console.log('Google Login Error: ', err);
            fillErrorBoard(err);
        });
}

function logout() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
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

    // Only handling when creating task if title and dueDate are sent empty
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
    } else if (error.responseJSON.errors.dueDate && error.responseJSON.errors.title) {
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
        $('#registerForm').hide();
        $('#main-content').show();
        $('#group-content').show();
    } else {
        $('#btn-logout').hide();
        $('#form-login').show();
        $('#registerForm').show();
        $('#main-content').hide();
        $('#group-content').hide();
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
                    <div class="mb-3 d-flex justify-content-between align-items-center" id="div-todo-${todos[i]._id}">
                        <div class="ml-3 todos" onclick="seeDetail('${todos[i]._id}', '${escapedTitle}', '${escapedDescription}', '${todos[i].priority}', '${todos[i].dueDate}', '${todos[i].isDone}', '${todos[i].createdAt}', '${todos[i].updatedAt}')">${todos[i].title}</div>
                    </div>
                `);

                if (todos[i].isDone === true) {
                    $(`#div-todo-${todos[i]._id}`).append(`
                        <div class="bg-danger text-white p-2">Done <i class="fas fa-check-circle ml-1"></i></div>
                    `);
                    $(`#div-todo-${todos[i]._id}`).css({
                        background: '#ebb329'
                    });
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
        <div class="card mt-3 mb-3">
            <div class="card-body">
                <div class="d-flex justify-content-end align-items-center">
                    <i class="fas fa-edit text-dark mr-3" onclick="fillEditModal('${escapedTitle}', '${paramDesc}', '${priority}', '${arrRealTimestamps[2]}')" data-toggle="modal" data-target="#editTodo" id="btn-edit-delete"></i>
                    <i class="fas fa-minus-circle text-danger" onclick="deleteTodo('${id}')" id="btn-edit-delete"></i>
                </div>
                <p class="card-text"> <b>Title:</b><br> ${title}</p>
                <p class="card-text"> <b>Description:</b><br> ${description}</p>
                <p class="card-text"> <b>Priority:</b><br> ${priority}</p>
                <p class="card-text"> <b>Status:</b><br> ${done}</p>
                <p class="card-text"> <b>Due Date:</b><br> ${arrRealTimestamps[2]}</p>
                <div class="d-flex justify-content-between align-items-center mb-5">
                    <div class="card-text"> <b>Created At:</b><br> ${arrRealTimestamps[0]}</div>
                    <div class="card-text"> <b>Last Updated At:</b><br> ${arrRealTimestamps[1]}</div>
                </div>
                <div class="d-flex justify-content-center align-items-center">
                    <button class="btn btn-success mr-3" id="btn-done" onclick="done('${id}')">Mark as done</button>
                    <button class="btn btn-warning text-white ml-3" id="btn-undone" onclick="undone('${id}')">Mark as undone</button>
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

function done(id) {
    const token = localStorage.getItem('token');

    $.ajax({
        method: 'PATCH',
        url: `${config.host}/tasks/markdone/${id}`,
        headers: {
            'access-token': token
        }
    })
        .done(function(result) {
            console.log("Mark As Done Todo Result: ", result);
            getTodos();
            getProjectTodos();
        })
        .fail(function(err) {
            console.log("Mark As Done Todo Error: ", err);
            fillErrorBoard(err);
        });
}

function undone(id) {
    const token = localStorage.getItem('token');

    $.ajax({
        method: 'PATCH',
        url: `${config.host}/tasks/markundone/${id}`,
        headers: {
            'access-token': token
        }
    })
        .done(function(result) {
            console.log("Mark As Undone Todo Result", result);
            getTodos();
            getProjectTodos();
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

function emptyCreateProjectModal() {
    $('#create-project-title').val('');
    $('#create-project-description').val('');
    $('#create-project-priority').val('');
    $('#create-project-dueDate').val('');
}

function createProjectTodo() {
    const token = localStorage.getItem('token');
    const groupId = localStorage.getItem('groupId');

    $.ajax({
        method: 'POST',
        url: `${config.host}/tasks/group`,
        headers: {
            'access-token': token
        },
        data: {
            title: $('#create-project-title').val(),
            description: $('#create-project-description').val(),
            priority: $('#create-project-priority').val(),
            dueDate: $('#create-project-dueDate').val(),
            group: groupId
        }
    })
        .done(function(result) {
            console.log("Create Project Todo Result: ", result);
            getTodos();
            getGroups();
            getProjectTodos();
        })
        .fail(function(err) {
            console.log("Create Project Todo Error: ", err);
        });
}

function getProjectTodos() {
    const token = localStorage.getItem('token');
    const groupId = localStorage.getItem('groupId');

    $.ajax({
        method: 'GET',
        url: `${config.host}/tasks/group/${groupId}`,
        headers: {
            'access-token': token
        }
    })
        .done(function(todos) {
            console.log('Get Project Todos Result: ', todos);
            $('#project-todos').empty();
            $('#projecttodos-detail').empty();

            for (let i = 0; i < todos.length; i++) {
                const escapedTitle = todos[i].title.replace(/'/g, "\\'");
                const escapedDescription = todos[i].description.replace(/'/g, "\\'");

                $('#project-todos').append(`
                    <div class="mb-3 d-flex justify-content-between align-items-center" id="div-ptodo-${todos[i]._id}">
                        <div class="ml-3 todos" onclick="seeDetailTodoP('${todos[i]._id}', '${escapedTitle}', '${escapedDescription}', '${todos[i].priority}', '${todos[i].dueDate}', '${todos[i].isDone}', '${todos[i].createdAt}', '${todos[i].updatedAt}')">${todos[i].title}</div>
                    </div>
                `);

                if (todos[i].isDone === true) {
                    $(`#div-ptodo-${todos[i]._id}`).append(`
                        <div class="bg-danger text-white p-2">Done <i class="fas fa-check-circle ml-1"></i></div>
                    `);
                    $(`#div-ptodo-${todos[i]._id}`).css({
                        background: '#ebb329'
                    });
                }
            }
        })
        .fail(function(result) {
            console.log('Get Project Todo Error: ', err);
        });
}

function seeDetailTodoP(id, title, description, priority, dueDate, isDone, createdAt, updatedAt) {
    localStorage.setItem('taskProjectId', id);
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

    $('#projecttodos-detail').empty();
    $('#projecttodos-detail').append(`
        <div class="card mt-3 mb-3">
            <div class="card-body">
                <div class="d-flex justify-content-end align-items-center">
                    <i class="fas fa-edit text-dark mr-3" onclick="fillEditTodoPModal('${escapedTitle}', '${paramDesc}', '${priority}', '${arrRealTimestamps[2]}')" data-toggle="modal" data-target="#editProjectTodo" id="btn-edit-delete"></i>
                    <i class="fas fa-minus-circle text-danger" onclick="deleteTodo('${id}')" id="btn-edit-delete"></i>
                </div>
                <p class="card-text"> <b>Title:</b><br> ${title}</p>
                <p class="card-text"> <b>Description:</b><br> ${description}</p>
                <p class="card-text"> <b>Priority:</b><br> ${priority}</p>
                <p class="card-text"> <b>Status:</b><br> ${done}</p>
                <p class="card-text"> <b>Due Date:</b><br> ${arrRealTimestamps[2]}</p>
                <div class="d-flex justify-content-between align-items-center mb-5">
                    <div class="card-text"> <b>Created At:</b><br> ${arrRealTimestamps[0]}</div>
                    <div class="card-text"> <b>Last Updated At:</b><br> ${arrRealTimestamps[1]}</div>
                </div>
                <div class="d-flex justify-content-center align-items-center">
                    <button class="btn btn-success mr-3" id="btn-done" onclick="done('${id}')">Mark as done</button>
                    <button class="btn btn-warning text-white ml-3" id="btn-undone" onclick="undone('${id}')">Mark as undone</button>
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

function fillEditTodoPModal(title, description, priority, dueDate) {
    $('#edit-project-title').val(title);
    $('#edit-project-description').val(description);
    $('#edit-project-priority').val(priority);

    var date = new Date(dueDate);
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var today = date.getFullYear()+"-"+(month)+"-"+(day) ;

    $('#edit-project-dueDate').val(today);
}

function editProjectTodo() {
    const token = localStorage.getItem('token');
    const taskProjectId = localStorage.getItem('taskProjectId');

    $.ajax({
        method: 'PUT',
        url: `${config.host}/tasks/${taskProjectId}`,
        headers: {
            'access-token': token
        },
        data: {
            title: $('#edit-project-title').val(),
            description: $('#edit-project-description').val(),
            priority: $('#edit-project-priority').val(),
            dueDate: $('#edit-project-dueDate').val()
        }
    })
        .done(function(result) {
            console.log("Edit Todo Result: ", result);
            getTodos();
            getProjectTodos();
        })
        .fail(function(err) {
            console.log("Edit Todo Error: ", err);
            fillErrorBoard(err);
        });
}

function emptyCreateGroupModal() {
    $('#group-name').val('');
}

function createGroup() {
    const token = localStorage.getItem('token');

    $.ajax({
        method: 'POST',
        url: `${config.host}/users/group`,
        headers: {
            'access-token': token
        },
        data: {
            name: $('#group-name').val()
        }
    })
        .done(function(result) {
            console.log('Create Group Result: ', result);
            getGroups();
        })
        .fail(function(err) {
            console.log('Create Group Error: ', err);
            fillErrorBoard(err);
        });
}

function getProfile() {
    emptyErrorBoard();
    const token = localStorage.getItem('token');

    $.ajax({
        method: 'GET',
        url: `${config.host}/users/profile`,
        headers: {
            'access-token': token
        }
    })
        .done(function(result) {
            console.log('Get Profile Result: ', result);
            const totalInvite = result.invitationList.length;
            $('#invite-badge').text(totalInvite);

            $('#dropdown-invite').empty();
            for (let i = 0; i < result.invitationList.length; i++) {
                $('#dropdown-invite').append(`
                    <div class="d-flex justify-content-between align-items-center border mb-3 invitation-item rounded">
                        <div class="ml-3">Invitation to join ${result.invitationList[i].name}</div>
                        <div>
                            <button class="btn btn-primary mr-2" id="accept-${result.invitationList[i]._id}">Accept</button>
                            <button class="btn btn-danger mr-3" id="refuse-${result.invitationList[i]._id}">Refuse</button>
                        </div>
                    </div>
                `);

                $(`#accept-${result.invitationList[i]._id}`).on('click', function() {
                    acceptInvitation(result.invitationList[i]._id);
                });

                $(`#refuse-${result.invitationList[i]._id}`).on('click', function() {
                    refuseInvitation(result.invitationList[i]._id);
                });
            }
        })
        .fail(function(err) {
            console.log('Get Profile Error :', err);
            fillErrorBoard(err);
        });
}

function acceptInvitation(groupId) {
    const token = localStorage.getItem('token');

    $.ajax({
        method: 'PATCH',
        url: `${config.host}/users/accept`,
        headers: {
            'access-token': token
        },
        data: {
            group: groupId
        }
    })
        .done(function(result) {
            console.log('Refuse Invitation Result: ', result);
            getGroups();
            getProfile();
        })
        .fail(function(err) {
            console.log('Refuse Invitation Error: ', err);
            fillErrorBoard(err);
        });
}

function refuseInvitation(groupId) {
    const token = localStorage.getItem('token');

    $.ajax({
        method: 'PATCH',
        url: `${config.host}/users/refuse`,
        headers: {
            'access-token': token
        },
        data: {
            group: groupId
        }
    })
        .done(function(result) {
            console.log('Refuse Invitation Result: ', result);
            getGroups();
            getProfile();
        })
        .fail(function(err) {
            console.log('Refuse Invitation Error: ', err);
            fillErrorBoard(err);
        });
}

function getGroups() {
    emptyErrorBoard();
    const token = localStorage.getItem('token');

    $.ajax({
        method: 'GET',
        url: `${config.host}/users/profile`,
        headers: {
            'access-token': token
        }
    })
        .done(function(user) {
            const groups = user.groupList;
            console.log('Group List: ', groups);
            $('#group-list').empty();
            $('#group-detail').empty();

            for (let i = 0; i < groups.length; i++) {
                const escapedName = groups[i].name.replace(/'/g, "\\'");

                $('#group-list').append(`
                    <div class="mb-3 border d-flex justify-content-between align-items-center">
                        <div class="ml-3 groups" id="group-${groups[i]._id}">${groups[i].name}</div>
                    </div>
                `);

                $(`#group-${groups[i]._id}`).on('click', function() {
                    seeDetailGroup(groups[i]._id, escapedName, groups[i].userList);
                    getProjectTodos();
                });
            }
        })
        .fail(function(err) {
            console.log('Get Groups Error: ', err);
            fillErrorBoard(err);
        });
}

function seeDetailGroup(id, name, userList) {
    localStorage.setItem('groupId', id);
    $('#group-detail').empty();
    $('#group-detail').append(`
        <div class="card mt-3 mb-3">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start">
                    <p class="card-text"> <b>Name:</b><br> ${name}</p>
                    <button class="btn btn-primary" id="btn-invite-others" data-toggle="modal" data-target="#allUsers">Invite Others to Group</button>
                </div>
                <div id="div-users-${id}" class="mb-3">
                    <b>Users (username):</b><br>
                </div>
                <button class="btn btn-success" id="btn-project-todo" onclick="emptyCreateProjectModal()" data-toggle="modal" data-target="#createProjectTodo">Create project task</button>
            </div>
        </div>
    `);

    for (let i = 0; i < userList.length; i++) {
        $(`#div-users-${id}`).append(`
            <div class="">
                <p class="card-text">${userList[i].username}</p>
            </div>
        `);
    }

    $('#btn-invite-others').on('click', function() {
        getUninvitedUsers();
    });

    $('#div-btn-search').on('click', function() {
        getUninvitedUsers();
    });
}

function getUninvitedUsers() {
    const token = localStorage.getItem('token');
    const groupId = localStorage.getItem('groupId');
    emptyErrorBoard();
    $('#list-users').empty();

    if ($('#search-input').val() === '') {
        var usedUrl = `${config.host}/users/${groupId}`;
    } else if ($('#search-input').val() !== '') {
        const queryUsername = $('#search-input').val();
        var usedUrl = `${config.host}/users/${groupId}?username=${queryUsername}`;
    }

    $.ajax({
        method: 'GET',
        url: usedUrl,
        headers: {
            'access-token': token
        }
    })
        .done(function(users) {
            console.log('Uninvited User List: ', users);
            for (let i = 0; i < users.length; i++) {
                $('#list-users').append(`
                    <div class="d-flex justify-content-between rounded align-items-center mb-3 uninvited-users">
                        <div class="ml-3">${users[i].username}</div>
                        <button class="btn btn-danger" id="invite-${users[i]._id}">Invite</button>
                    </div>
                `);

                $(`#invite-${users[i]._id}`).on('click', function() {
                    sendInvitation(groupId, users[i].username);
                });
            }
        })
        .fail(function(err) {
            console.log('Get Uninvited Users Error: ', err);
            fillErrorBoard(err);
        });
}

function sendInvitation(groupId, username) {
    emptyErrorBoard();
    const token = localStorage.getItem('token');
    $.ajax({
        method: 'PATCH',
        url: `${config.host}/users/invite`,
        headers: {
            'access-token': token
        },
        data: {
            username: username,
            group: groupId
        }
    })
        .done(function(result) {
            console.log('Invitation Result: ', result);
            getUninvitedUsers();
        })
        .fail(function(err) {
            console.log('Invitation Error: ', err);
            fillErrorBoard(err);
        });
}

$('#form-login').on('submit', function(e) {
    e.preventDefault();
    login();
});

$('#form-register').on('click', function(e) {
    e.preventDefault();
    register();
});

$(document).ready(function() {
    checkToken();
    emptyErrorBoard();

    const token = localStorage.getItem('token');
    
    if (token) {
        getTodos();
        getGroups();
        getProfile();
    }
});