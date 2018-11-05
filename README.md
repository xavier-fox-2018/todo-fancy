**Todo Fancy**
----
  a simple todo application using REST-API

## List of API Routers

Route | HTTP | Description
----- | ---- | -----------
/register | POST | Register a user
/googlelogin/ | POST | Register a user using google Oauth
/login | POST | Login user
/todo | GET | Get all todos from current login user
/todo | POST | Post a todo to the current login user
/todo/:id | DELETE | Delete a todo
/todo/complete/:id | PATCH | complete a todo
/todo/uncomplete/:id | PATCH | uncomplete a todo
/todo/:id | PUT | update a todo

## Usage



```javascript
npm install
start mongoDB
live-server
node app.js
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

  FullName<br />
  email<br />
  Password<br />

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{message: 'registration successfull'}`

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

  email<br />
  Password

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ token: token object }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "invalid password" }`
OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "no user found" }`
   
**Login with google**
----
  Add user to the database and returns json response.

* **URL**

  /googlelogin

* **Method:**
  
  `POST`

* **URL Params**

  None required

* **Data Params**

  email<br />
  Password<br />

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{token: token object}`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`



**Get Todos**
----
  Request all todos data, can only be accessed by authenticated and authorized user. Returns array of todos in json.

* **URL**

  /todo

* **Method:**
  
  `GET`

* **URL Params**

  None required

* **Data Params**

  None required

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{ todos data }]`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`  

    OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "no token access" }`

    OR

  * **Code:** 400 UNAUTHORIZED <br />
    **Content:** `{ message: 'no login' }`


    OR

  * **Code:** 500 INERNAL SERVER ERROR <br />
    **Content:** `{ err: err object' }`



**Post a Todo**
----
  Add a todo to the database, can only accessed by authenticated user according to user's login. Returns json response.

* **URL**

  /todo

* **Method:**
  
  `POST`

* **URL Params**

  None required

* **Data Params**

  title<br />
  description<br />
  dueDate<br />
  priority<br />
  isComplete : by default : `false`<br />

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ message: 'succ create a todo'}`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`  

    OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "no token access" }`

    OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "no login" }`

**Delete a todo**
----
  Remove one todo data from the database which id is based on req.params.id. Can only be accessed by authenticated user. Returns json response.

* **URL**

  /todo/:id

* **Method:**
  
  `DELETE`

* **URL Params**

  id

* **Data Params**

  None Required

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ message: succ delete a todo}`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`  

    OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "no token access" }`

    OR

   * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "login" }`

**Update a todo**
----
  Update one todo data from the database which id is based on req.params.id. Can only be accessed by authenticated user. Returns json response.

* **URL**

  /todo/:id

* **Method:**
  
  `PUT`

* **URL Params**

  id

* **Data Params**

  title<br />
  description<br />
  dueDate<br />
  priority<br />

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ message: succ update a todo }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`  

    OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "no token access" }`

    OR

  * **Code:** 401  BAD REQUEST  <br />
    **Content:** `{ message: 'no login' }`


**Complete a todo**
----
  Update only isComplete  status to `true` property of one todo from the database which id is based on req.params.id. Can only be accessed by authenticated user. Returns json response.

* **URL**

  /todo/complete/:id

* **Method:**
  
  `PATCH`

* **URL Params**

  id

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ message: succ complete a todo }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`  

    OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "no token access" }`

    OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "no login" }`



**UNComplete a todo**
----
  Update only isComplete to `false` status property of one todo from the database which id is based on req.params.id. Can only be accessed by authenticated user. Returns json response.

* **URL**

  /todo/complete/:id

* **Method:**
  
  `PATCH`

* **URL Params**

  id

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ message: succ uncomplete a todo }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`  

    OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "no token access" }`

    OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "no login" }`
