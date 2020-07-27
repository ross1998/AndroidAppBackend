const express = require('express');

//We use this create the SHA256 hash
const crypto = require("crypto");

//Create connection to Heroku Database
let db = require('../utilities/utils').db;

let getHash = require('../utilities/utils').getHash;

let sendEmail = require('../utilities/utils').sendEmail;

var router = express.Router();

const bodyParser = require("body-parser");
//This allows parsing of the body of POST requests, that are encoded in JSON
router.use(bodyParser.json());

router.post('/', (req, res) => {
    res.type("application/json");

    //Retrieve data from query params
    var name = req.body['name'];
    //var last = req.body['last'];
    //var username = req.body['username'];
    var email = req.body['email'];
    var height = req.body['height'];
    var bodyweight = req.body['bodyweight'];
    var gender = req.body['gender'];
    var age = req.body['age'];
    var password = req.body['password'];
    //Verify that the caller supplied all the parameters
    //In js, empty strings or null values evaluate to false
    if(name && email && height && bodyweight && gender && age && password) {
        //We're storing salted hashes to make our application more secure
        //If you're interested as to what that is, and why we should use it
        //watch this youtube video: https://www.youtube.com/watch?v=8ZtInClXe1Q
        let salt = crypto.randomBytes(32).toString("hex");
        let salted_hash = getHash(password, salt);

        //Use .none() since no result gets returned from an INSERT in SQL
        //We're using placeholders ($1, $2, $3) in the SQL query string to avoid SQL Injection
        //If you want to read more: https://stackoverflow.com/a/8265319
        let params = [name, email, height, bodyweight, gender, age, salted_hash, salt];
        db.none("INSERT INTO PROFILES(Fname, Email, Height, BodyWeight, Gender, Age, Pword, Salt) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", params)
            .then(() => {
                //We successfully added the user, let the user know
                res.send({
                    success: true
                });
                sendEmail("uwnetid@uw.edu", email, "Welcome!", "<strong>Welcome to our app!</strong>");
            }).catch((err) => {
            //log the error
            console.log(err);
            //If we get an error, it most likely means the account already exists
            //Therefore, let the requester know they tried to create an account that already exists
            res.send({
                success: false,
                error: err
            });
        });
    } else {
        res.send({
            success: false,
            input: req.body,
            error: "Missing required user information"
        });
    }
});

module.exports = router;
