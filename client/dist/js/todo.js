const  url = `http://localhost:3000/todo`

$(document).ready(function () {
    isLogin()
    getAllTodo()
})

function isLogin(){
    let token = localStorage.getItem('token')
    if(!token){
        window.location = '/login.html'
    }
}

function getAllTodo(){
    $.ajax({
        url: url,
        method : "GET",
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done(function(response){
        // console.log(response.todos)
        // $('.dataTodo').text('')
        response.todos.forEach(todo=>{
            $('.dataTodo').append(`
                <tr>
                    <td>${todo.name}</td>
                    <td>${todo.description}</td>
                    <td>
                    <div class="progress progress-xs">
                        <div class="progress-bar progress-bar-yellow" style="width: ${todo.progress}%"></div>
                    </div>
                    </td>
                    <td><span class="badge bg-yellow">${isDone(todo.status)}</span></td>
                    <td><span class="badge bg-blue"><a  class="showTodo" href= "#" value = "${todo._id}">Show/edit</a></span></td>
                </tr>
            `)
        })

    })
}

// $('.showTodo').click(function(){
//     // $('#formTodo').text('')
//     $.ajax({
//         method: "GET", 
//         url: url + 
//     })
// })

function isDone(boolean){
    if(boolean === true){
        return 'done'
    } else if(boolean === false){
        return 'not yet'
    }
}


function createTodo(){
    let data = {
      name : $('#name').val(),
      description : $('#description').val(),
      due_date : $('#due_date').val()
    }

    $.ajax({
      method: "POST",
      url: "http://localhost:3000/todo",
      data: data
    })
      .done(function(response){
        $('.callout').show()
      })
      .fail(function(message){

      })
}

$('#submitTodo').click(function(){
    createTodo()
})