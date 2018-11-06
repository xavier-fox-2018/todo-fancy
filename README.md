# todo-fancy


  <_Simple Todo App with authentication and authorization API build using Express JS, Mongoose, and JSON Web Token in the server side. As for the client side, it was built using jQuery and Bootstrap 4._>


  ## List of API Routers
 Route | HTTP | Description
----- | ---- | -----------
/user/signup | POST | Route used to register a new account
/user/signin | POST | Route used to let user signin  to app
/signinfb | POST | Route used to let user register or login to app via Facebook account
/task | POST | Route used to create a task
/task | GET | Route used to retrieve all tasks belongs to a user
/task/done | GET | Route used to retrieve all completed tasks belonging to the user
/task/do | GET | Route used to retrieve all unfinished tasks belonging to the user
/task/:id | GET | Route used to edit 
/task/:id | PUT | Route used to update a task
/task/:id | DELETE | Route used to delete a task
/task/:id/done | PATCH | Route used to mark a task as done
/task/:id/do | PATCH | Route used to mark a task as undone



## Usage
 With only npm: 

 ```javascript

npm install
node app.js in server folder
run index.html using live-server (optional)

```



**Sign Up**
----

Register new account to the database and returns a json response if succeeded.

* **URL**

   /user/signup 

* **Method**
  
  `POST`

* **URL Params**

    None Required

* **Data Params**

    Name<br />
    Email<br />
    Password

* **Success Response**

    * Code : 201 CREATED<br/>
    **Content:** `{ `<br/>` 
    err: false, `<br/>`
    message: `Success to add ${newUser.name}`,`<br/>`
    data: newUser,`<br/>`
    token: Token retrieved from server generated using json web token
    }`
  
* **Error Response:**
   * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error }`

    OR
    * **Code:** 400 Bad Request <br />
    **Content:** `{message:'Email already registered!'}`


**Sign In**
----

Verify user's authentication and returns token if data is valid..

* **URL**

   /user/login 

* **Method**
  
  `POST`

* **URL Params**

    None Required

* **Data Params**

    Email<br />
    Password

* **Success Response**

    * Code : 200 OK<br/>
    **Content:** `{ `<br/>`
    err: false, name: <name> ,`<br/>`token: Token retrieved from server generated using json web token`<br/>`
    }`
  
* **Error Response:**
   * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err:true, err }`

    OR
    * **Code:** 400 Bad Request <br />
    **Content:** `{message:"Password is wrong"}`



**Facebook Login**
----

Let user skip registration phase by registering into the app using information from their Facebook account. Returns token if succeeded.

* **URL**

   /user/signinfb 

* **Method**
  
  `POST`

* **URL Params**

    None Required

* **Data Params**

    None Required

* **Success Response**

    * Code : 201 CREATED<br/>
    **Content:** `{ `<br/>`err: false, `<br/>`name: <name> ,`<br/>` message: `Success to add ${newUser.name}`,`<br/>`
    data: newUser, `<br/>`token: Token retrieved from server generated using json web token`<br/>`
    }`

    OR
    * **Code:** 200 OK <br />
    **Content:** `{`<br/>`token: token, `<br/>`name: result.name`<br/>`}`


