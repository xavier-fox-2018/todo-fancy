
///// CREATE NEW TASK /////

$('#submitNewTask').on('click', function() {
    let inputName = $('#inputName').val()
    let inputDescription = $('#inputDescription').val()
    let inputDueDate = new Date($('#inputDueDate').val())
    // console.log('masuk click', inputName, inputDescription, inputDueDate);

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/task',
        data: {
            name: inputName,
            description: inputDescription,
            due_date: inputDueDate
        }
    })
    .done(data => {
        console.log(`data saved ${data}`) 
        $('#tableTask').append(listTask2)
    })
    .fail( err => {
        console.log(err);
        
    })
})


/////// LIST ALL TASK ////////////
// using toggle
const listTask = function() {
    $('.mainBody').empty()
    console.log('all list nihh');
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/task',
        json: true
    })
    .done(data => {
        $('.mainBody').append(`
            <table class="table">
                <thead>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Due Date</th>
                    <th>Option</th>
                </thead>
                <tbody id="tableTask">
                </tbody>
            </table>
        `)
        $.each(data, function(index, value) {
            $('#tableTask').append(`
                <tr id="tableTaskRow${data[index]._id}">
                        <td>${data[index].name}</td>
                        <td>${data[index].description}</td>
                        <td>${data[index].due_date}</td>
                        <td>
                            <div class="btn-group" role="group" aria-label="Basic example">
                                <button type="button" class="btn btn-secondary deleteTask" value="${data[index]._id}">Delete</button>
                                <button type="button" class="btn btn-secondary editTask${data[index]._id}"> Edit</button>
                            </div>    
                        </td>
                </tr>
                <tr>
                    <td colspan="4" id="toggleEdit${data[index]._id}" style="display: none">
                        <form>
                            <div class="form-group">
                                <label for="editName">Name</label>
                                <input type="text" value="${data[index].name}" class="form-control" id="editName" aria-describedby="emailHelp" placeholder="Enter task name">
                            </div>
                            <div class="form-group">
                                <label for="editDescription">Description</label>
                                <textarea class="form-control" id="editDescription" rows="3" placeholder="Enter description here">${data[index].description}</textarea>
                            </div>
                            <div class="form-group">
                                <label for="editDueDate">Due Date</label>
                                <input type="datetime-local" class="form-control" id="editDueDate" aria-describedby="emailHelp" placeholder="Enter new task name">
                            </div>
                            <button type="submit" class="btn btn-primary" id="submitEditedTask" >Edit Task</button>
                        </form>
                    </td>
                </tr>

            `)
            $('.mainBody').on('click', `.editTask${data[index]._id}`, function(event){
                $(`#toggleEdit${data[index]._id}`).toggle(200)
                
            })
        })
    })
    .fail(err => {
        console.log(err);
    })
}

// using new page
const listTask2 = function() {
    $('.mainBody').empty()
    console.log('all list nihh');
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/task',
        json: true
    })
    .done(data => {
        $('.mainBody').append(`
            <table class="table">
                <thead>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Due Date</th>
                    <th>Option</th>
                </thead>
                <tbody id="tableTask">
                </tbody>
            </table>
        `)
        $.each(data, function(index, value) {
            $('#tableTask').append(`
                <tr id="tableTaskRow${data[index]._id}">
                        <td>${data[index].name}</td>
                        <td>${data[index].description}</td>
                        <td>${data[index].due_date}</td>
                        <td>
                            <div class="btn-group" role="group" aria-label="Basic example">
                                <button type="button" class="btn btn-secondary deleteTask" value="${data[index]._id}">Delete</button>
                                <button type="button" class="btn btn-secondary editTask" value="${data[index].name}"> Edit</button>
                            </div>    
                        </td>
                </tr>
            `)
        })
    })
    .fail(err => {
        console.log(err);
    })
}

$('#listTask').click(listTask2)   


////// DELETE TASK /////////
$(".mainBody").on('click', '.deleteTask', function(event) {
    let taskID = $(event.currentTarget).attr('value') // plajari lagi!!
    // console.log(taskID);
    
    $.ajax({
        method: 'DELETE',
        url: `http://localhost:3000/task/${taskID}`
    })
    .done( data => {
        // console.log(data); // get ajax again
        $(`#tableTaskRow${taskID}`).detach()
    })
    .then(err => {
        console.log(err);
        
    })
})




//////// EDIT TASK DETAIL /////////// ga bisaaaa!!
$('.mainBody').on('click', '.editTask', function(event) {
    let taskName = $(event.currentTarget).attr('value')
    console.log(taskName);
    
    $('.mainBody').empty()
    $('.mainBody').append(`
        <form>
            <div class="form-group">
                <label for="editName">Name</label>
                <input type="text" value="${taskName}" class="form-control" id="editName" aria-describedby="emailHelp" placeholder="Enter task name">
            </div>
            <div class="form-group">
                <label for="editDescription">Description</label>
                <textarea class="form-control" id="editDescription" rows="3" placeholder="Enter description here"></textarea>
            </div>
            <div class="form-group">
                <label for="editDueDate">Due Date</label>
                <input type="datetime-local" class="form-control" id="editDueDate" aria-describedby="emailHelp" placeholder="Enter new task name">
            </div>
            <button type="submit" class="btn btn-primary" id="submitEditedTask" >Edit Task</button>
        </form>
    `)


    // $.ajax({
    //     method: 'PUT',
    //     url: 'http://localhost:3000/task',
    //     data: {
            
    //     }
    // })
    // .done( data => {
    //     console.log(data);
        
    // })
    // .fail(err => {
    //     console.log(err);
    // })
})

    $('.mainBody').on('click', '#submitEditedTask', function(event) {
        console.log('click submittt');
        
    })
