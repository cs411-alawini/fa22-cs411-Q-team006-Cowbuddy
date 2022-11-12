const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const {response} = require("express");
const port = 3001;

const db = mysql.createConnection({
    host: '127.0.0.1',
    port: 5404,
    user: 'root',
    password: '-/#us-^,ys"-HzQR',
    database: 'stage3',
});

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
    const sqlSelect = "SELECT * FROM Articles LIMIT 10";
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

app.delete("/api/delete/:ArticleID", (require, response) => {
    const ArticleID = require.params.ArticleID;

    const sqlDelete = "DELETE FROM `Articles` WHERE `ArticleID` = ?";
    db.query(sqlDelete, ArticleID, (err, result) => {
        if (err) {
            console.log(error);
        }
    })
})

app.put("/api/update", (require, response) => {
    const ID = require.body.ArticleID;
    const Title = require.body.Title;

    const sqlUpdate = "UPDATE `Articles` SET `Title` e ? WHERE `ArticleID` = ?";
    db.query(sqlUpdate, [Title, ID], (err, result) => {
        if (err) {
            console.log(error);
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})

// to run use node index.js