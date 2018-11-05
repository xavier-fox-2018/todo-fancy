**ToDo Fancy**
====
  Simple user CRUD, authentication, and authorization API with Express JS, Sequelize, and JSON Web Token.

## List of API Routers

Route | HTTP | Description
----- | ---- | -----------
/register | POST | Register a user
/login | POST | Log in a user
/logingoogle | POST | Log in a user and create new account with Google
/todo/task | POST | Create new todo task
/todo/task | GET | Read all user task list
/todo/task | PUT | Update one user task
/todo/task | DELETE | Delete one user task
/todo/check | PUT | Check to mark a task as completed
/todo/onetask | GET | Read one user task

## Usage

```javascript
npm install
nodemon app
```


**Register**
----
  Add user to the database and returns json response.

* **URL**

  /register

* **Method:**
  
  `POST`

* **URL Params**

  None required

* **Data Params**

  Name<br />
  Email<br />
  Password<br />

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ message: 'new user is successfully created!' }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`


**Login**
----
  Check user's authentication and returns token if data is valid.

* **URL**

  /login

* **Method:**
  
  `POST`

* **URL Params**

  None required

* **Data Params**

  Email<br />
  Password

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ token: jwtToken, name: data.name }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: 'email / password is wrong!' }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: 'Your email is not registered. Please, register first!' }` 

**Google Login**
----
  Login with Google API

* **URL**

  /logingoogle

* **Method:**
  
  `POST`

* **URL Params**

  None required

* **Data Params**

  None required
  
* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ message: 'new user is successfully created!', token: jwtToken, name: data.name }`

    OR

  * **Code:** 200 <br />
    **Content:** `{ token: jwtToken, name: data.name }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`  

**Create New Task**
----
  Create new task for one user

  * **URL**

  /todo/task

* **Method:**
  
  `POST`

* **URL Params**

  None required

* **Data Params**

  None required

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ message: 'New Task has been created!' }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

**Read All Task**
----
  Read all task from one user

  * **URL**

  /todo/task

* **Method:**
  
  `GET`

* **URL Params**

  None required

* **Data Params**

  None required

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{ ALL TASK FROM USER }]`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

**Read a Task**
----
  Read a task from one user

  * **URL**

  /todo/onetask

* **Method:**
  
  `GET`

* **URL Params**

  None required

* **Data Params**

  None required

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ data }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

**Update a Task**
----
  Update a task from one user

  * **URL**

  /todo/task

* **Method:**
  
  `PUT`

* **URL Params**

  None required

* **Data Params**

  None required

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ success status }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

**Check a Task**
----
  Mark a task as completed from one user

  * **URL**

  /todo/check

* **Method:**
  
  `PUT`

* **URL Params**

  None required

* **Data Params**

  None required

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ if status from before is 'true', change it to 'false', and vice versa }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

**Delete a Task**
----
  Delete a task from one user

  * **URL**

  /todo/task

* **Method:**
  
  `DELETE`

* **URL Params**

  None required

* **Data Params**

  None required

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ status success }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`
