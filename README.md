**TODOFANCY**
----

* **URL**

Route | HTTP | Description
------------ | ------------- | -------------
/users/googleSignIn | POST | sign in with google account
/users| POST | user registration
/users/login | GET  | user login
/users/task | GET | Get user task
/users/food | GET | Get user food recommendation
/users/food/search/:name' | GET | Search food recommendation by name params
/users/task/:status | GET | Filter task by status
/users/task/search/:title | GET | Filter task by title
/users/addTask  | POST  | Add task for user
/users/delete/:id | DELETE | Delete a task that owns by user
/users/task/update  | PUT  | Update a task that owns by user


* **Method:**

  `GET` | `POST` | `DELETE` | `PUT`
  
*  **URL Params**


   **Required:**
 
   `id=[integer]` <br />
   `name=[string]` <br />
   `status=[string]` <br />
   `title=[string]` <br />


* **Data Params**

  * **Routes: /users/googleSignIn**


  `data : { 'gToken' : id_token }`
  <br /><br />


  * **Routes: /users/**
 
 

  `data : {
        username : "USERNAME_HERE" ,
        email : "EMAIL_HERE ,
        password : "PASSWORD_HERE
      }`
  <br />
  Data types : username : String, email : String, password : String
  <br /><br />


  * **Routes: /users/login**



  `data : {
        email : "EMAIL_HERE ,
        password : "PASSWORD_HERE
      }`
  <br />
  Data types :  email : String, password : String
  <br /><br />


  * **Routes: /users/addTask**



  `data : {
            'taskName' : "TASK_TITLE" ,
            'description' : "DESCRIPTION_HERE" ,
            'status' : "TASK_STATUS_HERE ,
            'dueDate' : "DUE_DATE_HERE
          }`
  <br />
  Data types : taskName : String, description : String, status : String, dueDate : Date
  <br /><br />


  * **Routes: /users/task/update**  


  `data : {
          taskId : "TASK_ID",
          name : "TASK_TITLE",
          desc : "DESCRIPTION_HERE",
          status : "TASK_STATUS_HERE,
          date : "DUE_DATE_HERE
        }`
  <br />
  Data types : taskId : String, name : String, desc : String, status : String, date : Date
  <br /><br />

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{ msg : 'login success', JWT_TOKEN : 'your_token' }`

  * **Code:** 200 <br />
    **Content:** `{ token : 'your_token' }`

  * **Code:** 200 <br />
    **Content:** `{ [{list_of_task}] }`
  
  * **Code:** 200 <br />
    **Content:** `{ [{list_of_food_recommendation}] }`

  * **Code:** 200 <br />
    **Content:** `{ msg : 'success delete task' }`
  
  * **Code:** 200 <br />
    **Content:** `{ msg : 'data update success' }`

  * **Code:** 201 <br />
    **Content:** `{ msg : 'user successfully created' }`


 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ msg : 'unauthorized access' }`

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : 'invalid email / password' }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : 'internal server error' }`
  

* **Sample Call:**

	```javascript
      
    Using POST to addTask
    
    $("#addTask").click((e) => {
        e.preventDefault();
        $.ajax({
          url : "http://localhost:3000/users/addTask",
          method : "POST",
          headers : {
            'token' : localStorage.getItem("token")
          },
          data : {
            'taskName' : $("#toDoName").val(),
            'description' : $("#toDoDesc").val(),
            'status' : $("#toDoStatus").val(),
            'dueDate' : $("#toDoDate").val()
          }
        })
        .done((response) => {
          console.log(response);
          location.reload(true);
        })
        .fail(err => {
          console.log(err);
        })
    })
    ```


