# todo-fancy
**Rest API**
List of user routes :

## **Register User**

Create a user

- **URL**

users/register

- **Method:**

`POST`

- **URL Params**

None

- **Data Params**

Username : String
Email : String
Password : String

- **Success Response:**

* **Code:** 201
  **Content:** `{ data: data }`

- **Error Response:**

* **Code:** 500 NOT FOUND
  **Content:** `{ status: 'failed',
          err }`

## **Login User**

Log in user

- **URL**

/users/login

- **Method:**

`Post`

- **URL Params**

None

- **Data Params**
  email : String
  password : String

- **Success Response:**

* **Code:** 200

**Content:** `{ token, username, userId }`

- **Error Response:**

* **Code:** 500 INTERNAL SERVER ERROR

**Content:** `{ status: 'failed',
        message: err.message }`

OR

- **Code:** 401 UNAUTHORIZED

**Content:** `{ error : "You are unauthorized to make this request." }`

OR

- **Code:** 404 NOT FOUND

**Content:** `{status: 'failed',
            message: 'Wrong password or email'}`

## **Login Via GOOGLE**

Log in to application via google

- **URL**

/login/google

- **Method:**

`POST`

- **URL Params**

None

- **Data Params**

None

- **Success Response:**

* **Code:** 200

**Content:** `{status: 'success',
                token,
                username,
                userId}`

- **Error Response:**

* **Code:** 500

**Content:** `{ status: 'failed',
                message: 'error when creating new data',
                err: err.message }`

#List of TASK routes :

## **Find all tasks**

get all tasks from active user

- **URL**

/tasks

- **Method:**

`GET`

- **URL Params**

None

- **Data Params**

None

- **Success Response:**

* **Code:** 200

**Content:** `{result}`

- **Error Response:**

* **Code:** 500

**Content:** `{ err }`

## **Create new task**

create new task from active user

- **URL**

/tasks

- **Method:**

`POST`

- **URL Params**

None

- **Data Params**

category: String,
title: String,
description: String, 
priority: String,
dueDate: String,
location: String,
userId: mongoose.schema.ObjectId

- **Success Response:**

* **Code:** 201

**Content:** `{message:'Success created new ToDo',
        status: 'success'}`

- **Error Response:**

* **Code:** 500

**Content:** `{ message: err.message,
        status: 'fail' }`

OR

- **Code:** 401 UNAUTHORIZED

**Content:** `{ error : "You are unauthorized to make this request." }`

## **Update task**

update existing task from active user by task id

- **URL**

/tasks/:id

- **Method:**

`PUT`

- **URL Params**

task id

- **Data Params**

category: String,
title: String,
description: String, 
priority: String,
dueDate: String,
location: String,
userId: mongoose.schema.ObjectId

- **Success Response:**

* **Code:** 201

**Content:** `{message:'Success updated ToDo',
        status: 'success'}`

- **Error Response:**

* **Code:** 500

**Content:** `{ message: err.message,
        status: 'fail' }`

OR

- **Code:** 401 UNAUTHORIZED

**Content:** `{ error : "You are unauthorized to make this request." }`

## **Delete task**

delete existing task from active user by task id

- **URL**

/tasks/:id

- **Method:**

`DELETE`

- **URL Params**

task id

- **Data Params**

None

- **Success Response:**

* **Code:** 200

**Content:** `{message:'Success deleted ToDo',
        status: 'success'}`

- **Error Response:**

* **Code:** 500

**Content:** `{ message: err.message,
        status: 'fail' }`

OR

- **Code:** 401 UNAUTHORIZED

**Content:** `{ error : "You are unauthorized to make this request." }`


#List of GROUP routes :

## **Find all groups**

get all groups from active user

- **URL**

/groups

- **Method:**

`GET`

- **URL Params**

None

- **Data Params**

None

- **Success Response:**

* **Code:** 200

**Content:** `{result}`

- **Error Response:**

* **Code:** 500

**Content:** `{ err }`

## **Create new group**

create new group from active user

- **URL**

/groups

- **Method:**

`POST`

- **URL Params**

None

- **Data Params**

category: String,
title: String,
description: String, 
priority: String,
dueDate: String,
location: String,
userId: mongoose.schema.ObjectId

- **Success Response:**

* **Code:** 201

**Content:** `{message:'Success created new ToDo',
        status: 'success'}`

- **Error Response:**

* **Code:** 500

**Content:** `{ message: err.message,
        status: 'fail' }`

OR

- **Code:** 401 UNAUTHORIZED

**Content:** `{ error : "You are unauthorized to make this request." }`

## **Update group**

update existing group from active user by group id

- **URL**

/groups/:id

- **Method:**

`PUT`

- **URL Params**

group id

- **Data Params**

category: String,
title: String,
description: String, 
priority: String,
dueDate: String,
location: String,
userId: mongoose.schema.ObjectId

- **Success Response:**

* **Code:** 201

**Content:** `{message:'Success updated ToDo',
        status: 'success'}`

- **Error Response:**

* **Code:** 500

**Content:** `{ message: err.message,
        status: 'fail' }`

OR

- **Code:** 401 UNAUTHORIZED

**Content:** `{ error : "You are unauthorized to make this request." }`


## Usage

With only npm :

```
npm install

npm start
```