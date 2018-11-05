# todo-fancy

**Register User**
----
> Returns json data about a single user.

* **URL**
  /register
  
* **Method:**
  `POST`
  
*  **URL Params**
   **Required:**
 
   `none`

* **Data Params**
   **Required:**
 
	```
	name : String
	email : String
	password : String
	```

* **Success Response:**

  * **Code:** 201 <br />
  *  **Content:** 
	```
	{
		_id : <objectId>
		name : String
		email : String
		password : String *encrypted
		createdAt : Date
		updatedAt : Date
	}
	```
 
* **Error Response:**

  * **Code:** 400 bad request <br />
   * **Content:** 
    ```
    {
		"name": [
			        "This field is required."
			    ],
			    OR
		"email : ["email already exists"]
	}
    ```

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/register",
      dataType: "json",
      type : "POST",
      data : {
			name : String,
			email : String,
			password : String
		},
      success : function(r) {
        console.log(r);
      }
    });
  ```


**Login User**
----
> Returns json data about user, token & sussess message.

* **URL**
  /login
  
* **Method:**
  `POST`
  
*  **URL Params**
   **Required:**
 
   `none`

* **Data Params**
   **Required:**
 
	```
	email : String
	password : String
	```

* **Success Response:**

  * **Code:** 200 <br />
  *  **Content:** 
	```
	{
		token:  token,
		message:  "Login Success",
		user : {
			_id :  user._id,
			name :  user.name
		}
	}
	```
 
* **Error Response:**

  * **Code:** 400 bad request <br />
   * **Content:** 
    ```
    {
		message:  "Wrong email & Password"
	}
	OR
	Code : 402
	{
		err:  <server error>
	}
    ```

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/login",
      dataType: "json",
      type : "POST",
      data : {
			email : String
			password : String
		},
      success : function(r) {
        console.log(r);
      }
    });
  ```