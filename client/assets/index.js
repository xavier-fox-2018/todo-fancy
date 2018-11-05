const config = {
    port : 'http://localhost:3000'
}

$( document ).ready(function(){
    checkToken()
    getUserData()
    getGroupsData()
    getInboxData()
    onLoad()
})

function checkToken(){
    let token = localStorage.getItem('token')
    if(!token){
        window.location = 'login.html'
    }
}

function getInboxData(){
    $.ajax({
        method : 'GET',
        url : `${config.port}/groups/myinvitation`,
        headers : {
            token : localStorage.getItem('token')
        }
    })
    .done(response=>{
        $('#invitation_list').empty()

        for(let i = 0 ; i < response.length ; i ++){
            $('#invitation_list').append(`
            <div class="col-sm-12 col-md-6 col-lg-3 mt-3">
                <div class="card text-center">
                    <div class="card-body">
    
                        <!-- Title -->
                        <h4 class="card-title"><a>${response[i].group.name}</a></h4>
                        <!-- Text -->
                        <p class="card-text">You've been invited by <strong>${response[i].sender.name}</strong> to join <strong>${response[i].group.name}</strong> </p>
                        <!-- Button -->
                        <a href="#" class="btn btn-primary" onclick="acceptInvitation('${response[i]._id}')">Accept</a>
                        <a href="#" class="btn btn-danger" onclick="refuseInvitation('${response[i]._id}')">Refuse</a>
    
                    </div>
    
                </div>
            </div>
            `)
        }
    })
    .fail(err=>{
        toastr["error"](`${err.responseJSON.message}`)
    })
}

function onLoad() {
    gapi.load('auth2', function() {
      gapi.auth2.init();
    });
  }

