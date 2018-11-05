$(document).ready(() => {
    tokenReady()  
    getData()
    onLoad()
})

function onLoad() {
    gapi.load('auth2', function() {
      gapi.auth2.init();
    });
  }

function getStatus(data) {
    if (data === true) {
        return 'Completed'
    } else {
        return 'uncomplete'
    }
    
}

function getDate(date) {
    var today = new Date(date)
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10){
        mm='0'+mm;
    } 
    var today = dd+'/'+mm+'/'+yyyy;
    return today
}

function getData() {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/todo',
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done((response) =>{
        if (response.length >0) $('#placeholder').remove()
        $('.datas').remove()
        let i = 1;
        response.forEach(data => {
            $('#tableContent').append(`
            <tr class ="datas">
                <th scope="row">${i}</th>
                    <td>${data.title}</td>
                    <td>${data.description}</td>
                    <td>${getDate(data.dueDate)}</td>
                    <td>${data.priority}</td>
                    <td>${getStatus(data.isComplete)}</td>
                <td>
                    <i onclick="deleteTask('${data._id}')" class="fa fa-trash" data-toggle="tooltip" data-placement="top" title="delete"></i>
                    <i onclick="update('${data._id}', '${data.title}', '${data.description}', '${data.dueDate}', '${data.priority}')" class="fa fa-edit ml-4"data-toggle="tooltip" data-placement="top" title="edit"></i>
                    <i onclick="complete('${data._id}')" class="fa fa-check ml-4" data-toggle="tooltip" data-placement="top" title="complete"></i>
                    <i onclick="uncomplete('${data._id}')" class="fa fa-times-circle ml-4" data-toggle="tooltip" data-placement="top" title="uncomplete"></i>
                </td>
                <td></td>
            </tr>
        `)
        i++;
        });       
    })
    .fail((err) => {
        res.status(500).json({err})
    })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      localStorage.removeItem('token')
    //   console.log('hahah')
      tokenReady()
    });
}



function tokenReady() {
    let token = localStorage.getItem('token')
    if (!token) {
        location.replace('index.html')
        $('#logoutsss').hide()
    }
}

function createTodo() {
    let title = $('#title').val()
    let description = $('#description').val()
    let dueDate = $('#dueDate').val()
    let priority = $('#priority').val()

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/todo',
        data: {
            title: title,
            description: description,
            dueDate:dueDate,
            priority: priority
        },
        headers: {
           token: localStorage.getItem('token')
        }
    })
    .done((response) => {
        // console.log(response)
        $('#alert').addClass('alert alert-success')
        $('#alert').text(response.message)
        getData()
    })
    .fail((err) => {
        // console.log(err)
        $('#alert').addClass('alert alert-danger')
        $('#alert').text(err.responseJSON.message)
    })
}

function deleteTask(id){
    $.ajax({
        method: 'DELETE',
        url: `http://localhost:3000/todo/${id}`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done((response) => {
        $('#alert').addClass('alert alert-success')
        $('#alert').text(response.message)
        getData()
    })
    .fail((err) => {
        $('#alert').addClass('alert alert-danger')
        $('#alert').text(err.responseJSON.message)
        getData()
    })
}

function complete(id) {
    $.ajax({
        method: 'PATCH',
        url: `http://localhost:3000/todo/complete/${id}`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done((response) => {
        $('#alert').addClass('alert alert-success')
        $('#alert').text(response.message)
        getData()
    })
    .fail((err) => {
        $('#alert').addClass('alert alert-danger')
        $('#alert').text(err)
        console.log(err.responseJSON.err)
        getData()
    })
}

function uncomplete(id) {
    $.ajax({
        method: 'PATCH',
        url: `http://localhost:3000/todo/uncomplete/${id}`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done((response) => {
        $('#alert').addClass('alert alert-success')
        $('#alert').text(response.message)
        getData()
    })
    .fail((err) => {
        $('#alert').addClass('alert alert-danger')
        $('#alert').text(err.responseJSON.message)
        getData()
    })
}


function update(id, title, description, dueDate, priority) {
    // console.log(id, title, description, dueDate, priority)
    var now = new Date(dueDate)
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2); 
    var today = now.getFullYear()+"-"+(month)+"-"+(day) ;

    $('#editModal').modal()
    $('#titleEdit').val(title)
    $('#descriptionEdit').val(description)
    $('#dueDateEdit').val(today)
    $('#priorityEdit').val(priority)
    $('#idTodo').val(id)
    console.log(id)
}

function updateTodo() {
    let title = $('#titleEdit').val()
    let description =  $('#descriptionEdit').val()
    let dueDate= $('#dueDateEdit').val()
    let priority = $('#priorityEdit').val()
    let id = $('#idTodo').val()
    $.ajax({
        method: 'PUT',
        url: `http://localhost:3000/todo/${id}`,
        data: {
            title: title,
            description: description,
            dueDate: dueDate,
            priority:priority
        },
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done((response) => {
        $('#alert').addClass('alert alert-success')
        $('#alert').text(response.message)
        getData()
    })
    .fail((err) => {
        $('#alert').addClass('alert alert-danger')
        $('#alert').text(err.responseJSON.message)
        getData()
    })
}