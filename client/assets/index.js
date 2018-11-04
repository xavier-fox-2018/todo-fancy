const config = {
    port : 'http://localhost:3000'
}

$( document ).ready(function(){
    checkToken()
    getUserData()
    getGroupsData()
})

function checkToken(){
    let token = localStorage.getItem('token')
    if(!token){
        window.location = 'login.html'
    }
}

function logOut(){
    localStorage.removeItem('token')
    checkToken()
}

function getUserData(){
    $.ajax({
        method : 'GET',
        url : `${config.port}/users`,
        headers : {
            token : localStorage.getItem('token')
        }
    })
    .done(userData=>{
        $(' #personal_task_list ').empty()
        let taskList = userData.todo_list
        console.log(taskList)
        for(let i = 0 ; i < taskList.length ; i ++){
            $(' #personal_task_list ').append(`
                <div class="col-sm-12 mb-3">
                    <div class="row rounded bg-white z-depth-1">
                        <div class="col-sm-8">
                            <h5>${taskList[i].name}<h5>
                            <small>${taskList[i].description}</small>
                        </div>
                        <div class="col-sm-4">
                            <div class="d-flex justify-content-end mt-2 mb-2">
                                <div class="btn z-depth-1 text-dark dusty-grass-gradient rounded" style="cursor:pointer" onclick="selectTask('${taskList[i]._id}')" data-toggle="modal" data-target="#editModal"><i class="fas fa-edit"></i></div>
                                <div class="btn z-depth-1 text-dark ripe-malinka-gradient rounded ml-2" style="cursor:pointer" onclick="deleteTask('${taskList[i]._id}')"><i class="fas fa-trash-alt"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
            `)
        }
    })
    .fail(err=>{
        toastr["warning"](`${err.responseJSON.message}`)
    })
}

function getGroupsData(){
    $.ajax({
        method : 'GET',
        url : `${config.port}/groups/mygroups`,
        headers : {
            token : localStorage.getItem('token')
        }
    })
    .done(response=>{
        for(let i = 0 ; i < response.length ; i ++){

            $('#group_list').append(`
            <div class="col-sm-3">
                <div class="card mb-4 default-color" style="cursor:pointer;" onclick="getGroup('${response[i]._id}')">

                    <!-- Card content -->
                    <div class="card-body">

                    <!-- Title -->
                    <h6 class="card-title text-center text-white">${response[i].name}</h6>

                    </div>
                    <!-- Card content -->

                </div>
            </div>
            `)
        }
    })
    .fail(err=>{
        console.log(err)
    })
}

function getGroup(id){
    $.ajax({
        method : 'GET',
        url : `${config.port}/groups/${id}`
    })
    .done(response=>{
        console.log(response)
    })
    .fail(err=>{
        console.log(err)
    })
}

function addTask(){
    let data = {
        name : $(' #add_task_name ').val(),
        description : $( '#add_task_description' ).val()
    }

    $.ajax({
        method : 'POST',
        url : `${config.port}/todos/`,
        headers : {
            token : localStorage.getItem('token')
        },
        data
    })
    .done(response=>{
        toastr["success"](`${response.message}`)
        getUserData()
        $(' #add_task_name ').val('')
        $( '#add_task_description' ).val('')
    })
    .fail(err=>{
        toastr["error"](`${err.responseJSON.message}`)
        // console.log(err)
    })
}

function selectTask(id){
    $.ajax({
        method : 'GET',
        url : `${config.port}/todos/${id}`
    })
    .done(response=>{
        $('#selected_id').val(`${response._id}`)
        $('#selected_name').val(`${response.name}`)
        $('#selected_description').val(`${response.description}`)
        let slice = response.due_date.slice(0,10)
        $('#selected_due_date').val(`${slice}`)
    })
    .fail(err=>{
        console.log(err)
    })
}

function updateTask(){
    let id = $('#selected_id').val()
    
    let data = {
        name : $('#selected_name').val(),
        description : $('#selected_description').val(),
        due_date : $('#selected_due_date').val()
    }

    $.ajax({
        method : 'PUT',
        url : `${config.port}/todos/${id}`,
        headers: {
            token : localStorage.getItem('token')
        },
        data
    })
    .done(response=>{
        toastr["success"](`${response.message}`)
        getUserData()
    })
    .fail(err=>{
        toastr["error"](`${err.responseJSON.message}`)
        console.log(err)
    })

}

function deleteTask(id){
    $.ajax({
        method : 'DELETE',
        url : `${config.port}/todos/${id}`,
        headers : {
            token : localStorage.getItem('token')
        }
    })
    .done(response=>{
        toastr["success"](`${response.message}`)
        getUserData()
    })
    .fail(err=>{
        toastr["error"](`${err.responseJSON.message}`)
    })
}