* **Error Response:**
   * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error }`



**Create a Task**
----

  Post request to server to create a task.

 * **URL**

    /tasks

 * **Method:**

    `POST`

 * **URL Params**

    None required

 * **Data Params**

    Author<br />
    Name<br/>
    Description<br />
    Due Date

 * **Headers**

   access-token (used to let server verify the identity of user who requested the data)

 * **Success Response:**

   * **Code:** 201 CREATED <br />
    **Content:** `{ task: task data }`
    
 * **Error Response:**
   * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err }`
   
   OR

   * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ "message": "No Authenticate" }`


**Get Users Tasks**
----
  Request to retrieve users personal tasks.

 * **URL**

   /task

 * **Method:**
  
    `GET`

 * **URL Params**

   None required

 * **Data Params**

   None required

 * **Headers**

   access-token (used to let server verify the identity of user who requested the data)

 * **Success Response:**

   * **Code:** 200 OK <br />
    **Content:** `{ all tasks data as an array of object }`

 * **Error Response:**
   * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err }`
   OR
   * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ "message": "No Authenticate" }`


**Get User Task Done**
----

  Route used to retrieve all completed tasks belonging to the user.

 * **URL**

   /task/done

 * **Method:**
  
    `GET`

 * **URL Params**

   None required

 * **Data Params**

   None required

 * **Headers**

   access-token (used to let server verify the identity of user who requested the data)

 * **Success Response:**

   * **Code:** 200 OK <br />

    **Content:** `{task: all tasks data as an array of object}`

 * **Error Response:**

   * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err }`

   OR

   * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ "message": "No Authenticate" }`


**User Task Undone**
----

  Route used to retrieve all unfinished tasks belonging to the user.

 * **URL**

   /task/do

 * **Method:**
  
    `GET`

 * **URL Params**

   None required

 * **Data Params**

   None required

 * **Headers**

   access-token (used to let server verify the identity of user who requested the data)

 * **Success Response:**

   * **Code:** 200 OK <br />

    **Content:** `{task: all tasks data as an array of object}`

 * **Error Response:**

   * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err }`

   OR

   * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ "message": "No Authenticate" }`



**To Edit Task**
----

  Route used to edit

 * **URL**

   /task/:id

 * **Method:**
  
    `GET`

 * **URL Params**

   id (edit task)

 * **Data Params**

   None required

 * **Headers**

   access-token (used to let server verify the identity of user who requested the data)

 * **Success Response:**

   * **Code:** 200 OK <br />

    **Content:** `{task: all tasks data as an array of object}`

 * **Error Response:**

   * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err }`

   OR

   * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ "message": "No Authenticate" }`



**Edit Task**
----

  Route used to update a task

 * **URL**

   /task/:id

 * **Method:**
  
    `PUT`

 * **URL Params**

   id (edit task)

 * **Data Params**

    author<br />
    name<br />
    description<br />
    dueDate

 * **Headers**

   access-token (used to let server verify the identity of user who requested the data)

 * **Success Response:**

   * **Code:** 200 OK <br />

    **Content:** `{task: all tasks data as an array of object}`

 * **Error Response:**

   * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err }`

   OR

   * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ "message": "No Authenticate" }`


**Delete Task**
----

  Route used to delete a task

 * **URL**

   /task/:id

 * **Method:**
  
    `DELETE`

 * **URL Params**

    id (edit task)

 * **Data Params**

    None required

 * **Headers**

   access-token (used to let server verify the identity of user who requested the data)

 * **Success Response:**

   * **Code:** 200 OK <br />

    **Content:** `{task: all tasks data as an array of object}`

 * **Error Response:**

   * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err }`

   OR

   * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ "message": "No Authenticate" }`




**Mark as Done Task**
----

  Route used to mark a task as done

 * **URL**

   /task/:id/done

 * **Method:**
  
    `PATCH`

 * **URL Params**

    id (edit task)

 * **Data Params**

    None required

 * **Headers**

   access-token (used to let server verify the identity of user who requested the data)

 * **Success Response:**

   * **Code:** 200 OK <br />

    **Content:** `{task: all tasks data as an array of object}`

 * **Error Response:**

   * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err }`

   OR

   * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ "message": "No Authenticate" }`



**Mark as Undone Task**
----

  Route used to mark a task as undone

 * **URL**

   /task/:id/do

 * **Method:**
  
    `PATCH`

 * **URL Params**

    id (edit task)

 * **Data Params**

    None required

 * **Headers**

   access-token (used to let server verify the identity of user who requested the data)

 * **Success Response:**

   * **Code:** 200 OK <br />

    **Content:** `{task: all tasks data as an array of object}`

 * **Error Response:**

   * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err }`

   OR

   * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ "message": "No Authenticate" }`




