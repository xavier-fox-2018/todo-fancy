let notif = new jBox('Modal', {
    maxWidth: 400,
    minWidth: 300,
    minHeight: 50,
    autoClose: 2500,
    overlay: false,
    addClass: 'jBox-Notice-blue',
    blockScroll: false,
    closeButton: false,
    closeOnClick : true,
    position: { x: 'right', y: 'bottom' },
    offset: { x: -45, y: -50 },
    audio : './blop'
})

let detail = new jBox('Modal', {
    reposition : true,
    repositionOnOpen : true,
    maxWidth: 450,
    minWidth: 400,
    minHeight: 250,
    target: $('#centerSide'),
    overlay: false,
    addClass: 'jBox-Notice-mint',
    blockScroll: false,
    offset: { x: 0, y: 30 },
    position: { x: 'center', y: 'top' },
    fixed: false,
    zIndex: 1,
    closeOnEsc: false,
    closeButton: 'title',
    animation: { open: 'slide:right', close: 'slide:left' },
    onClose: function () {
        $('#centerSide').hide();
        editTaskBox.close()
    },
})

let addTaskForm = new jBox('Modal', {
    adjustPosition: true,
    maxWidth: 450,
    minWidth: 400,
    minHeight: 250,
    target: $('#formSide'),
    overlay: false,
    addClass: 'jBox-Notice-mint',
    blockScroll: false,
    offset: { x: 0, y: 30 },
    position: { x: 'center', y: 'top' },
    fixed: false,
    zIndex: 1,
    closeOnEsc: false,
    closeButton: 'title',
    animation: { open: 'slide:left', close: 'slide:left' },
    onClose: function () {
        $('#formSide').hide();
        getGroups()
    },
    onOpen: function () {
        getGroups()
    }
})

let editTaskBox = new jBox('Modal', {
    adjustPosition: true,
    maxWidth: 450,
    minWidth: 400,
    minHeight: 250,
    target: $('#editSideWrapper'),
    overlay: false,
    addClass: 'jBox-Notice-mint',
    blockScroll: false,
    offset: { x: 0, y: 30 },
    position: { x: 'center', y: 'top' },
    fixed: false,
    zIndex: 1,
    closeOnEsc: false,
    closeButton: 'title',
    animation: { open: 'slide:right', close: 'slide:right' },
    onOpen: function () {
        detail.position({target: $('#centerSide')})
    },
    onClose: function () {
        $('#editSideWrapper').hide();
        if($('#centerSide').css('display') != 'none') {
            setTimeout(() => {
                detail.position({target: $('#centerSide')})
            }, 200);
        }
    },
})

$(document).ready(function () {

    getTodos() 
    $('#groupContainer').load('groups.html');
    getGroups()

});

function getGroups() {

    $('#listGroupToAddTask').empty()
    $('#listGroupToAddTask').prepend(`
        <option value="">select group</option>
    `);

    $.ajax({
        type: "get",
        url: "https://todofancy.adishare.online/groups",
        headers: {
            token : localStorage.getItem('token')
        },
        dataType: "json"  
    })
    .done(groups => {
        $.each(groups, function (i, group) { 
            $('#listGroupToAddTask').append(`
                <option value="${group._id}">${group.name}</option>
            `);
        });
    })
    .fail(err => {
        console.log(err);
    })

}

