# rest-api-Todo List 

Demo app with basic REST API

# REST API

List of routes : 

| url  |METHOOD|PARAMS|REQUIRED|DATA PARAMS|RETURN|ERROR|
|------|-------|------|--------|-----------|------|-----|
 
/users/gsignin| POST | - | - | - | jtoken=[string] |error = [object]
/todo|GET| - |jtoken=[string ]|-|user=[object]|error = [object]
/todo|POST| - | jtoken=[string ] | name=[string], description = [string],due_status=[date]|newTodo=[object]|error = [object]
/todo|PUT|id=[string]|jtoken=[string]|name=[string], description = [string],due_status=[date]|todoUpdated=[object],status=[boolean]|error = [object]
/todo|PUT|id=[string]|jtoken=[string]|-|todoDeleted=[object]|error = [object]




## example :
/todo [GET]
### query :
{
 method : 'GET',
 url : 'http://localhost:3000/todo',
 headers : {
    jtoken 
 }
}
### return :
status : 200

{
    "todoes": [
        {
            "status": false,
            "_id": "5bdf787727b85f1fdc2d9162",
            "name": "ngantuk berat-rat 2",
            "description": "tuk tuk ",
            "due_status": "2018-11-07T00:00:00.000Z",
            "__v": 0
        }
    ],
    "_id": "5bde5a4cd9d6943adf7d6ca0",
    "name": "Andre H.",
    "email": "hokandre@mhs.mdp.ac.id"
}

### error :
status : 404

{
    "massage": "Belum Login",
    "error": "sorry, you are not logged in, please log in"
}


/todo [POST]
### query :
{
 method : 'POST',
 url : 'http://localhost:3000/todo',
 headers : {
    jtoken 
 },
 data {
     name : 'sleeping',
     description : 'before after bla',
     due_status : '2018-11-09'
 }
}
### return :
status : 200

{
    "status": false,
    "_id": "5bdf8a7adae2392d667c1b3a",
    "name": "test masukin  todo 3",
    "description": "masukin ke child hokandre 3",
    "due_status": "2018-11-05T00:00:00.000Z",
    "__v": 0
}

### error :
status : 500

{
    "message": "error while create todo list",
    "error": "Todo validation failed: name: Sorry, name must be filled!"
}


/todo [PUT]
### query :
{
 method : 'PUT',
 url : 'http://localhost:3000/todo/536hajjacjde888',
 headers : {
    jtoken 
 },
 data {
     status : true
 }
}
### return :
status : 200

{
    "status": true,
    "_id": "5bdf787727b85f1fdc2d9162",
    "name": "ngantuk berat-rat 2",
    "description": "tuk tuk ",
    "due_status": "2018-11-07T00:00:00.000Z",
    "__v": 0
}

### error :
status : 404
{
    "massage": "Belum Login",
    "error": "sorry, you are not logged in, please log in"
}


/todo [DELETE]
### query :
{
 method : 'DELETE',
 url : 'http://localhost:3000/todo/536hajjacjde888',
 headers : {
    jtoken 
 }
}
### return :
status : 200

{
    "status": true,
    "_id": "5bdf787727b85f1fdc2d9162",
    "name": "ngantuk berat-rat 2",
    "description": "tuk tuk ",
    "due_status": "2018-11-07T00:00:00.000Z",
    "__v": 0
}

### error :
status : 404
{
    "massage": "Belum Login",
    "error": "sorry, you are not logged in, please log in"
}




Acces the website via http://localhost:3000 




