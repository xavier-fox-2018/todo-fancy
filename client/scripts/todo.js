$(document).ready(() => {
  let token = localStorage.getItem('token')
  if(!token){
    window.location.replace('/index.html')
  }else{
    $('.alert').on('click', '.alert-exit', event => {
      $(event.currentTarget).parent().hide()
      history.go(0)
    })
    $.ajax({
      method: "GET",
      dataType: "json",
      headers: {
        token: localStorage.getItem('token')
      },
      url: "http://localhost:3000/users/dashboard"
    })
    .done(data => {
      $('header').append(`
      <h1>Welcome, ${data.result.name}. Here are your to-dos:</h1>
      `)
      $.each(data.result.todo, (index, item) => {
        //console.log(item)
        if(item.status == 'pending'){
          $('.list-group').append(`
            <li class="list-group-item ${item._id} ${item.status}">
              <h4>${item.name}</h4>
              <p>status: ${item.status}</p>
              <p>deadline: ${new Date(item.dueDate)}</p>
              <p>description: ${item.description}</p>
              <button type="button" class="completebutton btn btn-primary">Complete</button>
              <button type="button" class="deletebutton btn btn-secondary">Delete</button>
            </li>
            `)
        }else{
          $('.list-group').append(`
            <li class="list-group-item ${item._id} ${item.status}">
              <h4>${item.name}</h4>
              <p>status: ${item.status}</p>
              <p>deadline: ${new Date(item.dueDate)}</p>
              <p>description: ${item.description}</p>
              <button type="button" class="deletebutton btn btn-secondary">Delete</button>
            </li>
            `)
        }
      })
    })
    .fail(error => {
      alert(error.responseText)
    })
    $('#submitTask').on('click', () => {
      $.ajax({
        method: 'POST',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          name: $('#nameInput').val(),
          description: $('#descriptionInput').val(),
          dueDate: $('#deadlineInput').val()
        },
        url: 'http://localhost:3000/todos/create'
      })
      .done(data => {
        //let result = data.result
        $('.alert-paragraph').remove()
        $('.alert-success').append(
          `<p class="alert-paragraph">Task Successfully created! Please refresh the page</p>
          <button class="alert-paragraph alert-exit">OK</button>`
        )
        $('.alert-success').show()
      })
      .fail(error => {
        $('.alert-paragraph').remove()
        $('.alert-danger').append(
          `<p class="alert-paragraph">Error! ${JSON.parse(error.responseText).error.message} </p>
          <button class="alert-paragraph alert-exit">OK</button>`
        )
        $('.alert-danger').show()
      })
    })

    $('.container').on('click', '.completebutton', event => {
      let classArray = $(event.currentTarget).parent().attr('class').split(' ')
      console.log(classArray[1])
      $.ajax({
        method: 'PATCH',
        headers: {
          token: localStorage.getItem('token')
        },
        url: `http://localhost:3000/todos/complete/${classArray[1]}`
      })
      .done(data => {
        $('.alert-paragraph').remove()
        $('.alert-success').append(
          `<p class="alert-paragraph">Task ${data.result.name} Successfully completed! Please refresh the page</p>
          <button class="alert-paragraph alert-exit">OK</button>`
        )
        $('.alert-success').show()
      })
      .fail(error => {
        $('.alert-paragraph').remove()
        $('.alert-danger').append(
          `<p class="alert-paragraph">Error! ${JSON.parse(error.responseText).error.message} </p>
          <button class="alert-paragraph alert-exit">OK</button>`
        )
        $('.alert-danger').show()
      })
    })
    $('.container').on('click', '.deletebutton', event => {
      let classArray = $(event.currentTarget).parent().attr('class').split(' ')
      console.log(classArray[1])
      $.ajax({
        method: 'DELETE',
        headers: {
          token: localStorage.getItem('token')
        },
        url: `http://localhost:3000/todos/delete/${classArray[1]}`
      })
      .done(data => {
        $('.alert-paragraph').remove()
        $('.alert-success').append(
          `<p class="alert-paragraph">Task ${data.result.name} Successfully deleted! Please refresh the page</p>
          <button class="alert-paragraph alert-exit">OK</button>`
        )
        $('.alert-success').show()
      })
      .fail(error => {
        $('.alert-paragraph').remove()
        $('.alert-danger').append(
          `<p class="alert-paragraph">Error! ${JSON.parse(error.responseText).error.message} </p>
          <button class="alert-paragraph alert-exit">OK</button>`
        )
        $('.alert-danger').show()
      })
    })
  }
})