function getTodos() {

    $('.items').find('*').not('h2').remove();
    $.ajax({
        type: "get",
        url: "https://todofancy.adishare.online/todos",
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done(todos => {

        detail.close()
        todos.forEach(todo => {

            let priorityColor = 'light'
            if(todo.priority == 'medium') priorityColor = 'warning'
            if(todo.priority == 'hight') priorityColor = 'danger'

            let outdate = false
            if(new Date(todo.deadline) < new Date()) outdate= true

            $('.items').prepend(
                `
                <input id="${todo._id}" type="checkbox" onchange="changeTaskStatus($(this).attr('id'))">
                <label for="${todo._id}" >
                    ${todo.title}
                    <span id="inGroup${todo._id}" class="badge badge-pill badge-success pull-right" style="display: ${todo.inGroup ? 'normal' : 'none'}"><i>${todo.inGroup ? todo.inGroup.name : ''}</i></span> 
                    <span id="dateStatus${todo._id}" class="badge badge-pill badge-dark pull-right" style="display: ${outdate ? 'normal' : 'none'}"><i>out of date</i></span>
                    <span class="badge badge-pill badge-${priorityColor} pull-right"><i>${todo.priority}</i></span>
                </label>
                `
            );

            if (todo.status == 'done') {
                $(`#${todo._id}`).attr('checked', true)
                $(`#dateStatus${todo._id}`).css('display', 'none');
            }

        });

    })
    .fail(err => {
        console.log(err);
    })

}

function changeTaskStatus(todoId) {

    $.ajax({
        type: "put",
        url: `https://todofancy.adishare.online/todos/${todoId}/status`,
        headers: {
            token : localStorage.getItem('token')
        },
        success: function (response) {
            notif.setContent(`${response.title}'s Status changed to : ${response.status}`).open()
            detail.close()
        }
    });

}

function moveStatus(todoId) {

    changeTaskStatus(todoId)
    getTodos()

}

function deleteTask(todoId) {

    $.ajax({
            type: "delete",
            url: `https://todofancy.adishare.online/todos/${todoId}`,
            dataType: "json",
            headers: {
                token : localStorage.getItem('token')
            },
        })
        .done( () => {
            detail.close()
            $(`#${todoId}`).remove();
            $(`label[for=${todoId}]`).remove();
            notif.setContent('delete task Succes').open()
        })
        .fail(err => {
            console.log(err);
        })

}

function editTodo(todoId,todoTitle,todoPriority,todoDeadline,todoNote) {
    
    $('#editSideWrapper').show();
    setTimeout(() => {
        let content = `
            <div id="editSide" class="span3">
                <form>
                    <label>Task Title</label>
                    <input type="text" id="taskTitleEdit" name="taskTitleEdit" value="${todoTitle}" class="span3">

                    <label>Set Time</label>
                    <input type="datetime-local" id="taskDeadlineEdit" name="taskDeadlineEdit" value="${todoDeadline.slice(0,16)}" class="span3">

                    <label>Set Priority</label>
                    <select id="taskPriorityEdit">
                        <option value="medium" ${todoPriority == 'medium' ? selected="selected" : selected=false }>Medium</option>
                        <option value="hight" ${todoPriority == 'hight' ? selected="selected" : selected=false }>Hight</option>
                        <option value="low" ${todoPriority == 'low' ? selected="selected" : selected=false }>Low</option>
                    </select>

                    <label>Task Note</label>
                    <input type="text" id="taskNoteEdit" name="taskNoteEdit" value="${todoNote}" class="span3">

                    <br><br>
                    <input type="button" id="editTaskBtn" onclick="saveTodo('${todoId}')" value="Save" class="btn-sm btn-info">
                </form>
            </div>
        `

        editTaskBox.setTitle('Edit Task').setContent(content).open()
    }, 50);
    
}

function saveTodo(todoId) {
    
    $.ajax({
            type: "PUT",
            url: `https://todofancy.adishare.online/todos/${todoId}`,
            headers: {
                token: localStorage.getItem('token')
            },
            data: {
                title: $('#taskTitleEdit').val(),
                deadline: $('#taskDeadlineEdit').val(),
                priority: $('#taskPriorityEdit').val(),
                note: $('#taskNoteEdit').val()
            }
        })
        .done(todo => {
            notif.setContent('save success').open()
            editTaskBox.close()
            getTodos()
            getGroups()
            addTaskForm.setContent($('#addTaskWrapper'))
        })
        .fail(err => {
            notif.setContent(err.responseJSON.message).open()
        })
    
};

function addTodoToGroup(groupId,todoId) {

    $.ajax({
        type: "get",
        url: `https://todofancy.adishare.online/groups/addTodo/${groupId}/${todoId}`,
        headers: {
            token : localStorage.getItem('token')
        },
        dataType: "json",
    })
    .done(response => {
        console.log(response.message);
    })
    .fail(err => {
        console.log(err);
    })

}

$(document).ready(function () {

    $('#openNewTaskBtn').click(function (e) {
        e.preventDefault();
        detail.close()
        $('#formSide').show();
        editTaskBox.close()
        getGroups()
        setTimeout(() => {
            addTaskForm.setTitle('New Task').setContent($('#addTaskWrapper')).open()
        }, 50);
    });

    $('#addTaskBtn').click(function (e) {
        e.preventDefault()
        $.ajax({
                type: "POST",
                url: "https://todofancy.adishare.online/todos",
                headers: {
                    token: localStorage.getItem('token')
                },
                data: {
                    title: $('#taskTitleAdd').val(),
                    deadline: $('#taskDeadlineAdd').val(),
                    priority: $('#taskPriorityAdd').val(),
                    note: $('#taskNoteAdd').val(),
                    inGroup : $('#listGroupToAddTask').val() || undefined
                }
            })
            .done(todo => {

                if($('#listGroupToAddTask').val() != ''){
                    let todoId = todo._id
                    let groupId = $('#listGroupToAddTask').val()
                    addTodoToGroup(groupId,todoId)
                }

                notif.setContent(`new task added : ${todo.title}`).open()
                addTaskForm.close()
                $('#addTaskWrapper').find('form')[0].reset();
                getTodos()

            })
            .fail(err => {

                notif.setContent(err.responseJSON.message).open()

            })
    });

}); 

$(document).ready(function () {
    
    $(".items").on("click",'label', function (e) {
        e.preventDefault()
        addTaskForm.close()
        editTaskBox.close()
        $('#centerSide').show();

        let clickedTodoId = $(e.currentTarget).attr('for');
        $.ajax({
            type: "get",
            url: `https://todofancy.adishare.online/todos/${clickedTodoId}`,
            success: function (response) {
                detail.setTitle(response.title).setContent(
                    `<div class="taksDetailWrapper">
                        <div class="list-group">
                            <div class="list-group-item info">
                                <b>${response.priority}</b>
                                <i>Priority</i>
                            </div>
                            <div class="list-group-item">
                                <i><small>Date & Time</small></i>
                                <div>${response.deadline}</div>
                            </div>
                            <div class="list-group-item">
                                <i><small>Notes</small></i>
                                <div>${response.note}</div>
                            </div>
                            <div class="list-group-item">
                                <i><small>Status</small></i>
                                <div>${response.status}</div>
                            </div>
                            <div class="list-group-item text-center" style="padding: 17px;">
                                <button class="btn btn-info" onclick="moveStatus('${response._id}')">${response.status=='pending'?'Done' : 'Undone'}</button>
                                <button class="btn btn-warning" onclick="editTodo('${response._id}','${response.title}','${response.priority}','${response.deadline}','${response.note}')">Edit</button>
                                <button class="btn btn-danger" onclick="deleteTask('${response._id}')">Delete</button>
                            </div>
                        </div>
                    </div>`
                )

                setTimeout(() => {
                    detail.open()
                }, 50);
            }
        });
    });

});