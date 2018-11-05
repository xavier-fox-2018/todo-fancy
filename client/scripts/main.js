const host = `http://localhost:3000`
// const host = 'https://api-todo.agungatidhira.tech'


$(function(){
  $(".negative.message").hide()
  $('.positive.message').hide()
  $(".chart-content").hide()
  if(localStorage.getItem('token')) {
    let groupId = localStorage.getItem('groupId')
    if(groupId) {
      goToGroupPage(groupId)
    } else {
      getTasks()
    }
    $('.head-title').append(`
    <h1 class="head" style="font-size: 50px">Hi ${localStorage.getItem('username')}, Welcome to My To-Do App</h1>
    `)
    onLoad()
  } else {
    window.location.href = './'
  }
  appendDateInput()
  
})



function getTasks() {
  $.ajax({
    url: `${host}/tasks`,
    method: 'GET',
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  .done(response=>{
    $('#tab-personal').empty()
    $('#tab-family').empty()
    $('#tab-work').empty()
    let personal=[],family=[],work=[]
    response.forEach(task => {
      if(!task.groupId) {
        if(task.category === 'personal') {
          personal.push(task)
        } else if (task.category === 'family') {
          family.push(task)
        } else {
          work.push(task)
        }
      }
    });
      appendTasksList(personal)
      appendTasksList(family)
      appendTasksList(work)
      
      $('.ui.accordion').accordion();
  })
  .fail(err=>{
    console.log(err)
  })
}

function appendTasksList(category) {
  category.forEach(task=>{
    let label;
    if(task.priority === 'high') {
      label = '<a class="ui red tag mini label">Priority High</a>'
    } else if (task.priority === 'medium') {
      label = '<a class="ui teal tag mini label">Priority Medium</a>'
    } else {
      label = '<a class="ui tag mini label">Priority Low</a>'
    }
    if(task.done) {
      $(`#tab-${task.category}`).append(`
        <div class="ui inverted accordion">
          <div class="title active">
            <i class="dropdown icon"></i>
            <span class="text-align: left;"><strike>${task.title}</strike></span>&nbsp;&nbsp;&nbsp;&nbsp;
            ${label}&nbsp;&nbsp;&nbsp;&nbsp;<a class="ui green tag mini label">COMPLETED</a>
            <div id='todo-creator-${task._id}'></div>
            <hr>
          </div>
          <div class="content">
                <label for="description"><u>Description:</u></label>
                <div class="ui box">${task.description}</div>
            <label for="date"><u>Date:</u></label>
            <p>${getNormalDateFormat(task.dueDate)}</p>
            <label for="location"><u>Location:</u></label>
            <div id="googleMap-${task._id}" style="width:100%;height:400px;"></div><br>
            ${task.location}
            <div class="ui trash right floated button red tiny" data-tooltip="Delete this To-Do" id='deleteTask' onclick='showDeleteConfirmation("${task._id}")'>
              <i class="trash alternate icon"></i>
            </div>
            <div class="ui edit right floated button blue tiny" data-tooltip="Edit this To-Do" id='updateTask' onclick='updateTodo(${JSON.stringify(task)})'>
              <i class="edit icon"></i>
            </div>
            <div><button class="fluid ui inverted green button" onclick='completedTodo(${JSON.stringify(task)})'>Completed ToDo</button><div>
            <div><button class="fluid ui inverted red button" onclick='uncompletedTodo(${JSON.stringify(task)})'>Uncompleted ToDo</button><div>
          </div><hr>
        </div>
      `)
      if(localStorage.getItem('groupId')) {
        $(`#todo-creator-${task._id}`).append(`<p>Created By: ${task.userId.username}</p>`)
      }
      if(task.location !== 'No Location') {
        getMaps(task.location, task._id)
      } else {
        $(`#googleMap-${task._id}`).empty()
        $(`#googleMap-${task._id}`).css({"width":"0%","height":"0%"})
      }
    } else {
      $(`#tab-${task.category}`).append(`
        <div class="ui inverted accordion">
          <div class="title active">
            <i class="dropdown icon"></i>
            <span class="text-align: left;">${task.title}</span>&nbsp;&nbsp;&nbsp;&nbsp;
            ${label}
            <div id='todo-creator-${task._id}'></div>
            <hr>
          </div>
          <div class="content">
                <label for="description"><u>Description:</u></label>
                <div class="ui box">${task.description}</div>
            <label for="date"><u>Date:</u></label>
            <p>${getNormalDateFormat(task.dueDate)}</p>
            <label for="location"><u>Location:</u></label>
            <div id="googleMap-${task._id}" style="width:100%;height:400px;"></div><br>
            ${task.location}
            <div class="ui trash right floated button red tiny" data-tooltip="Delete this To-Do" id='deleteTask' onclick='showDeleteConfirmation("${task._id}")'>
              <i class="trash alternate icon"></i>
            </div>
            <div class="ui edit right floated button blue tiny" data-tooltip="Edit this To-Do" id='updateTask' onclick='updateTodo(${JSON.stringify(task)})'>
              <i class="edit icon"></i>
            </div>
            <div><button class="fluid ui inverted green button" onclick='completedTodo(${JSON.stringify(task)})'>Completed ToDo</button><div>
            <div><button class="fluid ui inverted red button" onclick='uncompletedTodo(${JSON.stringify(task)})'>Uncompleted ToDo</button><div>
          </div><hr>
        </div>
      `)
      if(localStorage.getItem('groupId')) {
        $(`#todo-creator-${task._id}`).append(`<p>Created By: ${task.userId.username}</p>`)
      }
      if(task.location !== 'No Location') {
        getMaps(task.location, task._id)
      } else {
        $(`#googleMap-${task._id}`).empty()
        $(`#googleMap-${task._id}`).css({"width":"0%","height":"0%"})
      }
    }
  })
}

function showCreateModal () {
  let now = new Date(), minDate;
  if(now.getDate() < 10) {
    minDate = `${now.getFullYear()}-${now.getMonth()+1}-0${now.getDate()}`
  } else{
    minDate = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`
  }
  $('.modal.create').empty()
  $('.modal.create').append(`
  <i class="close icon"></i>
  <div class="header" style="text-align:center;">
    Create New To-Do
  </div>
    <div class="scrolling content">
      <div class="ui header">Please fill in the form below:</div>
      <form class="ui form success">
        <div class="field required">
          <label>To-Do Category <small>(to whom this todo is responsible to?)</small></label>
          <select name="category" id="createCategory">
            <option value="personal" selected>Personal</option>
            <option value="family" >Family / Friends</option>
            <option value="work" >Work</option>
          </select>
        </div>
        <div class="field required">
          <label>To-Do Title/Name</label>
          <input type="text" placeholder="Input the title/name here..." id="createTitle">
        </div>
        <div class="field">
          <label>Short Description</label>
          <textarea rows="2" id="createDescription"></textarea>
        </div>
        <div class="field">
          <label for='priority'>Choose To-Do Priority:<label>
          <select name="priority" id="createPriority">
            <option value="high" selected style='color:red;'>High</option>
            <option value="medium" style='color:blue;'>Medium</option>
            <option value="low" style='color:green;'>Low</option>
          </select>
        </div>
        <div class="five wide field required">
        <label for="date">Due Date</label>
          <div class="ui calendar " id="mycalendar">
            <div class="ui input left icon ">
              <i class="calendar icon"></i>
              <input type="date" placeholder="Due Date" id="createDate" min="${minDate}" />
            </div>
          </div>
        </div>
        <div class="field">
          <label for="location">Location (if any)</label>
          <div class="ui left icon input">
            <input type="text" placeholder="Input location here..." id="createLocation">
            <i class="map marker alternate icon"></i>
          </div>
        </div>
      </form><br>
      <p><span style='color:red;'>*</span> : is required field</p>
      <div id='create-warning'></div>
      <div class="actions">
        <div class="ui red deny button">
          Cancel
        </div>
        <div class="ui positive labeled icon button create-todo" onclick="createTodo()">
          Create
          <i class="checkmark icon"></i>
        </div>
      </div>
    </div>
  `)
  
}

function createTodo () {
  let priority = $("#createPriority option:selected").val();
  let category = $("#createCategory option:selected").val()
  let data = {
    category: category,
    title: $('#createTitle').val(),
    description: $('#createDescription').val() || 'No Description',
    priority: priority || 'medium',
    dueDate: $('#createDate').val(),
    location: $('#createLocation').val() || 'No Location',
    userId: localStorage.getItem('userId')
  }
  let groupId = localStorage.getItem('groupId')
  if(groupId) {
    data.groupId = groupId
  }
  $.ajax({
    url: `${host}/tasks`,
    method: 'POST',
    data: data
    ,headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  .done(response=>{
    $(".negative.message").hide()
    let groupId = localStorage.getItem('groupId')
    if(groupId) {
      getGroupTask(groupId)
    } else {
      getTasks()
    }
  })
  .fail(err=>{
    console.log('Gagalll create::', err.responseJSON.message)
    $(".negative.message").empty()
    $(".negative.message").append(`<h6 style='color: red;'>${err.responseJSON.message}</h6>`)
    $(".negative.message").show()
  })
}
function appendDateInput() {
  let now = new Date()
  $('#mycalendar').append(`
    <div class="ui input left icon">
      <i class="calendar icon"></i>
      <input type="date" placeholder="Due Date" id="createDate" min="${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}" />
    </div>
  `)
}

function updateTodo (task) {
  showCreateModal()
  $("#mycalendar").empty()
  appendDateInput()
  $(".actions").empty()
  $("#createCategory").val(task.category)
  $("#createTitle").val(task.title)
  $("#createPriority").val(task.priority)
  $("#createDescription").text(task.description)
  $("#createLocation").val(task.location)
  $("#createDate").val(task.dueDate.slice(0, 10))
  $(".actions").append(`
    <div class="ui red deny button">
      Cancel
    </div>
    <div class="ui positive right labeled icon button create-todo" onclick='updateTask("${task._id}")'>
      Update
      <i class="checkmark icon"></i>
    </div>
  `)

  $(".modal.create").modal('show')

}

function updateTask(taskId) {
  let data = {
    category: $("#createCategory").val(),
    title: $("#createTitle").val(),
    priority: $("#createPriority").val(),
    description: $("#createDescription").val(),
    location: $("#createLocation").val(),
    dueDate: $("#createDate").val(),
    userId: localStorage.getItem('userId')
  }
  $.ajax({
    url: `${host}/tasks/${taskId}`,
    method: 'PUT',
    data: data
    ,headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  .done(response=>{
    let groupId = localStorage.getItem('groupId')
    if(groupId) {
      getGroupTask(groupId)
    } else {
      getTasks()
    }
  })
  .fail(err=>{
    console.log(err)
  })
}

function showDeleteConfirmation(taskId) {
  $("#modal").append(`
    <div class='ui tiny modal'>
      <div class="header">Delete your To-Do</div>
      <div class="content">
        <h1>Are You Sure Want To Delete This To-Do ??</h1>
        <p>the todo you deleted will not be able to be recovered.</p>
      </div>
      <div class="actions">
        <div class="ui approve yellow button"  onclick='deleteTodo("${taskId}")'>Yes, Delete!</div>
        <div class="ui red deny cancel button">Cancel</div>
      </div>
    </div>
  `)
  $('.tiny.modal').modal('show')
}

function deleteTodo (taskId) {
  $.ajax({
    url: `${host}/tasks/${taskId}`,
    method: 'DELETE'
    ,headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  .done(response=>{
    let groupId = localStorage.getItem('groupId')
    if(groupId) {
      getGroupTask(groupId)
    } else {
      getTasks()
    }
  })
  .fail(err=>{
    console.log('Fail deleted task::', err)
  })
}

function completedTodo(task) {
  if(localStorage.getItem('groupId')) {
    if(task.userId._id !== localStorage.getItem('userId')) {
      let data;
      if (new Date() > new Date(task.dueDate)) {
        data = {done:1, late:1}
      } else {
        data = {done:1, late:0}
      }
      $.ajax({
        url: `${host}/tasks/${task._id}`,
        method: 'PUT',
        data: data
        ,headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .done(response=>{
        let groupId = localStorage.getItem('groupId')
        if(groupId) {
          getGroupTask(groupId)
        } else {
          getTasks()
        }
      })
      .fail(err=>{
        console.log(err)
      })
    }
  } else {
    let data;
    if (new Date() > new Date(task.dueDate)) {
      data = {done:1, late:1}
    } else {
      data = {done:1, late:0}
    }
    $.ajax({
      url: `${host}/tasks/${task._id}`,
      method: 'PUT',
      data: data
      ,headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .done(response=>{
      let groupId = localStorage.getItem('groupId')
      if(groupId) {
        getGroupTask(groupId)
      } else {
        getTasks()
      }
    })
    .fail(err=>{
      console.log(err)
    })
  }
}

function uncompletedTodo(task) {
  if(localStorage.getItem('groupId')) {
    if(task.userId._id !== localStorage.getItem('userId')) {
    let data = {done:0, late:0}
    $.ajax({
      url: `${host}/tasks/${task._id}`,
      method: 'PUT',
      data: data
      ,headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .done(response=>{
      let groupId = localStorage.getItem('groupId')
      if(groupId) {
        getGroupTask(groupId)
      } else {
        getTasks()
      }
    })
    .fail(err=>{
      console.log(err)
    })
  }
} else {
  let data = {done:0, late:0}
    $.ajax({
      url: `${host}/tasks/${task._id}`,
      method: 'PUT',
      data: data
      ,headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .done(response=>{
      let groupId = localStorage.getItem('groupId')
      if(groupId) {
        getGroupTask(groupId)
      } else {
        getTasks()
      }
    })
    .fail(err=>{
      console.log(err)
    })
}
}


function logout () {
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  localStorage.removeItem('userId')
  localStorage.removeItem('groupId')
  localStorage.removeItem('groupName')
  signOut()
  window.location.href = './'
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

function getNormalDateFormat(oldDate) {
  let date = new Date(oldDate)
  var month_names =["January","February","March",
                      "April","May","June",
                      "July","August","September",
                      "October","November","December"];
    
    var day = date.getDate();
    var month_index = date.getMonth();
    var year = date.getFullYear();
    
    return "" + day + " " + month_names[month_index] + " " + year;
}

function  getMaps(address, taskId) {
  
  $.ajax({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBVDHVfFDZ96XmETbdQ0t1Mnq7Epug9GsQ`,
    method: 'GET'
  })
  .then((result) => {
    let objLoc = result.results[0].geometry.location
    showMaps(objLoc, taskId)
  }).catch((err) => {
    console.log(err)
  });
  
}

function showMaps(objLoc, taskId) {
  var coordinate = {lat: objLoc.lat, lng: objLoc.lng};
  // The map, centered at coordinate
  var map = new google.maps.Map(
      document.getElementById(`googleMap-${taskId}`), {zoom: 10, center: coordinate});
  // The marker, positioned at coordinate
  var marker = new google.maps.Marker({position: coordinate, map: map});
}

// Load the Visualization API and the corechart package.
 google.charts.load('current', {'packages':['corechart']});
 google.charts.setOnLoadCallback(drawChart);

 function drawChart(completed, uncompleted, late) {
   var data = new google.visualization.DataTable();
   data.addColumn('string', 'Topping');
   data.addColumn('number', 'Slices');
   data.addRows([
     ['Completed', completed],
     ['Uncompleted', uncompleted],
     ['Completed but Late', late]
   ]);
   var options = {
     'title':'Chart of your productivity for the past week',
     'is3D': true,
     'width':'auto',
     'height': 640
    };
   var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
   chart.draw(data, options);
 }

function goToChart() {
  let groupId = localStorage.getItem('groupId')
  if(groupId) {
    $.ajax({
      url: `${host}/tasks/group/${groupId}`,
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .done(response=>{
      
      let completed=[],uncompleted=[],late=[]
      response.result.forEach(task=>{
        if(task.late) {
          late.push(task)
        } else if (task.done && !task.late) {
          completed.push(task)
        } else {
          uncompleted.push(task)
        }
      })
      drawChart(completed.length ,uncompleted.length ,late.length)
      $(".main-content").hide()
      $(".chart-content").show()
    })
    .fail(err=>{
      console.log(err)
    })
  } else {
    $.ajax({
      url: `${host}/tasks`,
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .done(response=>{
      console.log('ini res getchart--',response)
      let completed=[],uncompleted=[],late=[]
      response.forEach(task=>{
        if(!task.groupId) {
          if(task.late) {
            late.push(task)
          } else if (task.done && !task.late) {
            completed.push(task)
          } else {
            uncompleted.push(task)
          }
        }
      })
      drawChart(completed.length ,uncompleted.length ,late.length)
      $(".main-content").hide()
      $(".chart-content").show()
    })
    .fail(err=>{
      console.log(err)
    })
  }
}

function backToMain() {
  $(".main-content").show()
  $(".chart-content").hide()
}

function showGroupModal() {
  $.ajax({
    url: `${host}/users`,
    method: 'GET'
    ,headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  .done(response=>{
    $.ajax({
      url: `${host}/groups`,
      method: 'GET'
      ,headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .done(groups=>{
      groupModal(response.data, groups)
    })
  })
  .fail(err=>{
    console.log(err)
  })
  
}
function groupModal(users, groups) {
  $('#group-modal').empty()
  $('#group-modal').append(`
    <i class="close icon"></i>
    <div class="header">Create or Choose Existed Group</div>
    <div class="content">
      <label for='group-name'>Create New Group</label><br>
      <input name='group-name' id='group-name' placeholder='insert new group name here...'><br><br>
      <label for='select-members'>Select and add member to group from list below:</label><br>
      <small>The member you choose will be able to create, edit, delete the group's todos</small><br>
      <select name="members" id="members" multiple="" class="ui search fluid dropdown">
        
      <select><br>
      <button class="ui inverted primary button" onclick='createNewGroup()'>Create New Group</button>
      <h3>Or Go to existed group below:</h3>
      <select name="groups" id="groups" class="ui search fluid dropdown">
        
      <select><br>
    </div>
    <div class="actions">
      <div class="ui approve primary button"  onclick='goToGroupPage()'>Go to selected group page</div>
      <div class="ui red deny cancel button">Cancel</div>
    </div>
  `)
  $("#members").empty()
  $("#members").append('<option value="">Select Group Member from registered Username</option>')
  users.forEach(user=>{
    $("#members").append(`
      <option value="${user.id}">${user.username}</option>
    `)
  })
  $("#groups").empty()
  $("#groups").append('<option value="">Select from Exsisted Group</option>')
  groups.forEach(group=>{
    if(group.userId.indexOf(localStorage.getItem('userId')) !== -1) {
      $("#groups").append(`
        <option value="${group._id}">${group.name}</option>
      `)
    }
  })
  $(".modal.create").modal('hide')
  $('.modal.group').modal('show')
  $('.ui.dropdown').dropdown({
    allowAdditions: true,
  });
}

function createNewGroup() {
  $('.modal.group').modal('hide')
  let activeUser = localStorage.getItem('userId')
  let name = $("#group-name").val()
  let members = $("#members").val()
  if(members.indexOf(activeUser) == -1) {
    members.push(activeUser)
  }
  let data = {
    name: name,
    userId: members,
    groupAdmin: activeUser
  }
  $.ajax({
    url: `${host}/groups`,
    method: 'POST',
    data: data
    ,headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  .done(response=>{
    $('.positive.message').append(`
    <h3>Successfully created new Group</h3>
    <p>Please choose group from group form below</p>
    `)
    $('.positive.message').show()
    $('.negative-message').hide()
    setTimeout(function(){
      $(".positive.message").hide()
    }, 3000)
  })
  .fail(err=>{
    $('.negative-message').append(`${err.responseJSON.message}`)
    $('.negative-message').show()
  })

}

function goToGroupPage(id) {
  let groupId;
  if(id) {
    groupId = id
  } else {
    groupId = $("#groups").val()
  }
  console.log('group id:', id)
  $.ajax({
    url: `${host}/groups/${groupId}`,
    method: 'GET'
    ,headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  .done(response=>{
    localStorage.setItem('groupId', response.result._id)
    localStorage.setItem('groupName', response.result.name)
    groupPage(response.result)
  })
  .fail(err=>{
    console.log(err)
  })
}

function groupPage(data) {
  $('.positive.message').hide()
  $('.negative.message').hide()
  $('.head-title').empty()
  $('.group-todo').empty()
  $('.head-title').append(`
    <h1 class="head" style="font-size: 50px">Hi ${localStorage.getItem('username')}, Welcome to My To-Do App</h1>
    <h2 class="head">You are in Group: ${data.name}<h2>
    <div class="ui buttons container">
      <button class="ui button primary" onclick='goBackToPersonal()'>Go back to personal ToDo</button>
      <button class="ui button teal change-group"  onclick='changeGroup()'>Change / Create Group</button>
      <button class="ui button green change-group" onclick='addMember(${JSON.stringify(data.groupAdmin)})'>Add New Member</button>
    </div>
    <div class='ui field container add members'>
    <select name="members" id="add-members" multiple="" class="ui search fluid dropdown">
      
    <select>
    <button class='ui button success' id='add-new-member' onclick='updateMemberGroup()'>Add Members</button>
  </div>
  `)
  $(".add.members").hide()
  getGroupTask(data._id)
}

function getGroupTask(groupId) {
  $('#tab-personal').empty()
  $('#tab-family').empty()
  $('#tab-work').empty()
  $.ajax({
    url: `${host}/tasks/group/${groupId}`,
    method: 'GET'
    ,headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  .done(response=>{
    let personal=[],family=[],work=[]
    response.result.forEach(task => {
      if(task.category === 'personal') {
        personal.push(task)
      } else if (task.category === 'family') {
        family.push(task)
      } else {
        work.push(task)
      }
    });
    appendTasksList(personal)
    appendTasksList(family)
    appendTasksList(work)

    $('.ui.accordion').accordion();
  })
  .fail(err=>{
    console.log(err)
  }) 
}

function goBackToPersonal() {
  localStorage.removeItem('groupId')
  localStorage.removeItem('groupName')
  window.location.href = './main.html'
  getTasks()
}

function changeGroup() {
  showGroupModal()
}

function addMember(groupAdmin) {
  $.ajax({
    url: `${host}/users`,
    method: 'GET'
    ,headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  .done(response=>{
    response.data.forEach(user=>{
      $("#add-members").append(`
      <option value="${user.id}">${user.username}</option>
      `)
    })
    $(".add.members").toggle()
      
      $('.ui.dropdown').dropdown({
        allowAdditions: true,
      });
    })
    .fail(err=>{
      console.log(err)
    }) 
}

function updateMemberGroup() {
  // console.log('members added::', $('#add-members').val())
  let newMembers = $('#add-members').val()
  $.ajax({
    url: `${host}/groups/${localStorage.getItem('groupId')}`,
    method: 'GET'
    ,headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  .done(response=>{
    let data={userId:newMembers}
    response.result.userId.forEach(user=>{
      data.userId.push(user._id)
    })
    $.ajax({
      url: `${host}/groups/${localStorage.getItem('groupId')}`,
      method: 'PUT',
      data: data
      ,headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .done(respo=>{
      $(".add.members").hide()
      $(".negative.message").hide()
      $(".positive.message").append(`<p>Success add new members</p>`)
      $(".positive.message").show()
      setTimeout(function(){
        $(".positive.message").hide()
      }, 3000)
    })
    .fail(err=>{
      $(".positive.message").hide()
      $(".negative.message").append(`<p>${err.responseJSON.message}</p>`)
      $(".negative.message").show()
    })
  })
  .fail(err=>{
    $(".positive.message").hide()
    $(".negative.message").append(`<p>${err.responseJSON.message}</p>`)
    $(".negative.message").show()
  })
}
