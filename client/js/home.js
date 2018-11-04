let host = `http://localhost:3000`

$(document).ready(function () {
    onLoad()
    showTask()
    getGroup()
    greeting()
    fetchDetailTime()
    getQuotes()
})


$('.menu .item')
  .tab();

$('.ui.accordion')
.accordion();

function onLoad() {
    gapi.load('auth2', function() {
      gapi.auth2.init();
    });
}

function modalAddTask() {
    $('#addTitle').val("")
    $('#addDescription').val("")
    $('#addDueDate').val("")
    $('#addPriority').val(0)
    $('#addLocation').val("")
    $('#buttonModal').empty()
    $('#modalTitle').empty()
    $('#modalTitle').append(`
        <i class="ui pencil icon"></i>
        Add Task
    `)
    $('#buttonModal').append(`
        <div class="ui deny button">Cancel</div>
        <div class="ui green ok teal button" onclick="addTask()">
            <i class="edit icon"></i>
            Create task
        </div>
    `)
    $('#formAddTask').modal('show')
}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    localStorage.removeItem('tokenTodo')
    localStorage.removeItem('id')
    window.location = '/index.html'
}

function logout(){
    localStorage.removeItem('tokenTodo')
    localStorage.removeItem('id')
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    window.location = '/index.html'
}

function addTask() {
    $.ajax({
        url: `${host}/todos`,
        method: 'POST',
        headers: {
            token: localStorage.getItem('tokenTodo')
        },
        data: {
            title: $('#addTitle').val(),
            description: $('#addDescription').val(),
            priority: $('#addPriority').val(),
            dueDate: $('#addDueDate').val(),
            location: $('#addLocation').val()
        }
    })
    .done(res => {
        console.log(res.msg);
        showTask()
    })
    .fail(err => {
        console.log(err);
    })
}

function deleteTask(id) {
    $.ajax({
        url: `${host}/todos/${id}`,
        method: 'DELETE',
        headers: {
            token: localStorage.getItem('tokenTodo')
        }
    })
    .done(res => {
        console.log(res.msg);
        getGroup()
        showTask()
    })
    .fail(err => {
        console.log(err);
    })
}

function editTask(id) {
    $.ajax({
        url: `${host}/todos/${id}`,
        method: 'PUT',
        headers: {
            token: localStorage.getItem('tokenTodo')
        },
        data: {
            title: $('#addTitle').val(),
            description: $('#addDescription').val(),
            priority: $('#addPriority').val(),
            dueDate: $('#addDueDate').val(),
            location: $('#addLocation').val()
        }
    })
    .done(res => {
        console.log(res.msg);
        getGroup()
        showTask()
    })
    .fail(err => {
        console.log(err);
    })
}

function showTask() {
    $.ajax({
        url: `${host}/todos`,
        method: 'GET',
        headers: {
            token: localStorage.getItem('tokenTodo')
        }
    })
    .done(res => {
        let datas = res.data.reverse()
        $('#listTask').empty()
        datas.forEach(task => {
            if(task.status === true){
                if(task.priority === 1){
                    $('#listTask').append(`
                        <div class="ui grid" style="border:1px solid grey; margin: 10px" onclick="taskDetail('${task._id}')">
                            <div class="ui thirteen wide column" ><p><strike>${task.title}</strike></p></div>
                            <div class="ui three wide column"> <a class="ui red tag label">Priority</a></div>
                        </div>
                    `)
                } else {
                    $('#listTask').append(`
                        <div class="ui grid" style="border:1px solid grey; margin: 10px" onclick="taskDetail('${task._id}')">
                            <div class="ui thirteen wide column" ><p><strike>${task.title}</strike></p></div>
                        </div>
                    `)
                }
            } else {
                if(task.priority === 1){
                    $('#listTask').append(`
                        <div class="ui grid" style="border:1px solid grey; margin: 10px" onclick="taskDetail('${task._id}')">
                            <div class="ui thirteen wide column"> <p>${task.title}</p> </div>
                            <div class="ui three wide column"> <a class="ui red tag label">Priority</a></div>
                        </div>
                    `)
                } else {
                    $('#listTask').append(`
                        <div class="ui grid" style="border:1px solid grey; margin: 10px" onclick="taskDetail('${task._id}')">
                            <div class="ui thirteen wide column"> <p>${task.title}</p> </div>
                        </div>
                    `)
                }
                
            }
        });
    })
    .fail(err => {
        console.log(err);
        localStorage.removeItem('tokenTodo')
        window.location.href = '/index.html'
    })
}

