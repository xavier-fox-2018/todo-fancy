# NOT SO FANCY TODO

## App Usage 

### index.html

  - regular signup using email
  - regular login 
  - Signup & Signin with google

### todos.html

  - dashboard: shows user's name, and to-do list
  - mark as complete button
  - delete button


-------

# NOT SO FANCY TODO API

## Users API

### List of Users API endpoint:

| Route                       | HTTP   | Description                         | 
| -------------------------   |:------ | ----------------------------------- |
| `/users/login`              | POST   | Regular Login, returns access token |
| `/users/`                   | GET    | Find All users                      |
| `/users/`                   | POST   | Create new User / Signup            |
| `/users/oauth`                | POST | Sign up and/or Sign in with google                         |
| `/users/dashboard`               | GET    | returns logged in user data                           |


### Endpoint Usage

- POST : `/users/login`
  - req.body.email: should contain user's email
  - req.body.password: should contain user's password

  ```js
  //ON SUCCESS OUTPUT:
  //status code 200
      {
        result: 
          {
            message: "successfully logged in",
            token: `${JWT_TOKEN}`
          },
        error: null
      }
  //ON FAIL OUTPUT:
    //Wrong password: status 400
      {
        result: null,
        error: 
          {
            error_code: 'WRONG_PASSWORD',
            message: 'wrong password'
          }
      }
    //No email in database: status 404
      {
        result: null,
        error: 
          {
          message: 'email is not registered'
          }
      }
    //Other error: status 500
      {
        result: null,
        error: 'Object'
      }

  ```

- GET : `/users/`

  ```js
  //ON SUCCESS OUTPUT: status 200
    {
      result: [{
            "todo": [
                {
                    "status": "enum (completed | pending)",
                    "_id": "String ID of the todo",
                    "user": "String ID references _id",
                    "name": "String",
                    "description": "String",
                    "dueDate": "YYYY-MM-DDThh:mm:ss.zzzZ",
                    "__v": "Integer"
                }
            ],
            "_id": "String Id",
            "name": "String",
            "email": "String",
            "OAuth": "Boolean",
            "__v": "Integer"
        }, {...} , {...}]
      error: null
    }

  //ON FAIL OUTPUT: status 500
    {
      result: null,
      error: 
        {
          status_code: 'SERVER_ERROR',
          message: 'String'
        }
    }
  ```

- POST : `/users/`
  - req.body.email: should contain user's email
  - req.body.name: should contain user's name
  - req.body.password: should contain user's password
  
  ```js
  //ON SUCCESS OUTPUT: status 201
    {
      result: {
        "todo": [],
        "_id": "String ID",
        "name": "String",
        "email": "String",
        "OAuth": false,
        "__v": 0
      },
      error: null
    }

  //ON FAIL OUTPUT:
    //Invalid Email Format, duplicate email, empty password: Status 400
    {
      result: null,
      error: {
        error_code: 'String',
        message: 'String'
      }
    }
    //other: status 500
    {
      result: null,
      error: 'Object'
    }
  ```

- POST : `/users/oauth` 
  - req.body.token should contain google auth token

  ```js
  //ON SUCCESS OUTPUT: status 200
    {
      result: {
        "todo": [{
            "status": "enum (completed | pending)",
            "_id": "String ID of the todo",
            "user": "String ID references _id",
            "name": "String",
            "description": "String",
            "dueDate": "YYYY-MM-DDThh:mm:ss.zzzZ",
            "__v": "Integer"
          }],
            "_id": "String Id",
            "name": "String",
            "email": "String",
            "OAuth": true,
            "__v": "Integer"
        }
      token: `${JWT_TOKEN}`
      error: null
    }

  //ON FAIL OUTPUT: status 500
    {
      result: null,
      error: 'Object'
    }

  ```

- GET : `/users/dashboard`
  - req.headers.token: should contain jwt token from login

  ```js
  //ON SUCCESS OUTPUT:
    {
      result: {
        "todo": [{
            "status": "enum (completed | pending)",
            "_id": "String ID of the todo",
            "user": "String ID references _id",
            "name": "String",
            "description": "String",
            "dueDate": "YYYY-MM-DDThh:mm:ss.zzzZ",
            "__v": "Integer"
          }],
            "_id": "String Id",
            "name": "String",
            "email": "String",
            "OAuth": "Boolean",
            "__v": "Integer"
        }
      token: `${JWT_TOKEN}`
      error: null
    }
  //ON FAIL OUTPUT:
    //user not found status 404
    {
      result: null,
      error: {
        error_code: 'String',
        message: 'String'
      }
    }

    //other error status 500
    {
      result: null,
      error: 'Object'
    }
  ```


## Todos API

### List of todos API endpoint:

| Route                   | HTTP   | Description              | 
| ----------------------- |:------ | -----------------------  |
| `/todos/list`               | GET    | Get all todos            |

| `/todos/create`               | POST   | Create new todo          |
| `/delete/:id`            | DELETE | Delete a post            |
| `/complete/:id/`           | PATCH    | Edit a post              |


### Endpoint Usage

- GET : `/todos/list`
  ```js
  //ON SUCCESS status 200
  {
    "status": "enum (completed | pending)",
    "_id": "String ID of the todo",
    "user": "String ID references _id",
    "name": "String",
    "description": "String",
    "dueDate": "YYYY-MM-DDThh:mm:ss.zzzZ",
    "__v": "Integer"
  }

  //ON FAIL status 500
    {
      result: null,
      error: 'Object'
    }
  ```

- POST : `/todos/create` 
  - req.headers.token: contains jwt token from login
  - req.body.name: contains name of task
  - req.body.description: contains task description
  - req.body.dueDate : yyyy-mm-dd

  ```js
  //ON SUCCESS status 201
    {
    "result": {
        "todo": [
            {
              "status": "enum (completed | pending)",
              "_id": "String ID of the todo",
              "user": "String ID references _id",
              "name": "String",
              "description": "String",
              "dueDate": "YYYY-MM-DDThh:mm:ss.zzzZ",
              "__v": "Integer"
            },
            {
                ...
            },
            {
                ...
            }
        ],
        "_id": "String ID",
        "name": "String",
        "email": "String",
        "OAuth": "Boolean",
        "__v": 0
    },
    "error": null
  }

  //ON FAIL status 500
    {
      result: null,
      error: 'Object'
    }
  ```

- DELETE : `/todos/delete/:id`  
  - req.params.id: id of the todo

  ```js
  //ON SUCCESS status 200
   {
    result: { //deleted item
      "status": "enum (completed | pending)",
      "_id": "String ID of the todo",
      "user": "String ID references _id",
      "name": "String",
      "description": "String",
      "dueDate": "YYYY-MM-DDThh:mm:ss.zzzZ",
      "__v": "Integer"
    }
      error: null
    }
  //ON FAIL error 500
    {
      result: null,
      error: 'Object'
    }
  ```

- PATCH : `/todos/complete/:id/`
  - req.params.id: id of the todo
  
  ```js
  //ON SUCCESS status 200
  {
    result: { //new updated item
      "status": "enum (completed | pending)",
      "_id": "String ID of the todo",
      "user": "String ID references _id",
      "name": "String",
      "description": "String",
      "dueDate": "YYYY-MM-DDThh:mm:ss.zzzZ",
      "__v": "Integer"
    }
      error: null
    }
  //ON FAIL
    //todo not found status 404
      {
      result: null,
      error: 'Object'
    }
    //other error status 500
      {
        result: null,
        error: {
          error_code: 'String',
          message: 'String'
        }
      }
    
  ```
