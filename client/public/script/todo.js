const url = 'https://todo.arul21.com'

$(document).ready( function() {
    checkLogin()
    myTodo()
})

function checkLogin() {
    let token = localStorage.getItem('token')
    if(!token) {
        window.location = '/'
    }
}

// function logout(){
//     gapi.load('auth2', function () {
//         // console.log('----asdsadas')
//         gapi.auth2.init()

//         localStorage.removeItem('token')
//         var auth2 = gapi.auth2.getAuthInstance();
//         auth2.signOut().then(function () {
//             console.log('User signed out.');
//             window.location ='/'
//         });
//     })  
// }

function logout(){
    localStorage.removeItem('token')
    window.location ='/'   
}






function myTodo(){
    $.ajax({
        url: `https://todo.arul21.com/task`,
        method: 'GET',
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done(function(result){
        $("#contentNow").text("")
        $("#contentNow").append(`
            <div class="card">
                <div class="card-header bg-dark text-white">My Todo Progress</div>
                <div class="card-body">
                    <div class="card" id="myTodo" style="border: 1px solid rgba(255, 2, 2, 0)">
                    </div>
                </div> 
            </div>
        `)
        result.task.forEach(task => {
           $("#myTodo").append(`
                <div class="card mb-3">
                    <div class="card-body">
                        <p class="text-dark">${task.name}</p>
                        <p> ${task.description} </p>
                        <button class="btn-sm btn-outline-success" onclick="setDone('${task._id}')">Done</button>
                        <button class="btn-sm btn-outline-primary" onclick="goUpdate('${task._id}')">Edit</button>
                        <button class="btn-sm btn-outline-danger" onclick="deleteTodo('${task._id}')">Delete</button>
                        
                    </div>
                    <div id="fb-root"></div>
                </div>
            `)
        }); 
    })
    .fail(function(err){
        failed(err);
    })
}


(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2&appId=2072079672813479&autoLogAppEvents=1';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));



function todoDone(){
    $.ajax({
        url: `https://todo.arul21.com/task/done`,
        method: 'GET',
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done(function(result){
        $("#contentNow").text("")
        $("#contentNow").append(`
            <div class="card">
                <div class="card-header bg-dark text-white">My Todo Complete</div>
                <div class="card-body">
                    <div class="card" id="TodoDone" style="border: 1px solid rgba(255, 2, 2, 0)">
                    </div>
                </div> 
            </div>
        `)
        result.task.forEach(task => {
           $("#TodoDone").append(`
                <div class="card mb-3">
                    <div class="card-body">
                        <p class="text-dark">${task.name}</p>
                        <p> ${task.description} </p>
                        <button class="btn-sm btn-outline-primary" onclick="setDo('${task._id}')">Cancel</button>
                        <button class="btn-sm btn-outline-danger" onclick="deleteDone('${task._id}')">Delete</button>
                    </div>
                </div>
            `)
        }); 
    })
    .fail(function(err){
        failed(err);
    })
}

function addTodo(){
    $("#contentNow").text("")
    $("#contentNow").append(`
    <div class="card" id="addTodo">
        <div class="card-header bg-dark text-white">Add New Todo</div>
        <div class="card-body">
            <input type="text" placeholder="Title todo..." class="form-control mb-3" autofocus required id="name" />
            <textarea class="form-control mb-3" placeholder="Description" id="description"></textarea>
            <input type='datetime-local' placeholder="Date Time" class="form-control mb-3" min="${new Date()}" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}" id="dueDate" required/>
            <input type='submit' class="btn btn-block btn-outline-primary mb-3" onclick="createTodo()" value="Save Todo"/>
        </div> 
    `)
}

function createTodo(){
    let name = $("#name").val()
    let description = $("#description").val()
    let dueDate = $("#dueDate").val()
    $.ajax({
        url:`https://todo.arul21.com/task`,
        method: "POST",
        data: {
            name: name,
            description: description,
            dueDate: dueDate
        },
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done(function(result){
        success(`Add New Task`)
        myTodo()
    })
    .fail(function(err){
        failed(err); 
    })
}
function fromDB(tgl) {
    let yyyy = tgl.substring(0, 4)
    let MM = tgl.substring(5, 7)
    let dd = tgl.substring(8, 10)
    let hh = tgl.substring(11, 13)
    let mm = tgl.substring(14, 16)
    return yyyy+'-'+MM+'-'+dd+'T'+hh+':'+mm
}

function goUpdate(id) {
    $.ajax({
        url:`https://todo.arul21.com/task/${id}`,
        method: 'GET',
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done( function(result) {
        console.log(result.task.name);
        $("#contentNow").text("")
        $("#contentNow").append(`
            <div class="card">
                <div class="card-header text-white bg-dark">Edit My Todo</div>
                <div class="card-body">
                    <input type="text" placeholder="Title todo..." class="form-control mb-3" autofocus required id="name" value="${result.task.name}"/>
                    <textarea class="form-control mb-3" placeholder="Description" id="description">${result.task.description}</textarea>
                    <input type='datetime-local' value="${fromDB(result.task.dueDate)}" placeholder="Date Time" class="form-control mb-3" min="${new Date()}" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}" id="dueDate" required/>
                    <input type='submit' class="btn btn-block btn-outline-primary mb-3" onclick="updateOne('${result.task._id}')" value="Update Todo"/>
                </div> 
                <div class="card-footer">Footer</div>
            </div>
        `)
    })
    .fail( function(error) {
        failed('get todo')
    })
}

function updateOne(id) {
    let name = $("#name").val()
    let description = $("#description").val()
    let dueDate = $("#dueDate").val()
    $.ajax({
        url: `https://todo.arul21.com/task/${id}`,
        method: 'PUT',
        data: {
            name: name,
            description: description,
            dueDate: dueDate,
        },
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done( function(result) {
        success('Successfully Updated')
        myTodo()
    })
    .fail( function(error) {
        failed('update todo')
        myTodo()
    })
}



function setDone(id){
    $.ajax({
        url: `https://todo.arul21.com/task/${id}/done`,
        method: 'PATCH',
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done(function(result){
        success(`Task Complete`)
        myTodo()
    })
    .fail(function(err){
        failed(err);   
    })
}

function setDo(id){
    $.ajax({
        url: `https://todo.arul21.com/task/${id}/do`,
        method: 'PATCH',
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done(function(result){
        success(`Task Uncomplete`)
        todoDone()
    })
    .fail(function(err){
        failed(err);   
    })
}

function deleteTodo(id){
    $.ajax({
        url: `https://todo.arul21.com/task/${id}`,
        method: 'DELETE',
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done(function(data){
        success(`Successfully remove`)
        myTodo()
    })
    .fail(function(err){
        failed(err);   
    })
}

function deleteDone(id){
    $.ajax({
        url:  `https://todo.arul21.com/task/${id}`,
        method: 'DELETE',
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done(function(data){
        success(`Successfully remove`)
        todoDone()
    })
    .fail(function(err){
        failed(err);   
    })
}


function success(msg) {
    $("#alert").append(`
        <div class="alert alert-success" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <p>Thank you, ${msg}</p>
        </div>
    `)
    setTimeout(() => {
        $("#alert").text("")
    }, 3000);
}

function failed(msg) {
    $("#alert").append(`
        <div class="alert alert-danger" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <p>Sorry, ${msg}</p>
        </div>
    `)
    setTimeout(() => {
        $("#alert").text("")
    }, 3000);
}