function taskDetail(id) {
    $.ajax({
        url: `${host}/todos/${id}`,
        method: 'GET',
        headers: {
            token: localStorage.getItem('tokenTodo')
        }
    })
    .done(res => {
        console.log(res);
        let priority = ''
        let status = ''
        if(res.priority === 0){
            priority = 'Default'
        } else if(res.priority === 1){
            priority = 'Priority'
        }
        $('#detailCompletedDate').empty()
        $('#detailCompletedBy').empty()
        $('#beforeMap').empty()
        if(res.status){
            status = 'Completed'
            $('#detailCompletedBy').append(`
                <div>Completed By : ${res.completedBy.name} </div>
            `)
            $('#detailCompletedDate').append(`
                <div>Completed Date : ${res.completedDate.slice(0,10)} </div>
            `)
        } else {
            status = 'Uncompleted'
        }
        if(res.location === ''){
            res.location = 'none'
        } else {
            $('#beforeMap').append(`<div class="ui message" id="map"></div>`)
            geolocation(res.location)
        }
        $('#detailTitle').empty()
        $('#detailDescription').empty()
        $('#detailPriority').empty()
        $('#detailStatus').empty()
        $('#detailOwner').empty()
        $('#detailDueDate').empty()
        $('#detailLocation').empty()
        $('#detailOwner').append(res.owner.name)
        $('#detailTitle').append(res.title)
        $('#detailDescription').append(res.description)
        $('#detailDueDate').append(res.dueDate.slice(0,10))
        $('#detailPriority').append(priority)
        $('#detailStatus').append(status)
        $('#detailLocation').append(res.location)
        $('#detailTask').modal('show')
        $('#btnDetail').empty()
        if(res.isGroup){
            if(res.owner._id === localStorage.getItem('id')){
                $('#btnDetail').append(`
                    <div class="ui positive right labeled icon button" onclick="getEditTask('${res._id}')">Edit</div>
                    <div class="ui positive right labeled icon button" onclick="deleteTask('${res._id}')">Hapus</div>
                `)
            } else {
                $('#btnDetail').append(`
                    <div class="ui positive right labeled icon button" onclick="finishTask('${res._id}')">Finish</div>            
                `)
            }
        } else {
            if(!res.status){
                $('#btnDetail').append(`
                    <div class="ui positive right labeled icon button" onclick="finishTask('${res._id}')">Finish</div>            
                    <div class="ui positive right labeled icon button" onclick="getEditTask('${res._id}')">Edit</div>
                `)
            } 
            $('#btnDetail').append(`
                <div class="ui positive right labeled icon button" onclick="deleteTask('${res._id}')">Hapus</div>
            `)
        }
        
        // $('#btnDetail').append(`
        //     <div class="ui positive right labeled icon button">
        //         Yep, that's me
        //         <i class="checkmark icon"></i>
        //     </div>
        // `)
    })
    .fail(err => {
        console.log(err);

    })
}

function getEditTask(id) {
    $.ajax({
        url: `${host}/todos/${id}`,
        method: 'GET',
        headers: {
            token: localStorage.getItem('tokenTodo')
        }
    })
    .done(res => {
        $('#addTitle').val("")
        $('#addDescription').val("")
        $('#addDueDate').val("")
        $('#addLocation').val("")
        $('#addTitle').val(res.title)
        $('#addDescription').val(res.description)
        $('#addDueDate').val(res.dueDate.slice(0,10))
        $('#addPriority').val(res.priority)
        $('#addLocation').val(res.location)
        $('#modalTitle').empty()
        $('#buttonModal').empty()
        $('#modalTitle').append(`
            <i class="ui pencil icon"></i>
            Edit Task
        `)
        $('#buttonModal').append(`
            <div class="ui deny button">Cancel</div>
            <div class="ui deny teal button" onclick="editTask('${res._id}')">Edit task</div>
        `)
        $('#formAddTask').modal('show')
    })
    .fail(err => {
        console.log(err);
    })
}
function finishTask(id){
    $.ajax({
        url: `${host}/todos/finish/${id}`,
        method: 'PUT',
        headers: {
            token: localStorage.getItem('tokenTodo')
        }
    })
    .done(res => {
        console.log(res.msg);
        getGroup()
        showTask()
    })
    .fail(err => {
        console.log(err)
    })
}

