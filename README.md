# Todo Fancy

The app to make your way esier

## Basic Usage
### 1. Install packages
```
$ npm install

```

### 2. run database server
run from todo-fancy/server folder
```
$ npm run dev

```
### 3. run live server
current location in todo fancy folder <br>
then run from client
```
$ live-server client

```

### 4. home page
go to :
```
/* my default port is 8080 */

http://localhost:8080/home

```
You will redirect to **Home page** because you need to login first.
<br>
After login/ signup you can **create, delete, and update** your task
<br>

## Method List
<hr>

### **Helpers**
There are *three* helpers method that use in this app.
1. Get user data <br>
This method is use to get user data from google token if you sign in from google. The function used is ```getUserData(google_token)``` that take parameter from your user google token. this method is **static** and use **promise** calling.<br>
*example* :
```
const Helpers = require ('../helpers')

Helpers.getUserData(USER_GOOGLE_TOKEN)
.then(data => {
    console.log(data)
    //expected output is user data from google
})
.then(err => {
    console.log(err)
    //expected output is error message
})

```
2. Get user data from database <br>
This method is use to get user data from database. the function use is ```getUserDataServer(token_from_client)``` that take parameter user token that has been generated before. this method is **static**.<br>
*example* :
```
const Helpers = require ('../helpers')

Helpers.getUserDataServer(YOUR_USER_TOKEN)
.then(data => {
    console.log(data)
    //expected output is user data from database
})
.then(err => {
    console.log(err)
    //expected output is error message
})
```
3. Create user method <br>
This method is use to create user to database if user sign up using google. the function use is ```createUser(USER_GOOGLE_TOKEN)``` that take parameter from user google token. this method is **static** and use **promise** calling.<br>
*example* :
```
const Helpers = require ('../helpers')

Helpers.createUser(USER_GOOGLE_TOKEN)
.then(data => {
    console.log(data)
    //expected output is user data that was created to the database
})
.then(err => {
    console.log(err)
    //expected output is error message
})

```


## Response and Error handling
<hr>

1. **Sign In** <br>
*success* : will redirect to home page <br>
*fail* : nothing happen :blush:

2. **Sign Up** <br>
*success* : will redirect to login page <br>
*fail* : nothing happen :blush:

3. **Create, Update, Delete Task** <br>
*success* : will reload home page with updated task<br>
*fail* : nothing happen :blush:

3. **Read Task** <br>
*success* : will render on home, completed, or incompleted page<br>
*fail* : appear error message on console :blush: