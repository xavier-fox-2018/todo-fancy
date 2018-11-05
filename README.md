# todo-fancy SERVER

|   Route           | HTTP      | Description  |
|  --------------   |:---------:| ---------------------------------------|
| /users            | POST      | Sign up with new user info               |
| /users            | GET       | Sign in while get an access token based on credientials |
| /users/login      | POST      | Login and get an access token |
| /users/Glogin     | POST      | Login with Google account and get access token |
| /users/find/:email| GET       | Get User data                         |
| /groups           | POST      | Create a new group                    |
| /groups           | GET       | Get Group Data  by User joined     |
| /groups/findbyid/:id| GET     | Get group Data by ID Group       |
| /groups/add       | POST      | Invite User to Group       |
| /groups/:id       | PUT       | Edit Name of Group by ID Group      |
| /groups/:id       | DELETE    | Delete Group and all task group       |
| /todos            | GET       | get all task user       |
| /todos            | POST      | Create a new task        |
| /todos/:id        | PUT       | Edit properties Task       |
| /todos/:id        | DELETE    | Delete Task                   |
| /todos/:id        | GET       | Get Detail Task by ID       |
| /todos/group      | POST      | Create Task for Group       |
| /todos/finish/:id | PUT       | Update Status Task       |
|  /quotes          | GET       | Get |
## Usage
 
**Server**
With only npm: 

```javascript
npm install
npm run dev
```

**Client**
```javascript
live-server
```

**Sign Up**
----
  Add user to the database.

* **URL**

  /users

* **Method:**
  
  `POST`

* **URL Params**

  None required

* **Data Params**

  name<br />
  email<br />
  password<br />
  
* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ msg: Register Success , please login :), data: registered user data }`

* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ msg: Create failed, err : error object }`


**Sign In**
----
  Check user's authentication and returns token if data is valid.

* **URL**

  /users/login

* **Method:**
  
  `POST`

* **URL Params**

  None required

* **Data Params**

  email<br />
  password

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ token: token from server }`

* **Error Response:**

* **Code:** 400 <br />
    **Content:** `{ msg : uset not found }`

  * **Code:** 401 <br />
    **Content:** `{ msg : Wrong Password }`

  OR

  * **Code:** 500 <br />
    **Content:** `{ err: error object }`

**Sign In by Google Acoount**
----
  Check user's Google authentication, register if new user, and returns token if data is valid.

* **URL**

  /users/Glogin

* **Method:**
  
  `POST`

* **URL Params**

  None required

* **Data Headers**

  token Google<br />
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ token: token from server }`

* **Error Response:**

* **Code:** 400 <br />
    **Content:** `{ msg : uset not found }`

  * **Code:** 401 <br />
    **Content:** `{ msg : Wrong Password }`

  OR

  * **Code:** 500 <br />
    **Content:** `{ err: error object }`

**Cek Login**
----
  if on browser have a token, token will be check valid or not. if valid, user login automatically

* **URL**

  /users

* **Method:**
  
  `GET`

* **URL Params**

  None required

* **Data Headers**

  token<br />
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ User Data }`

* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ msg: Create failed, err : error object }`

**Get Data User by Email**
----
  Get detail data user by email

* **URL**

  /users/find/:email

* **Method:**
  
  `GET`

* **URL Params**

  email

* **Data Headers**f

  token<br />
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ User Data }`

* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ err : error object }`

**Create Group**
----
  Create a new group, have invite users for members and have tasks group

* **URL**

  /groups

* **Method:**
  
  `POST`

* **URL Params**

  None required

* **Data Headers**

  token<br />

* **Data Params**
    name
  
* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ msg: Group Created, data: object new group }`

* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ err: error object }`

  * **Code:** 500 <br />
    **Content:** `{ msg: Create failed, err : error object }`

**Get Group Data**
----
  Get all Group Data where user joined group by secret token

* **URL**

  /groups

* **Method:**
  
  `get`

* **URL Params**

  None required

* **Data Headers**

  token<br />

* **Data Params**

    None required
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ groups datas }`

* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ err: error object }`

  * **Code:** 500 <br />
    **Content:** `{ err : error object }`


**Get Group Data**
----
  Get all Group Data by ID group

* **URL**

  /groups/findbyid/:id

* **Method:**
  
  `get`

* **URL Params**

  ID group

* **Data Headers**

  token<br />

* **Data Params**

    None required
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ groups datas }`

* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ err: error object }`

  * **Code:** 500 <br />
    **Content:** `{ err : error object }`

**Add user to member group**
----
  Invite user to join group member

* **URL**

  /groups/add

* **Method:**
  
  `post`

* **URL Params**

  none required

* **Data Headers**

  token<br />

* **Data Params**

    groupId<br />
    userId
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ msg: Add User Success, data: changed log update group }`

* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ err: error object }`

  * **Code:** 500 <br />
    **Content:** `{  err : error object }`

**Edit Group**
----
  Edit name of group

* **URL**

  /groups/:id

* **Method:**
  
  `put`

* **URL Params**

  id

* **Data Headers**

  token<br />

* **Data Params**

    name
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ msg: Group Edited, data: changed log update group }`

* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ err: error object }`

  * **Code:** 500 <br />
    **Content:** `{ err : error object }`
    
**Delete Group**
----
  Delete Group and All Task Group

* **URL**

  /groups/:id

* **Method:**
  
  `delete`

* **URL Params**

  id

* **Data Headers**

  token<br />

* **Data Params**

    none required
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ msg: Group Deleted, data: change log update group }`

* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ err: error object }`

  * **Code:** 500 <br />
    **Content:** `{ err : error object }`
    
**Get Task/Todo data**
----
  Get all Task User by secret token

* **URL**

  /todos