// group

function getCreategroup(){
    $('#detailGroupTitle').empty()
    $('#btnModalCreategroup').empty()
    $('#createGroupName').val("")
    $('#detailGroupTitle').append('Create New Group')
    $('#btnModalCreategroup').append(`
        <div class="ui deny button">Cancel</div>
        <div class="ui green ok teal button" onclick="createGroup()">
            <i class="edit icon"></i>
            Create
        </div>
    `)
    $('#modalcreategroup').modal('show')
}

function getEditGroup(id, name){
    $('#detailGroupTitle').empty()
    $('#btnModalCreategroup').empty()
    $('#createGroupName').val("")
    $('#createGroupName').val(name)
    $('#detailGroupTitle').append('Edit Group')
    $('#btnModalCreategroup').append(`
        <div class="ui deny button">Cancel</div>
        <div class="ui green ok teal button" onclick="editGroup('${id}')">
            <i class="edit icon"></i>
            Edit Group
        </div>
    `)
    $('#modalcreategroup').modal('show')
}
function createGroup(){
    $.ajax({
        method: 'POST',
        url: `${host}/groups`,
        headers: {
            token: localStorage.getItem('tokenTodo')
        },
        data: {
            name: $('#createGroupName').val()
        }
    })
    .done((result) => {
        console.log(result.msg);
        $('#createGroupName').val("")
        getGroup()
    })
    .fail((err) => {
        console.log(err.responseJSON);
    });
}

function editGroup(id){
    $.ajax({
        method: 'PUT',
        url: `${host}/groups/${id}`,
        headers: {
            token: localStorage.getItem('tokenTodo')
        },
        data: {
            name: $('#createGroupName').val()
        }
    })
    .done((result) => {
        console.log(result.msg);
        getGroup()
    })
    .fail((err) => {
        console.log(err);
    });
}

function removeGroup(id){
    $.ajax({
        method: 'DELETE',
        url: `${host}/groups/${id}`,
        headers: {
            token: localStorage.getItem('tokenTodo')
        }
    })
    .done((result) => {
        console.log(result.msg);
        getGroup()
    })
    .fail((err) => {
        console.log(err);
    });
}

