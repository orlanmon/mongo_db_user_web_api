let express = require('express');

let mongo_db_client = require('mongodb').MongoClient;

let mongo_db_url = "mongodb://localhost:5001/";     // Mongo User DB Endpoint

let app = express();

var Path = require('path')

// View Engine Setup
app.set("views", Path.join(__dirname))
app.set("view engine", "ejs")
app.use(express.json());


var server = app.listen(5000, function () {
    console.log("Mongo DB Web Service Running at http://127.0.0.1:5000/");
})


app.get('/status', function (req, res) {

    var response = {
        Status: "Mongo DB Web Service is Running!"
    };

    res.send(response);
});

app.get('/api/user/:id', function (req, res) {

    let user_id = req.params['id'];

    if (isNaN(user_id)) {

        res.send(JSON.stringify({ "user_web_api_result": "Id Provided is not Valid" }));

        return;

    }

    mongo_db_client.connect(mongo_db_url, function (err, db) {

        if (err) {

            res.send(JSON.stringify({ "user_web_api_error": "User DB Connection Error" }));

            return;

        }

        let dbo = db.db("mongo_user_db");

        let query = { _id: user_id };

        dbo.collection("users").findOne(query).toArray(function (err, result) {

            if (err) {

                res.send(JSON.stringify({ "user_web_api_error": "User DB Query Error" }));

                db.close();

                return;

            }

            if (result) {

                // Check User Age > 21
                if (result.Age > 21) {

                    // Return the JSON Representation of the User
                    res.send(JSON.stringify(result));

                } else {

                    // Not Found 404
                    res.status(404).send(JSON.stringify({ "user_web_api_result": "User not above age of 21" }));

                }

            } else {

                // Not Found 404
                res.status(404).send(JSON.stringify({ "user_web_api_result": "User not found" }));

            }

            db.close();

        });
    });
});
