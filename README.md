# todo-fancy


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

## Usage
 
**Server**
With only npm: 

```javascript
npm install
npm run dev
```

**Client**
live-server


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
