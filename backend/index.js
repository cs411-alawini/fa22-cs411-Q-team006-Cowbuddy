const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const {response} = require("express");
const port = 3001;

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mypassword',
    database: '411demo',
})

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

// app.get('/', (require, response) => {
//     const sqlInsert = "INSERT INTO `movie_reviews` (`movieName`, `movieReview`) VALUES ('Spider2', 'good movie');";
//     db.query(sqlInsert, (err, result) => {
//         response.send("Hello World!");
//     })
// })

app.get("/api/get", (require, response) => {
    const sqlSelect = "SELECT * FROM movie_reviews";
    db.query(sqlSelect, (err, result) => {
        response.send(result);
    })
})

app.post("/api/insert", (require, response) => {
    const movieName = require.body.movieName;
    const movieReview = require.body.movieReview;

    const sqlInsert = "INSERT INTO `movie_reviews` (`movieName`, `movieReview`) VALUES (?,?)";
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        console.log(error);  // ?
    })
})

app.delete("/api/delete/:movieName", (require, response) => {
    const movieName = require.params.movieName;

    const sqlDelete = "DELETE FROM `movie_reviews` WHERE `movieName` = ?";
    db.query(sqlDelete, movieName, (err, result) => {
        if (err) {
            console.log(error);
        }
    })
})

app.put("/api/update", (require, response) => {
    const movieName = require.body.movieName;
    const movieReview = require.body.movieReview;

    const sqlUpdate = "UPDATE `movie_review` SET `movie_review` = ? WHERE `movieName` = ?";
    db.query(sqlUpdate, [movieReview, movieName], (err, result) => {
        if (err) {
            console.log(error);
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})

// to run use node index.js