function logOut(){
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
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
        let taskList = userData.todo_list.reverse()

        for(let i = 0 ; i < taskList.length ; i ++){
            let status = taskList[i].status
            let option = `<div class="btn text-dark ripe-malinka-gradient rounded ml-2" style="cursor:pointer" onclick="uncompleteTask('${taskList[i]._id}')"><i class="fa fa-times" aria-hidden="true"></i></div>`
            let option2 = `<i class="fas fa-check"></i>`
            if(status === false){
                option2 = ''
                option = `<div class="btn text-dark winter-neva-gradient rounded ml-2" style="cursor:pointer" onclick="completeTask('${taskList[i]._id}')"><i class="fa fa-check" aria-hidden="true"></i></div>`
            }

            $(' #personal_task_list ').append(`
                <div class="col-sm-12 mb-3">
                    <div class="row rounded z-depth-1 bg-white">
                        <div class="col-sm-6 col-md-8">
                            <h5 class="mt-1"><strong>${taskList[i].name}  ${option2}</strong><h5>
                            <small><strong>Description : </strong>${taskList[i].description} <strong>|</strong> <strong>Due Date :</strong> ${taskList[i].due_date.slice(0,10)}</small>
                        </div>
                        <div class="col-sm-6 col-md-4" align="right">
                            ${option}
                            <div class="btn text-dark dusty-grass-gradient rounded ml-2" style="cursor:pointer" onclick="selectTask('${taskList[i]._id}')" data-toggle="modal" data-target="#editModal"><i class="fas fa-edit"></i></div>
                            <div class="btn text-dark ripe-malinka-gradient rounded ml-2" style="cursor:pointer" onclick="deleteTask('${taskList[i]._id}')"><i class="fas fa-trash-alt"></i></div>
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
        $('#group_list').empty()
        for(let i = 0 ; i < response.length ; i ++){

            $('#group_list').append(`
            <div class="col-sm-3">
                <div class="card mt-3 mb-3 default-color" style="cursor:pointer;" onclick="getGroup('${response[i]._id}')">

                    <div class="card-body">
                    <h6 class="card-title text-center text-white">${response[i].name}</h6>
                    </div>

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
    $('#selected_group_id').val(`${id}`)

    $.ajax({
        method : 'GET',
        url : `${config.port}/groups/${id}`,
        headers : {
            token : localStorage.getItem('token')
        }
    })
    .done(response=>{
        $( '#add_group_task_button' ).val(`${response._id}`)

        $( '#addgrouptaskbutton' ).empty()
        $( '#addgrouptaskbutton' ).append(`
        <a href="" class="btn aqua-gradient btn-rounded mb-3" data-toggle="modal" data-target="#add_group_task">Add Task</a>
        `)
        

        $( '#invite_menu' ).empty()
        $( '#invite_menu' ).append(`
        <div class="search-control mt-3 mb-3">
            <input type="search" id="input_invite_email" name="q" placeholder="Input email..." aria-label="Search through site content">
            <button class="btn btn-primary" onclick="sendInvitation('${response._id}')">Send Invitation to join <strong>${response.name}</strong> </button>
        </div>
        `)

        
        $(' #selected_group_task_list ').empty()
        let taskList = response.todo_list.reverse()


        for(let i = 0 ; i < taskList.length ; i ++){
            let status = taskList[i].status
            let option = `<div class="btn text-dark ripe-malinka-gradient rounded ml-2" style="cursor:pointer" onclick="uncompleteTask('${taskList[i]._id}')"><i class="fa fa-times" aria-hidden="true"></i></div>`
            let option2 = `<i class="fas fa-check"></i>`
            if(status === false){
                option2 = ''
                option = `<div class="btn text-dark winter-neva-gradient rounded ml-2" style="cursor:pointer" onclick="completeTask('${taskList[i]._id}')"><i class="fa fa-check" aria-hidden="true"></i></div>`
            }


            let ownerMenu = ''
            if(taskList[i].author._id === localStorage.getItem('userId')){
                ownerMenu = `
                    ${option}
                    <div class="btn text-dark dusty-grass-gradient rounded ml-2" style="cursor:pointer" onclick="selectTask('${taskList[i]._id}')" data-toggle="modal" data-target="#editModal"><i class="fas fa-edit"></i></div>
                    <div class="btn text-dark ripe-malinka-gradient rounded ml-2" style="cursor:pointer" onclick="deleteTask('${taskList[i]._id}')"><i class="fas fa-trash-alt"></i></div>
                `
            }

            $(' #selected_group_task_list ').append(`
                <div class="col-sm-12 mb-3">
                    <div class="row rounded z-depth-1 bg-white">
                        <div class="col-sm-6 col-md-8">
                            <h5 class="mt-1"><strong>${taskList[i].name}  ${option2}</strong><h5>
                            <small><strong>Description : </strong>${taskList[i].description} <strong>|</strong> <strong>Due Date :</strong> ${taskList[i].due_date.slice(0,10)}</small> | <small><strong>By :</strong> ${taskList[i].author.name}</small>
                        </div>
                        <div class="col-sm-6 col-md-4" align="right">
                            ${ownerMenu}
                        </div>
                    </div>
                </div>
            `)
        }
    })
    .fail(err=>{
        console.log(err)
    })
}

function addTask(){
    let data = {
        name : $(' #add_task_name ').val(),
        description : $( '#add_task_description' ).val(),
        due_date : $( '#add_task_due_date' ).val()
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
        $( '#add_task_due_date' ).val('')
    })
    .fail(err=>{
        toastr["error"](`${err.responseJSON.message}`)
        // console.log(err)
    })
}

function addGroupTask(){
    let data = {
        name : $(' #add_group_task_name ').val(),
        description : $( '#add_group_task_description' ).val(),
        due_date : $( '#add_group_task_due_date' ).val()
    }

    let groupId = $(' #add_group_task_button').val()

    $.ajax({
        method : 'POST',
        url : `${config.port}/todos/group/${groupId}`,
        headers : {
            token : localStorage.getItem('token')
        },
        data
    })
    .done(response=>{
        toastr["success"](`${response.message}`)
        let group = $('#selected_group_id').val()
        if(group !== ''){
            getGroup(group)
        }
        $(' #add_group_task_name ').val('')
        $( '#add_group_task_description' ).val('')
        $( '#add_group_task_due_date' ).val('')
    })
    .fail(err=>{
        toastr["error"](`${err.responseJSON.message}`)
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
        let group = $('#selected_group_id').val()
        if(group !== ''){
            getGroup(group)
        }
    })
    .fail(err=>{
        toastr["error"](`${err.responseJSON.message}`)
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
        let group = $('#selected_group_id').val()
        if(group !== ''){
            getGroup(group)
        }
    })
    .fail(err=>{
        toastr["error"](`${err.responseJSON.message}`)
    })
}

function completeTask(id){
    $.ajax({
        method : 'PUT',
        url : `${config.port}/todos/complete/${id}`,
        headers : {
            token : localStorage.getItem('token')
        }
    })
    .done(response=>{
        toastr["success"](`${response.message}`)
        getUserData()
        let group = $('#selected_group_id').val()
        if(group !== ''){
            getGroup(group)
        }
    })
    .fail(err=>{
        toastr["error"](`${err.responseJSON.message}`)
    })
}

function uncompleteTask(id){
    $.ajax({
        method : 'PUT',
        url : `${config.port}/todos/uncomplete/${id}`,
        headers : {
            token : localStorage.getItem('token')
        }
    })
    .done(response=>{
        toastr["success"](`${response.message}`)
        getUserData()
        let group = $('#selected_group_id').val()
        if(group !== ''){
            getGroup(group)
        }
    })
    .fail(err=>{
        toastr["error"](`${err.responseJSON.message}`)
    })
}

function createGroup(){
    $.ajax({
        method : 'POST',
        url : `${config.port}/groups`,
        headers : {
            token : localStorage.getItem('token')
        },
        data : {
            name : $(' #add_group_name ').val()
        }
    })
    .done(response=>{
        toastr["success"](`${response.message}`)
        getGroupsData()
    })
    .fail(err=>{
        toastr["error"](`${err.responseJSON.message}`)
    })
}

function sendInvitation(id){
    $.ajax({
        method : 'POST',
        url : `${config.port}/groups/invite`,
        headers : {
            token : localStorage.getItem('token')
        },
        data : {
            invited : $('#input_invite_email').val(),
            group : id
        }
    })
    .done(response=>{
        toastr["success"](`${response.message}`)
        getGroupsData()
        $('#input_invite_email').val('')
    })
    .fail(err=>{
        toastr["error"](`${err.responseJSON.message}`)
    })
}

function acceptInvitation(id){
    $.ajax({
        method : 'POST',
        url : `${config.port}/groups/accept/${id}`,
        headers : {
            token : localStorage.getItem('token')
        }
    })
    .done(response=>{
        toastr["success"](`${response.message}`)
        getGroupsData()
        getInboxData()
    })
    .fail(err=>{
        toastr["error"](`${err.responseJSON.message}`)
    })
}

function refuseInvitation(id){
    $.ajax({
        method : 'POST',
        url : `${config.port}/groups/refuse/${id}`,
        headers : {
            token : localStorage.getItem('token')
        }
    })
    .done(response=>{
        toastr["success"](`${response.message}`)
        getGroupsData()
        getInboxData()
    })
    .fail(err=>{
        toastr["error"](`${err.responseJSON.message}`)
    })
}