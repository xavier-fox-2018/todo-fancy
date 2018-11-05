**FANCY TODO - API DOCUMENTATION**
-----------------------------------------------------------

**REGISTER**
----

* **URL**

  /users/register

* **Method:**
  | `POST` |

* **Data Params**

  **Content:** `{ name : John Doe , email : example@mail.com , password : password }`

* **Success Response:**

    **Code:** 201 <br />
    **Content:** `{ data : { name : John Doe , email : example@mail.com , password : password } , message : Registration Success! you can use your email and password to log in }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Log in" , message : 'Internal Server Error, Register Failed' }`

    <br>IF INPUT NAME / PASSWORD LENGTH IS LESS THAN 4 

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ message : 'Minimum name & password length is 4' }`

    <br>IF EMAIL FORMAT IS INVALID 

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ message : 'Invalid email format'}`

**LOGIN**
----

* **URL**

  /users/login

* **Method:**
  
  

  | `POST` |
  
* **Data Params**

  {'email' : 'email@mail.com' , 'password' : 'password'}

* **Success Response:**
  
  

  * **Code:** 200 <br />
    **Content:** `{ token : "asdfasdf1243423asdfasdf" , userId : "asdfasdfasdfasdf123123414" }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Log in" , message : "Login Error" }`

  OR (if body password does not match password stored in database)

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "Invalid Password" }`

  OR (if body email and password length is less than 4)

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ message : "Invalid Email / Password" }`
