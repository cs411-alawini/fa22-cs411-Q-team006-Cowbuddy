const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const {response} = require("express");
const port = 3001;

const db = mysql.createConnection({
    host: '127.0.0.1',
    port: '5404',
    user: 'root',
    password: 'Cowbuddy123',
    database: 'stage3',
});

db.connect(function (err) {
    if (err) {
        throw err;
    } else {
        console.log('Connected');
    }
});

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (require, response) => {
    const sqlSelect = "INSERT INTO Articles VALUES (3333, 'TEST', 'TEST', '2022-01-01', 700, 2, 3)";
    db.query(sqlSelect, (err, result) => {
        response.send("Backend Running!");
    })
})

app.get("/api/get", (require, response) => {
    const sqlSelect = "SELECT * FROM Articles WHERE ArticleID <> 0 LIMIT 10";
    db.query(sqlSelect, (err, result) => {
        response.send(result);
    })
})

app.get("/api/search/:ArticleID", (require, response) => {
    const searchID = require.params.ArticleID;
    const sqlSelect = "SELECT * FROM `Articles` WHERE `ArticleID` = ?";
    db.query(sqlSelect, searchID, (err, result) => {
        response.send(result);
    });
});

app.get("/api/adv1", (require, response) => {
    const sqlAdv1 = "SELECT DISTINCT ArticleID, Title, DateLiked, Likes " +
        "FROM Articles a JOIN Likes l USING (ArticleID) " +
        "WHERE DateLiked > 20221014 AND Likes > 400 " +
        "UNION " +
        "SELECT DISTINCT ArticleID, Title, DateDisliked, Dislikes " +
        "FROM Articles a JOIN Dislikes d USING (ArticleID) " +
        "WHERE DateDisliked > 20221014 AND Dislikes > 250 " +
        "ORDER BY ArticleID;";
    db.query(sqlAdv1, (err, result) => {
        response.send(result);
    });
});

app.get("/api/adv2", (require, response) => {
    const sqlAdv2 = "SELECT a.Title, a.Date, t.NumberOfArticles " +
        "FROM Articles a NATURAL JOIN (" +
        "    SELECT Author, COUNT(*) NumberOfArticles " +
        "    FROM Articles " +
        "    WHERE Title LIKE '%The%' OR Title LIKE '%the%' " +
        "    GROUP BY Author " +
        ") t " +
        "ORDER BY t.NumberOfArticles DESC, a.Title;"
    db.query(sqlAdv2, (err, result) => {
        response.send(result);
    })
})

app.post("/api/insert", (require, response) => {
    const ArticleID = require.body.ArticleID;
    const Title = require.body.Title;
    const Author = require.body.Author;
    const Date = require.body.Date;
    const PublicationID = require.body.PublicationID;
    const Likes = require.body.Likes;
    const Dislikes = require.body.Dislikes;

    const sqlInsert = "INSERT INTO `Articles` VALUES (?,?,?,?,?,?,?)";
    db.query(sqlInsert, [ArticleID, Title, Author, Date, PublicationID, Likes, Dislikes], (err, result) => {
        console.log(err);  // ?
    })
})

app.delete("/api/delete/:ArticleID", (require, response) => {
    const ArticleID = require.params.ArticleID;

    const sqlDelete = "DELETE FROM `Articles` WHERE `ArticleID` = ?";
    db.query(sqlDelete, ArticleID, (err, result) => {
        if (err) {
            console.log(err);
        }
    })
})

app.put("/api/update", (require, response) => {
    const ID = require.body.ArticleID;
    const Title = require.body.Title;

    const sqlUpdate = "UPDATE `Articles` SET `Title` = ? WHERE `ArticleID` = ?";
    db.query(sqlUpdate, [Title, ID], (err, result) => {
        if (err) {
            console.log(err);
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})

// to run use node index.js