**Todo Fancy**
----
  Simple Todo App with authentication and authorization API build using Express JS, Mongoose, and JSON Web Token in the server side. As for the client side, it was built using jQuery and Bootstrap 4. This app also has group feature which allows you to make your own group and invite your friends over to share your related todos or plan some tasks together.

## List of API Routers

Route | HTTP | Description
----- | ---- | -----------
/register | POST | Route used to register a new account
/login | POST | Route used to let user login to app
/googlelogin | POST | Route used to let user register or login to app via Google account
/users/profile | GET | Route used to retrieve user's profile data including their todos and groups
/users/:groupId | GET | Route used to get other users usernames and check if they're available to be invited in your group
/users/group | POST | Route used to create a group
/users/invite | PATCH | Route used to invite other users to your group
/users/accept | PATCH | Route used to accept other users invitations to join their group
/users/refuse | PATCH | Route used to refuse other users invitations to join their group
/tasks | GET | Route used to retrieve all tasks belongs to a user
/tasks | POST | Route used to create a task
/tasks/:id | PUT | Route used to edit and update a task
/tasks/:id | DELETE | Route used to delete a task
/tasks/markdone/:id | PATCH | Route used to mark a task as done
/tasks/markundone/:id | PATCH | Route used to mark a task as undone
/tasks/group/:groupId | GET | Route used to retrieve all tasks belongs to a group
/tasks/group | POST |  Route used to create a task for groups

## Usage

With only npm: 

```javascript
npm install
node app.js in server folder
run index.html using live-server (optional)
```

**Register**
----
  Register new account to the database and returns a json response if succeeded.

* **URL**

  /register

* **Method:**
  
  `POST`

* **URL Params**

  None required

* **Data Params**

  Usename<br />
  Email<br />
  Password

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{ success: true, message: Account <username> registered }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`


**Log In**
----
  Verify user's authentication and returns token if data is valid.

* **URL**

  /login

* **Method:**
  
  `POST`

* **URL Params**

  None required

* **Data Params**

  Username<br />
  Password

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{ token: token retrieved from server generated using json web token }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Wrong username or password" }`


**Google Log In**
----
  Let user skip registration phase by registering into the app using information from their Google account. Returns token if succeeded.

* **URL**

  /googlelogin

* **Method:**
  
  `POST`

* **URL Params**

  None required

* **Data Params**

  None required

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{ token: token retrieved from server generated using json web token }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`


**Get User Profile**
----
  Request current user's data. Mainly used to retrieve list of invitations sent to user.

* **URL**

  /users/profile

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
    **Content:** `{ data: including users taskList, invitationList, groupList, and some private data }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: User's exclusive feature" }`


**Get Other Users Data For Group Invitation Purposes**
----
  To invite other users to your group, server will find users who haven't get your invitation yet or users who is currently not a member of your group.

* **URL**

  /users/:groupId

* **Method:**
  
  `GET`

* **URL Params**

  groupId (this params is needed because server needs to check the other users if they've already gotten an invitation to join this group(known with this groupId) and if they're already part of the group)

  optional: username query (this route will detect if there's a username query or not, if there's one, then the server will search users based on that username query params. This search feature is built with regex functionality)

* **Data Params**

  None required

* **Headers**

  access-token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ data: users respective data }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: User's exclusive feature" }`


**Create a Group**
----
  Post request to create a group with the requester as the initial member of that group.

* **URL**

  /users/group

* **Method:**
  
  `POST`

* **URL Params**

  None required

* **Data Params**

  Name (Group Name)

* **Headers**

  access-token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{ group: created group data, message: Successfully created group <group-name> }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: User's exclusive feature" }`


**Send Invitation to Join Group**
----
  Send invitation to other users to join your group and returns json message if succeeded.

* **URL**

  /users/invite

* **Method:**
  
  `PATCH`

* **URL Params**

  None required

* **Data Params**

  Username (to invite)
  Group Id (to join)

* **Headers**

  access-token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ message: Successfully sent an invitation to <username> }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: User's exclusive feature" }`


**Accept Invitation to Join Group**
----
  Accept invitation from other users to join their group and returns json message if succeeded.

* **URL**

  /users/accept

* **Method:**
  
  `PATCH`

* **URL Params**

  None required

* **Data Params**

  Group Id (accept to join)

* **Headers**

  access-token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ message: Successfully join the group }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: User's exclusive feature" }`


**Refuse Invitation to Join Group**
----
  Refuse invitation from other users to join their group and returns json message if succeeded.

* **URL**

  /users/refuse

* **Method:**
  
  `PATCH`

* **URL Params**

  None required

* **Data Params**

  Group Id (accept to join)

* **Headers**

  access-token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ message: Successfully refused the invitation }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: User's exclusive feature" }`


**Get User's Tasks**
----
  Request to retrieve user's personal tasks.

* **URL**

  /tasks

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
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: User's exclusive feature" }`


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

  Title<br />
  Description<br />
  Priority<br />
  Due Date

* **Headers**

  access-token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{ todo: task data, message: Successfully created task <task-title> }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: User's exclusive feature" }`


**Edit Task**
----
  Edit task and update the existing data in the database.

* **URL**

  /tasks/:id

* **Method:**
  
  `PUT`

* **URL Params**

  id (edited task)

* **Data Params**

  Title<br />
  Description<br />
  Priority<br />
  Due Date

* **Headers**

  access-token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ message: Successfully updated task }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: User's exclusive feature" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "You can only access your own data" }`


**Delete Task**
----
  Delete task from the database and remove task data from user's.

* **URL**

  /tasks/:id

* **Method:**
  
  `DELETE`

* **URL Params**

  id (deleted task)

* **Data Params**

  None required

* **Headers**

  access-token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ message: Successfully deleted task with ID <req.params.id> }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: User's exclusive feature" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "You can only access your own data" }`


**Mark Task as Done**
----
  Update task as complete.

* **URL**

  /tasks/markdone/:id

* **Method:**
  
  `PATCH`

* **URL Params**

  id (updated task)

* **Data Params**

  None required

* **Headers**

  access-token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ message: Good job! You just finish this task!}`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: User's exclusive feature" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "You can only access your own data" }`


**Mark Task as Undone**
----
  Update task as incomplete.

* **URL**

  /tasks/markundone/:id

* **Method:**
  
  `PATCH`

* **URL Params**

  id (updated task)

* **Data Params**

  None required

* **Headers**

  access-token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ message: Task is marked as undone}`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: User's exclusive feature" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "You can only access your own data" }`


**Get Group Tasks**
----
  Retrieve tasks which belongs to a specific group.

* **URL**

  /tasks/group/:groupId

* **Method:**
  
  `GET`

* **URL Params**

  groupId (who owns tasks)

* **Data Params**

  None required

* **Headers**

  access-token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ all tasks belongs to the group }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: User's exclusive feature" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Wrong group. You can only access your own group data" }`


/tasks/group | POST |  Route used to create a task for groups

**Create Task for Group**
----
  Create task which belongs to a group and the creator (user).

* **URL**

  /tasks/group

* **Method:**
  
  `POST`

* **URL Params**

  None required

* **Data Params**

  Title<br />
  Description<br />
  Priority<br />
  Due Date<br />
  Group Id

* **Headers**

  access-token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{ message: "Successfully created task <task-title> for your group" }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: User's exclusive feature" }`