* **Method:**
  
  `get`

* **URL Params**

  none required

* **Data Headers**

  token<br />

* **Data Params**

    none required
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ data: All task data user }`

* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ err: error object }`

  * **Code:** 500 <br />
    **Content:** `{ err : error object }`

**add new Task/Todo**
----
  add/create Task for personal user

* **URL**

  /todos

* **Method:**
  
  `post`

* **URL Params**

  none required

* **Data Headers**

  token

* **Data Params**

  title<br />
  description<br />
  priority<br />
  dueDate<br />
  location<br />

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ msg: Add Task Success, data: new task }`

* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ err: error object }`

  * **Code:** 500 <br />
    **Content:** `{ err : error object }`

**add new Task/Todo for group**
----
  add/create Task for all group member

* **URL**

  /todos/group

* **Method:**
  
  `post`

* **URL Params**

  none required

* **Data Headers**

  token

* **Data Params**

  title<br />
  description<br />
  priority<br />
  dueDate<br />
  location<br />
  idGroup

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ msg: Task Created, data: new task }`

* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ err: error object }`

  * **Code:** 500 <br />
    **Content:** `{ err : error object }`

**edit Task/Todo**
----
  edit Task

* **URL**

  /todos/:id

* **Method:**
  
  `put`

* **URL Params**

  id

* **Data Headers**

  token

* **Data Params**

  title<br />
  description<br />
  priority<br />
  dueDate<br />
  location<br />

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ msg: Update Task Sucess, data: log update task }`

* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ err: error object }`

  * **Code:** 500 <br />
    **Content:** `{ err : error object }`

**Delete Task/Todo**
----
  Delete Task

* **URL**

  /todos/:id

* **Method:**
  
  `DELETE`

* **URL Params**

  id

* **Data Headers**

  token

* **Data Params**

    none required

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ msg: delete Task Sucess, data: log delete task }`

* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ err: error object }`

  * **Code:** 500 <br />
    **Content:** `{ err : error object }`

**Get Task/Todo**
----
  Get Task Data by id

* **URL**

  /todos/:id

* **Method:**
  
  `GET`

* **URL Params**

  id

* **Data Headers**

  token

* **Data Params**

    none required

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ Task Data }`

* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ err: error object }`

  * **Code:** 500 <br />
    **Content:** `{ err : error object }`

**Update Status Task/Todo**
----
  Update Status Task to finish/complete 

* **URL**

  /todos/finish/:id

* **Method:**
  
  `PUT`

* **URL Params**

  id

* **Data Headers**

  token

* **Data Params**

    none required

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ msg: Task finished, data: Log update data }`

* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ err: error object }`

  * **Code:** 500 <br />
    **Content:** `{ err : error object }`

**Get quote**
----
  Get quote from forismatic api

* **URL**

  /quotes/:id

* **Method:**
  
  `GET`

* **URL Params**

  none required

* **Data Headers**

  token

* **Data Params**

    none required

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ quote: quote text, author: author text }`

* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ err: error object }`

  * **Code:** 500 <br />
    **Content:** `{ err : error object }`


# todo-fancy ClIENT

**Login**
----
  Login to Web

* **URL**

  /index.html

* **HTTP Method:**
  
  `POST`

* **input**

    email<br />
    password

* **Success Response:**

  ` redirect to /home.html` 

* **Error Response:**

  `wrong email or password`

**Login with Google Account**
----
  Login to Web with google Account

* **URL**

  /index.html

* **HTTP Method:**
  
  `POST`

* **input**

    email<br />
    password

* **Success Response:**

  `redirect to /home.html` 

* **Error Response:**

  `redirect to /index.html`

**Register**
----
  create new user to database

* **URL**

  /index.html

* **HTTP Method:**
  
  `POST`

* **input**

    name<br />
    email<br />
    password

* **Success Response:**

  `Register Success, please login` 

* **Error Response:**

  `validation failed name, email or password required`

**Add task**
----
  create new task
* **URL**

  /home.html

* **HTTP Method:**
  
  `POST`

* **input**

    title<br />
    description<br />
    priority<br />
    dueDate<br />
    location<br />

* **Success Response:**

  `Task Created` 

* **Error Response:**

  `validation failed title, priority and dueDate required`

**Edit task**
----
  Edit task

* **URL**

  /home.html

* **HTTP Method:**
  
  `PUT`

* **input**

    title<br />
    description<br />
    priority<br />
    dueDate<br />
    location<br />

* **Success Response:**

  `Task Edited` 

* **Error Response:**

  `validation failed title, priority and dueDate required`

**Delete task**
----
  Delete task

* **URL**

  /home.html

* **HTTP Method:**
  
  `DELETE`

* **input**

    idGroup

* **Success Response:**

  `Task Deleted` 

* **Error Response:**

  ``

**Create Group**
----
  Create new Group

* **URL**

  /home.html

* **HTTP Method:**
  
  `POST`

* **input**

    name of group

* **Success Response:**

  `Group created` 

* **Error Response:**

  `validation: name required`

**Edit Group**
----
  Edit Group

* **URL**

  /home.html

* **HTTP Method:**
  
  `PUT`

* **input**

    name of group

* **Success Response:**

  `Group Edited` 

* **Error Response:**

  `validation: name required`

**Delete Group**
----
  Delete Group

* **URL**

  /home.html

* **HTTP Method:**
  
  `Delete`

* **input**

    id Group

* **Success Response:**

  `Group Deleted` 

* **Error Response:**

  ``

**Invite User to Group**
----
  Invite User to Group

* **URL**

  /home.html

* **HTTP Method:**
  
  `POST`

* **input**

    valid email for new member

* **Success Response:**

  `User added` 

* **Error Response:**

  `Validation: user not found, user has joined`