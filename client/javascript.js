function deleteTodo(_id){
    console.log(_id)
    $.ajax({
        method : 'DELETE',
        url : `http://localhost:3000/todo/${_id}`,
        headers : {
            jtoken : localStorage.getItem('token')
        }
    })
    .done( response => {
        console.log(response)
        $(`#${response._id}`).remove()
    })
    .fail( error => {
        console.log(error)
    })
}

function doneTodo(_id){
    console.log('done todo')
    $.ajax({
        method : 'PUT',
        url : `http://localhost:3000/todo/${_id}`,
        headers : {
            jtoken : localStorage.getItem('token')
        },
        data : {
            status : true
        }
    })
    .done(response => {
        $(`#${response._id}`).removeClass("bg-info");
 
        $(`#${response._id}`).addClass("bg-succes");

    })
    .catch( error => {
        console.log(error)
    })
}

function showTodo(todo){
  

    let bg = null
                    if( todo.status ) {
                        bg = 'bg-success'
                    }else {
                        bg = 'bg-info'
                    }
                    let due_status = new Date(todo.due_status).toISOString().split('T')[0];
                    let todoHtml = `
                    <li class="list-group-item ${bg}" id= ${todo._id}>
                        <div class="container">

                            <h3>${todo.name}</h3>
                            <p> ${todo.description} </p>
                            <input type="date" value=${due_status}>
                            <br>
                            <br>
                            <ul class="list-inline">
                                <li class="list-inline-item"><button class="btn btn-warning" type="button"
                                    data-toggle="modal" data-target="#mytodo" data-id="${todo._id}" data-name="${todo.name}" data-due_status="${todo.due_status}" data-description ="${todo.description}">Update</button></li>
                                <li  class="list-inline-item"> <button class="btn btn-danger" onclick=deleteTodo("${todo._id}")>Delete</button></li>
                                <li  class="list-inline-item"> <button class="btn btn-success" onclick=doneTodo("${todo._id}")>Done</button></li>
                            </ul>

                        </div>
                    </li>
                    <br>
                    `

                    $("#todo-list").append(todoHtml)
}

function reaload (){
    $("#todo-list").empty()
    $.ajax({
        method : 'GET',
        url : 'http://localhost:3000/todo',
        headers : {
            jtoken : localStorage.getItem('token')
        }
    })
    .done( user => {
        let todoes = user.todoes
        if( todoes.length === 0 ){
            $("#empty-todo").text('your todo is empty')
        }else{
            user.todoes.forEach(todo => {
                showTodo(todo)
            })
        }
       
       $("#todo").show()
    })
    .fail( error => {
        showerror(error)
    })
}
function onSignIn(googleUser) {
    var gtoken = googleUser.getAuthResponse().id_token;
    
    $.ajax({
        method : 'POST',
        url : "http://localhost:3000/users/gsignin",
        data : { gtoken }
    })
    .done( jwtToken => {
        console.log('succes login google')
        localStorage.setItem('token', jwtToken)
        $("#jumbotron").hide()
        $("#google-signin-button").hide()
        $("#google-sign-out-button").show()
        
        reaload()
    })
    .catch( error => {
      showerror(error, 'error')
    })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      localStorage.clear()
      $("#jumbotron").show()
      $("#google-signin-button").show()
      $("#google-sign-out-button").hide()
      $("#todo").hide()
    });
}

$("#btn-create-todo").click( function (){
    console.log('create todo')
    $.ajax({
        method : 'POST',
        url : 'http://localhost:3000/todo',
        headers : {
            jtoken : localStorage.getItem("token")
        },
        data : {
            name : $("#name-form-add-todo").val(),
            description : $("#description-form-add-todo").val(),
            due_status : $("#due_status-form-add-todo").val()
        }
    })
    .done( newtodo => {
        console.log('berhasil create todo')
        console.log(newtodo)
       showTodo(newtodo)
    })
    .fail( error => {
        console.log('error create todo')
        console.log(error)
        showerror(error,'error-create')
    })
})


$('#mytodo').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    let id = button.data('id')
    let name = button.data('name')
    let description = button.data('description')
    let due_status = new Date( button.data('due_status')).toISOString().split('T')[0];
    var modal = $(this)
    modal.find('#name-modal-update-todo').val( name )
    modal.find('#description-modal-update-todo').text( description )
    modal.find('#due_status-modal-update-todo').val( due_status )
    modal.find('#todo-id').val(id)
})

$("#btn-update-todo").click(function(){
    let _id = $('#todo-id').val()
    let name = $('#name-modal-update-todo').val()
    let description = $('#description-modal-update-todo').val()
    let due_status = $('#due_status-modal-update-todo').val()

    $.ajax({
        method : 'PUT',
        url : `http://localhost:3000/todo/${_id}`,
        headers : {
            jtoken : localStorage.getItem('token')
        },
        data : {
            name, description, due_status
        }
    })
    .done( response => {
        //$("#btn-update-todo").attr('data-dismiss','modal')
        console.log('succes update')
        //$(`li#${response._id}`).children("h3").text(response.name)
        //$(`li#${response._id}`).children("p").text(response.description)
        //$(`li#${response._id}`).children("input").val(response.due_status)
        //$(`li#${response._id}`).children(".list-inline").children(".btn btn-warning").data('name',response.name)
        //$(`li#${response._id}`).children(".list-inline").children(".btn btn-warning").data('due_status',response.due_status)
        //$(`li#${response._id}`).children(".list-inline").children(".btn btn-warning").data('description',response.description)
        reaload()
        $("#mytodo").modal('toggle')
        //console.log($(`li#${response._id}`).children(".list-inline").children(".btn btn-warning").attr().each(i))
       
       

    })
    .fail( error => {
        console.log(error)
        showerror(error, 'error-update')
    })
})