function getGroup(){
    $.ajax({
        method: 'GET',
        url: `${host}/groups`,
        headers: {
            token: localStorage.getItem('tokenTodo')
        }
    })
    .done((result) => {
        $('#groups').empty()
        result.forEach(group => {
            
            if(group.owner === localStorage.getItem('id')){
                $('#groups').append(`
                    <div class="title">
                        <i class="dropdown icon"></i>
                        Group: ${group.name}
                    </div>
                    <div class="content">
                        <div class="ui grid ">
                            <div class="ui four wide column">
                                <a href="#" onclick="modelAddTaskgroup('${group._id}')">Add Task</a>
                            </div>
                            <div class="ui four wide column">
                                <a href="#" onclick="getDataMemberGroup('${group._id}')">Members</a>
                            </div>
                            <div class="ui four wide column">
                                <a href="#" onclick="getEditGroup('${group._id}', '${group.name}')">Edit Group</a>
                            </div>
                            <div class="ui four wide column">
                                <a href="#" onclick="removeGroup('${group._id}')">Delete Group</a>
                            </div>
                        </div>
                        <div id=${group._id}></div>
                    </div> 
                `)
            } else {
                $('#groups').append(`
                    <div class="title">
                        <i class="dropdown icon"></i>
                        ${group.name}
                    </div>
                    <div class="content">
                        <div class="ui grid ">
                            <div class="ui four wide column">
                                <a href="#" onclick="modelAddTaskgroup('${group._id}')">Add Task</a>
                            </div>
                            <div class="ui four wide column">
                                <a href="#" onclick="getDataMemberGroup('${group._id}')">Members</a>
                            </div>
                        </div>
                        <div id=${group._id}></div>
                    </div>
                `)
            }

            $(`#${group._id}`).empty()
            group.tasks.forEach(task => {
                if(task.status === true){
                    if(task.priority === 1){
                        $(`#${group._id}`).append(`
                            <div class="ui grid" style="border:1px solid grey; margin:5px;">
                                <div class="ui thirteen wide column" onclick="taskDetail('${task._id}')"><p><strike>${task.title}</strike></p></div>
                                <div class="ui three wide column"> <a class="ui red tag label">Priority</a></div>
                            </div>
                        `)
                    } else {
                        $(`#${group._id}`).append(`
                            <div class="ui grid" style="border:1px solid grey; margin:5px;">
                                <div class="ui thirteen wide column" onclick="taskDetail('${task._id}')"><p><strike>${task.title}</strike></p></div>
                            </div>
                        `)
                    }
                } else {
                    if(task.priority === 1){
                        $(`#${group._id}`).append(`
                            <div class="ui grid" style="border:1px solid grey; margin:5px;">
                                <div class="ui thirteen wide column" onclick="taskDetail('${task._id}')"><p>${task.title}</p></div>
                                <div class="ui three wide column"> <a class="ui red tag label">Priority</a></div>
                            </div>
                        `)
                    } else {
                        $(`#${group._id}`).append(`
                            <div class="ui grid" style="border:1px solid grey; margin:5px;">
                                <div class="ui eleven wide column" onclick="taskDetail('${task._id}')"><p>${task.title}</p></div>
                            </div>
                        `)
                    }
                }
            })
        })
    })
    .fail((err) => {
        console.log(err);
    });
}

function getDataMemberGroup(idGroup){
    $('#searchUsername').empty()
    $('#searchResult').empty()
    $('#listMember').empty()
    $('#btnsearchuser').empty()
    $('#detailgroupTitle').empty()
    $('#btnsearchuser').append(`
        <div class="ui button" onclick="searchUser('${idGroup}')">
            <i class="checkmark icon"></i>
            Search User
        </div> 
    `)
    $('#modalinvitegroup').modal('show')
    $.ajax({
        method: 'GET',
        url: `${host}/groups/findbyid/${idGroup}`,
        headers: {
            token: localStorage.getItem('tokenTodo')
        }
    })
    .done((result) => {
        // console.log(result);
        $('#detailgroupTitle').append(`Members Group ${result.name}`)

        result.users.forEach(user => {
            
            if(result.owner === user._id){
                $('#listMember').append(`
                    <div class="ui image label">
                        <img src=${user.picture} >
                        ${user.email} - ${user.name}
                        <div id="member${user.email}" ></div>
                    </div>
                `)
            } else {
                $('#listMember').append(`
                    <div class="ui image label">
                        <img src=${user.picture} >
                        ${user.email} - ${user.name}
                        <div id="member${user.email}" ></div>
                        <i class="delete icon"></i>
                    </div>
                `)
            }
        })
    }).fail((err) => {
        console.log(err);
    });
}

function searchUser(idGroup){  //search user on tab groups - member
    let input = $('#searchUsername').val()
    $.ajax({
        method: 'GET',
        url: `${host}/users/find/${input}`,
        headers: {
            token: localStorage.getItem('tokenTodo')
        }
    })
    .done((result) => {
        console.log(result);
        $('#searchResult').empty()
        if(!result){
            $('#searchResult').append(`
                <p style="color: red">user not found</p>
            `)
        } else {
            $('#searchResult').append(`
                <div class="ui cards">
                    <div class="card">
                        <div class="content">
                        <img class="right floated mini ui image" src=${result.picture}>
                        <div class="header">
                            ${result.name}
                        </div>
                        <div class="description">
                            ${result.email}
                        </div>
                        </div>
                        <div class="extra content">
                            <div class="ui basic green button" onclick="inviteToGroup('${result._id}', '${idGroup}')">Invite</div>
                        </div>
                    </div>
                </div>
            `)
        }
    }).fail((err) => {
        console.log(err);
    });
}

