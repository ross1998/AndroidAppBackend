const express = require('express');

//pg-promise is a postgres library that uses javascript promises

const db = require('../utilities/sqlconn.js');

var router = express.Router();

const bodyParser = require("body-parser");
//This allows parsing of the body of POST requests, that are encoded in JSON
router.use(bodyParser.json());

router.post("/addexercise", (req, res) => {
    // Parameters for the courses
    let ename = req.body['ename'];
    let email = req.body['email'];

    if (ename && email) {
        db.none("INSERT INTO workouts VALUES ($1, $2)", [ename, email])
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

router.post("/deleteexercise", (req, res) => {
    // Parameters for the courses
    let ename = req.body['ename'];
    let email = req.body['email'];

    if (ename && email) {
        db.none("DELETE FROM workouts WHERE EName=$1 AND Email=$2", [ename, email])
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

router.post("/getexercises", (req, res) => {

    let email = req.body['email'];
    
        if(email){
            db.manyOrNone('SELECT * FROM workouts WHERE Email=$1', [email])
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