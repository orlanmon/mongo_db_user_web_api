# mongo_db_user_web_api
Mongo DB User Web API

The following is a simple Web API to query a Mongo DB User Collection.  
The Web API uses the following URI to specify a user to to query via a user_id:
http://127.0.0.1:5000/api/user/{user_id}.   
If the User Web API does not find a user who is greater then 21 years of age the Web API will return an HTTP 404 error.



