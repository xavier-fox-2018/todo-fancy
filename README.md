# To Do app
Organize what will you do with to do app

## List of todo routes :

METHOD|ROUTE|Description
------|-----|-----------
GET|/all| get all todo list
POST|/|create new todo
PUT|/:id| update todo
DELETE|/:id|delete todo

### detail **require** :
 * GET /all
    * request.params : -
    * success response :
        * Code : 200
          
          Content :  `[
	{
		"status": "not done",
		"_id": "5bdf38244150b117d903d31a",
		"name": "Boogle",
		"desc": "kerjain boogle woi",
		"dueDate": "2018-11-06T00:00:00.000Z",
		"UserId": "5bddbd1349f103185c377202",
		"__v": 0
	},`

 * POST /
    * request.params : -
    * success response :
        * Code : 200          
        Content :  
            `{
	"status": "not done",
	"_id": "5bdf7dab4150b117d903d320",
	"name": "sudoku",
	"desc": "akhir minggu nih, 5% dengan boogle",
	"dueDate": "2018-10-04T00:00:00.000Z",
	"UserId": "5bddbd1349f103185c377202",
	"__v": 0
}`
 * PUT /:todo_id
    * request.params : todo_id=[integer]
    * success response :
        * Code : 200          
        
            Content :
            
            `{"n": 1, "nModified": 1, "ok": 1 }`

 * DELETE /:tod_id
    * request.params : todo_id=[integer]
    * success response :
        * Code : 200          
        Content :
        
            `{
                    "n": 1,
                    "ok": 1
                }`


## List of users routes :
METHOD|ROUTE|Description
------|-----|-----------
POST|/users/gsignin| sign in via google
POST|/users/signup| register new user
POST|/users/signin| get data user singin

### detail **require** :
 * POST	/users/gsignin  
    * success response :
        * Code : 200          
        Content :
        
            `{"token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV....eyJlbWFpbCI6Imhva2FuZHJlQG1ocy5tZHAuYWMuaWQiLCJuYW1lIjoiQW5kcmUgSC4iLCJpYXQiOjE1NDExNDg2N...diJ9aOSKnvJV_13sQecVmUcoQPaiLb_kBN_NsSg..."}`

 * POST	/users/signup 
    * request.body : password=[string], email=[string]
    * success response :
        * Code : 200          
        Content :
        
            `{
                "_id": "5bdd24835414e22697e3ff47",
                "email": "abdmukmin@rocketmail.com",
                "password": "e4753ddc6c6413c2155fbd8c20fe076363aa0e150da744fdca9707b6db571f14",
                "salt": "\t�ݡ�U����",
                "__v": 0
            }`

 * POST /users/signin
    * request.body : password=[string], email=[string]
    * success response :
        * Code : 200          
        Content :
        
            `{
                "jToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViZGRiZDEzNDlmMTAzMTg1YzM3NzIwMiIsImlhdCI6MTU0MTM3MzgyMn0.9ojR30I4aqZvwThP2cwth5OzLE7_TLNzjU3d3u1eFb4"
            }`
