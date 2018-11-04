# todo-fancy

## **Table of Contents**
- [Description](#description)
- [URL](#url)
- [Method](#method)
    - [Signup](#signup)
    - [Signin](#signin)
    - [Google Signin](#gsign)
    - [Decode](#decode)
    - [Add](#add)
    - [List](#list)
        - [Due Date](#listdue)
        - [Created Date](#listcreated)
        - [Task Name](#listname)
        - [Task Description](#listdescription)
        - [Status](#liststatus)
    - [Edit](#edit)
    - [Delete](#delete)

## <a id="description"></a> Description
ToDo Fancy is an API for creating and managing a to-do list. 

## <a id="url"></a>URL
http://localhost:3000/todo

## <a id="method"></a> Method:
#<a id="signup"></a> Route | HTTP | Description
------|------|------------
/todo/signup | POST | Register a new user

## Data Params
Email: example@mail.com,

Password: password

## Success Response
Code: 201

Content: 

    {
        message: "You have successfully signed up"
    }

## Error Response


Code: 500

Content: 

    {
        message: error.message,
        note: 'Please see console log for details'
    }

Occurence: When hashing of password fails

OR

Code: 400

Content: 

    {
        message: error.message,
        note: 'Please see console log for details'
    }

Occurence: When error during creation and storing new user data

#<a id="signin"></a> Route | HTTP | Description
------|------|------------
/todo/signin | POST | Log in to access features

## Data Params
Email: example@mail.com,

Password: password

## Success Response

Code: 200

Content:

    {
        message: 'Successfully signed in. Please take note of your token', 
        token: token 
    }

## Error Response

Code: 500

Content: 

    {
        message: error.message,
        note: 'Please see console log for details'
    }

Occurence: When hashing of password fails or when email is invalid

OR

Code: 400

Content: 

    {
        message: error.message,
        note: 'Please see console log for details'
    }
    
Occurence: When password is incorrect

#<a id="gsign"></a> Route | HTTP | Description
------|------|------------
/todo/google_signin | POST | Log in via Google

## Data Params
Via Gmail Account:

Email: example@mail.com,

Password: password

## Success Response
Code: 200

Content: 

    {
        message: 'Successfully signed in. Please take note of your token', 
        token: token
    }

Occurence: When Google user is already in database

OR

Code: 201

Content: 

    { 
        message: 'User successfully created. Please take note of your token', 
        token: token 
    }

Occurence: When Google user has not been registered

## Error Response

Code: 500

Content: 

    {
        message: error.message,
        note: 'Please see console log for details'
    }

Occurence: When hashing of password fails or when email is invalid

#<a id="decode"></a> Route | HTTP | Description
------|------|------------
/todo/decode | POST | To Decode user token and see who is signed in

## Data Params
From signing in:

Email: example@mail.com,

Password: password

## Success Response
Code: 200

Content: 

    {
        data: 
        {
            id: <user id per databse>
            email: <user email>
        }
    }

#<a id="add"></a> Route | HTTP | Description
------|------|------------
/todo/add | POST | Log in via Google

## Data Params
Name: Task name Example

Description: Description of the task

Due Date: When the task is supposed to be completed

## Success Response
Code: 201

Content: 

    {
      message: 'Task succesfully added'
    }

## Error Response

Code: 500

Content: 

    {
        message: error.message,
        note: 'Please see console log for details'
    }

#<a id="list"></a> Route | HTTP | Description
------|------|------------
/todo/list | POST | List all tasks belonging to the user signed in

## Data Params
Id: User id (*this is done automatically via "decode" as the window is loaded)

## Success Response
Code: 200

Content: 

    {
        tasks: [
            {
                status: <"Done" or "Pending>,
                _id: <task id>,
                name: <task name>,
                description: <tasks description>,
                created_date: <MMMM DD, YYY>,
                due_date: <MMMM DD, YYY>,
                user: <user id>
            },
            {
                Task 2 Details ...
            },
            {
                Task 3 Details ...
            }
        ]
    }

## Error Response

Code: 500

Content: 

    {
        message: error.message,
        note: 'Please see console log for details'
    }

#<a id="edit"></a> Route | HTTP | Description
------|------|------------
/todo/edit | PUT | Edit a chosen task

## Data Params
Name: Task name Example

Description: Description of the task

Status: checkbox to tick indicating completion status of task

## Success Response
Code: 200

Content: 

    {
        message: "Data has been updated"
    }

## Error Response

Code: 500

Content: 

    {
        message: error.message,
        note: 'Please see console log for details'
    }

#<a id="delete"></a> Route | HTTP | Description
------|------|------------
/todo/delete | DELETE | Delete a chosen task

## Data Params
None

## Success Response
Code: 200

Content: 

    {
        message: "Task deleted"
    }

## Error Response

Code: 500

Content: 

    {
        message: error.message,
        note: 'Please see console log for details'
    }

#<a id="listdue"></a> Route | HTTP | Description
------|------|------------
/todo/list/due_date | POST | List all tasks belonging to the user signed in ordered by earliest Due Date

## Data Params
Id: User id (*this is done automatically via "decode" as the window is loaded)

## Success Response
Code: 200

Content: 

    {
        tasks: [
            {
                status: <"Done" or "Pending>,
                _id: <task id>,
                name: <task name>,
                description: <tasks description>,
                created_date: <MMMM DD, YYY>,
                due_date: <MMMM DD, YYY>,
                user: <user id>
            },
            {
                Task 2 Details ...
            },
            {
                Task 3 Details ...
            }
        ]
    }

## Error Response

Code: 500

Content: 

    {
        message: error.message,
        note: 'Please see console log for details'
    }

#<a id="listcreated"></a> Route | HTTP | Description
------|------|------------
/todo/list/created_date | POST | List all tasks belonging to the user signed in ordered by earliest Created Date

## Data Params
Id: User id (*this is done automatically via "decode" as the window is loaded)

## Success Response
Code: 200

Content: 

    {
        tasks: [
            {
                status: <"Done" or "Pending>,
                _id: <task id>,
                name: <task name>,
                description: <tasks description>,
                created_date: <MMMM DD, YYY>,
                due_date: <MMMM DD, YYY>,
                user: <user id>
            },
            {
                Task 2 Details ...
            },
            {
                Task 3 Details ...
            }
        ]
    }

## Error Response

Code: 500

Content: 

    {
        message: error.message,
        note: 'Please see console log for details'
    }

#<a id="listname"></a> Route | HTTP | Description
------|------|------------
/todo/list/name | POST | List all tasks belonging to the user signed in ordered alphabetically by Task Name

## Data Params
Id: User id (*this is done automatically via "decode" as the window is loaded)

## Success Response
Code: 200

Content: 

    {
        tasks: [
            {
                status: <"Done" or "Pending>,
                _id: <task id>,
                name: <task name>,
                description: <tasks description>,
                created_date: <MMMM DD, YYY>,
                due_date: <MMMM DD, YYY>,
                user: <user id>
            },
            {
                Task 2 Details ...
            },
            {
                Task 3 Details ...
            }
        ]
    }

## Error Response

Code: 500

Content: 

    {
        message: error.message,
        note: 'Please see console log for details'
    }

#<a id="listdescription"></a> Route | HTTP | Description
------|------|------------
/todo/list/description | POST | List all tasks belonging to the user signed ordered alphabetically by Task Description

## Data Params
Id: User id (*this is done automatically via "decode" as the window is loaded)

## Success Response
Code: 200

Content: 

    {
        tasks: [
            {
                status: <"Done" or "Pending>,
                _id: <task id>,
                name: <task name>,
                description: <tasks description>,
                created_date: <MMMM DD, YYY>,
                due_date: <MMMM DD, YYY>,
                user: <user id>
            },
            {
                Task 2 Details ...
            },
            {
                Task 3 Details ...
            }
        ]
    }

## Error Response

Code: 500

Content: 

    {
        message: error.message,
        note: 'Please see console log for details'
    }

#<a id="liststatus"></a> Route | HTTP | Description
------|------|------------
/todo/list/status | POST | List all tasks belonging to the user signed ordered alphabetically by Pending Status first

## Data Params
Id: User id (*this is done automatically via "decode" as the window is loaded)

## Success Response
Code: 200

Content: 

    {
        tasks: [
            {
                status: <"Done" or "Pending>,
                _id: <task id>,
                name: <task name>,
                description: <tasks description>,
                created_date: <MMMM DD, YYY>,
                due_date: <MMMM DD, YYY>,
                user: <user id>
            },
            {
                Task 2 Details ...
            },
            {
                Task 3 Details ...
            }
        ]
    }

## Error Response

Code: 500

Content: 

    {
        message: error.message,
        note: 'Please see console log for details'
    }