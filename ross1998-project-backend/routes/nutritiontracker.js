const express = require('express');

//pg-promise is a postgres library that uses javascript promises

const db = require('../utilities/sqlconn.js');

var router = express.Router();

const bodyParser = require("body-parser");
//This allows parsing of the body of POST requests, that are encoded in JSON
router.use(bodyParser.json());

router.post("/addmeal", (req, res) => {
    // Parameters for the courses
    let calories = req.body['calories'];
    let carbs = req.body['carbs'];
    let fats = req.body['fats'];
    let proteins = req.body['proteins'];
    let foodName = req.body['foodName'];
    let quantity = req.body['quantity'];
    let email = req.body['email'];

    if (calories && carbs && fats && proteins && foodName && quantity && email) {
        db.none("INSERT INTO nutritiontracker VALUES ($1, $2, $3, $4, $5, $6, $7)", [calories, carbs, fats, proteins, foodName, quantity, email])
            .then(() => {
                //We successfully added the course, let the user know
                res.send({
                    success: true
                });
            }).catch((err) => {
            //log the error
            console.log(err);
            res.send({
                success: false,
                error: err
            });
        });
    } else {
        res.send({
            success: false,
            input: req.body,
            error: "Missing required information"
        });
    }
});

router.post("/getmeals", (req, res) => {

let email = req.body['email'];

    if(email){
        db.manyOrNone('SELECT * FROM nutritiontracker WHERE Email=$1', [email])
        //If successful, run function passed into .then()
        .then((data) => {
            res.send({
                success: true,
                names: data
            });
        }).catch((error) => {
        console.log(error);
        res.send({
            success: false,
            error: error
        })
    });
    }
    
});


module.exports = router;
