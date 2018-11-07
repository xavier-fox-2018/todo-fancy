#todoFancy API documentation

**Create Todo**
----
  create a task.

* **URL**

  /todos/create

* **Method:**

  `POST`
  
*  **Data Params**

   **Required:**
 
    `name: String,
    description: String
    status: String
    due_date: Date`

* **URL Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
	"_id": "5bde80047b590b7aa7df39ca",
	"name": "dari kmkmkm",
	"description": "dari insomnia mah ngga 2",
	"status": "pending",
	"due_date": "2019-12-21T04:11:00.000Z",
	"__v": 0
}`
 
* **Error Response:**
    * **Code:** 500 Internal Server Error <br />

**Get Todo**
----
  get all tasks.

* **URL**

  /todos

* **Method:**

  `GET`
  
*  **Data Params**

   **Required:**
 
   None

* **URL Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[
	{
		"_id": "5bdeb9d183e92682e5112b86",
		"name": "coba3 updated",
		"description": "kerjaint ugas updated",
		"status": "completed",
		"due_date": "2019-12-05T06:00:00.000Z",
		"__v": 0
	}, ... ]`
 
* **Error Response:**
    * **Code:** 500 Internal Server Error <br />  

**Update Todo**
----
  Update a task.

* **URL**

  /todos/update/:id

* **Method:**

  `PUT`
  
*  **Data Params**

   **Required:**
 
   `name: String,
    description: String
    status: String
    due_date: Date`

* **URL Params**

  `id: String`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
	"n": 1,
	"nModified": 1,
	"ok": 1
}`
 
* **Error Response:**
    * **Code:** 500 Internal Server Error <br />     

**Delete Todo**
----
  Delete a task.

* **URL**

  /todos/delete/:id

* **Method:**

  `DELETE`
  
*  **Data Params**

   **Required:**
 
   None

* **URL Params**

  `id:String`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
	"n": 1,
	"ok": 1
}`
 
* **Error Response:**
    * **Code:** 500 Internal Server Error <br />  

**Tag complete Todo**
----
  tag complete a task.

* **URL**

  /todos/completed/:id

* **Method:**

  `PUT`
  
*  **Data Params**

   **Required:**
 
   None

* **URL Params**

  `id:String`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
	"_id": "5bde80047b590b7aa7df39ca",
	"name": "dari kmkmkm",
	"description": "dari insomnia mah ngga 2",
	"status": "completed",
	"due_date": "2019-12-21T04:11:00.000Z",
	"__v": 0
}`
 
* **Error Response:**
    * **Code:** 500 Internal Server Error <br />     

**Signin User**
----
  signin/login a user.

* **URL**

  /users/signin

* **Method:**

  `POST`
  
*  **Data Params**

   **Required:**
 
   `email: req.body.email,
    password: pass`

* **URL Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `Signin successfull`
 
* **Error Response:**
    * **Code:** 400 Bad Request <br />  
    * **Content:** `Invalid Email` <br />   
    OR
     * **Code:** 400 Bad Request <br />  
    * **Content:** `Incorrect Password` <br />    

**Google Signin User**
----
  Signin a user via google API.

* **URL**

  /users/gsignin

* **Method:**

  `POST`
  
*  **Data Params**

   **Required:**
 
   `email: req.body.email,
    password: pass`

* **URL Params**

  None

* **Success Response:**

  * **Code:** Google Response Status <br />
    **Content:** Redirect dashboard
 
* **Error Response:**
    * **Code:** Google Response Status <br />  

**Get Todo**
----
  get all tasks of a user.

* **URL**

  /users/todos

* **Method:**

  `GET`
  
*  **Data Params**

   **Required:**
 
    `accesstoken: String`

* **URL Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[
	{
		"_id": "5bdeb9d183e92682e5112b86",
		"name": "coba3 updated",
		"description": "kerjaint ugas updated",
		"status": "completed",
		"due_date": "2019-12-05T06:00:00.000Z",
		"__v": 0
	}, ... ]`
 
* **Error Response:**
    * **Code:** 500 Internal Server Error <br />  

**Create Todo**
----
  create a task of a User.

* **URL**

  /users/create/todos

* **Method:**

  `POST`
  
*  **Data Params**

   **Required:**
 
    `name: String,
    description: String
    status: String
    due_date: Date`

* **URL Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
	"_id": "5bde80047b590b7aa7df39ca",
	"name": "dari kmkmkm",
	"description": "dari insomnia mah ngga 2",
	"status": "pending",
	"due_date": "2019-12-21T04:11:00.000Z",
	"__v": 0
}`
 
* **Error Response:**
    * **Code:** 500 Internal Server Error <br />
    
**Delete Todo**
----
  Delete a task of a user.

* **URL**

  /users/delete/:id

* **Method:**

  `DELETE`
  
*  **Data Params**

   **Required:**
 
   None

* **URL Params**

  `id:String`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
	"n": 1,
	"ok": 1
}`
 
* **Error Response:**
    * **Code:** 500 Internal Server Error <br /> 