function inviteToGroup(idUser, idGroup){
    $.ajax({
        method: 'POST',
        url: `http://localhost:3000/groups/add`,
        headers: {
            token: localStorage.getItem('tokenTodo')
        },
        data: {
            userId: idUser,
            groupId: idGroup
        }
    })
    .done((result) => {
        // console.log(result);
        getDataMemberGroup(idGroup)
    }).fail((err) => {
        console.log(err.responseJSON.msg);
    });
}

function modelAddTaskgroup(groupId){
    $('#addTitle').val("")
    $('#addDescription').val("")
    $('#addDueDate').val("")
    $('#addPriority').val(0)
    $('#addLocation').val("")
    $('#modalTitle').empty()
    $('#buttonModal').empty()
    $('#modalTitle').append(`
        <i class="ui pencil icon"></i>
        Add Task
    `)
    $('#buttonModal').append(`
        <div class="ui deny button">Cancel</div>
        <div class="ui deny teal button" onclick="addTaskGroup('${groupId}')">Create task</div>
    `)
    $('#formAddTask').modal('show')
}

function addTaskGroup(groupId){    
    $.ajax({
        url: `${host}/todos/group`,
        method: 'POST',
        headers: {
            token: localStorage.getItem('tokenTodo')
        },
        data: {
            title: $('#addTitle').val(),
            description: $('#addDescription').val(),
            dueDate: $('#addDueDate').val(),
            priority: $('#addPriority').val(),
            location: $('#addLocation').val(),
            idGroup: groupId
        }
    })
    .done(res => {        
        console.log(res.msg);
        getGroup()
        // getDataMemberGroup(groupId)
    })
    .fail(err => {
        console.log(err);
    })
}

function greeting() {
    let userLogin = localStorage.getItem('name')
    $('#greeting').empty()
    $('#userNameLogin').empty()
    let hours = new Date().getHours()
  
    if (hours >= 5 && hours <= 12) {
      $('#greeting').append(` Good Morning `)
      $('#userNameLogin').append(` ${userLogin} `)
    } else if (hours >= 13 && hours <= 18) {
      $('#greeting').append(` Good Afternoon `)
      $('#userNameLogin').append(` ${userLogin} `)
    } else {
      $('#greeting').append(` Good Evening `)
      $('#userNameLogin').append(` ${userLogin} `)
    } 
}

function fetchDetailTime () {
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    setInterval(function(){
        let d = new Date()
        let hour = d.getHours()
        let minutes = d.getMinutes()
        let seconds = d.getSeconds()
        if(hour < 10){
            hour = '0' + hour
        }
        if(minutes < 10){
            minutes = '0' + minutes
        }
        if(seconds < 10){
            seconds = '0' + seconds
        }
    
        $('#date').empty()
        $('#time').empty()
        $('#date').append(` ${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`)
        $('#time').append(` ${hour} : ${minutes} : ${seconds} `)
    }, 1000)
  }

//   gmap 

function geolocation(key){
    $.ajax({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${key}&key=AIzaSyDTWqyIZBhNPlOevzbLwjS_DKztVhR_Qp0`,
        method: 'GET'
    })
    .then((result) => {
        if(result.status === 'OK'){
            // console.log(result.results[0].geometry.location);
            let lat = result.results[0].geometry.location.lat
            let lng = result.results[0].geometry.location.lng
            initMap(lat, lng)
        }
    }).catch((err) => {
        console.log(err);
        
    });

}

// show map
// Initialize and add the map
function initMap(lat, lng) {
  // The location of Uluru
  var uluru = {lat: lat, lng: lng};
  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 15, center: uluru});
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: uluru, map: map});
}

function getQuotes(){
    $.ajax({
        url: `${host}/quotes`,
        method: 'GET',
        headers: {
            token: localStorage.getItem('tokenTodo')
        }
    })
    .then((result) => {
        console.log(result);
        $('#quoteQuote').empty()
        $('#quoteAuthor').empty()
        $('#quoteQuote').append(result.quote)
        $('#quoteAuthor').append(`- ${result.author} -`)
    }).catch((err) => {
        console.log(err);
    });
}