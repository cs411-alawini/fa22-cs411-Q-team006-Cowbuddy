const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
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
    const sqlSelect = "SELECT * FROM Articles LIMIT 10";
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

app.post("/api/register/", (require, response) => { // Create New Account
    const Username = require.body.Username;
    const Email = require.body.Email;
    const Password = require.body.Password;
    if (Username && Email && Password) { // Checking to make sure nothing happens when not all inputs filled
        const sqlInsert = "INSERT IGNORE INTO `Users` VALUES (?,?,?,?,?,?,?)";
        const todayDate = new Date().toISOString().slice(0, 10);
        db.query(sqlInsert, [0, Email, Username, Password, 0, 0, todayDate], (err, result) => {
            console.error(err);
        });
        const sqlSelect = "SELECT `UserID` FROM `Users` WHERE `Username` = ?";
        db.query(sqlSelect, [Username], (err, result) => {
            response.send(result);
        })
    } else {
        response.send(null);
    }

});

app.post("/api/login/", (require, response) => { // Login Process
    const Username = require.body.Username;
    const Password = require.body.Password;
    if (Username && Password) {
        const sqlSelect = "SELECT `UserID` FROM `Users` WHERE `Username` = ? AND `Password` = ?";
        db.query(sqlSelect, [Username, Password], (err, result) => {
            response.send(result); // Sends back UserID
        });
    } else {
        response.send(null);
    }
});

app.post("/api/like/", (require, response) => {
    const UserID = require.body.UserID;
    const ArticleID = require.body.ArticleID;

    if (UserID) { // Checking to make sure nothing happens when not all inputs filled
        if (ArticleID) {
            const sqlInsert = "INSERT INTO `Events` VALUES (?,?,?,?)"
            db.query(sqlInsert, [UserID, ArticleID, 0, ''], (err, result) => {
                console.error(err);
                response.send("Liked!");
            });
        } else {
            response.send("You haven't chosen an Article!");
        }
    } else {
        response.send("You haven't logged in!");
    }

});

app.post("/api/dislike/", (require, response) => {
    const UserID = require.body.UserID;
    const ArticleID = require.body.ArticleID;

    if (UserID) { // Checking to make sure nothing happens when not all inputs filled
        if (ArticleID) {
            const sqlUpdate = "UPDATE `Articles` SET `Dislikes` = `Dislikes` + 1 WHERE `ArticleID` = ?";
            db.query(sqlUpdate, ArticleID, (err, result) => {
                response.send("Disliked Article");
            });
        } else {
            response.send("You haven't chosen an Article!");
        }
    } else {
        response.send("You haven't logged in!");
    }

});

app.post("/api/undoDislike/", (require, response) => {
    const UserID = require.body.UserID;
    const ArticleID = require.body.ArticleID;

    if (UserID) { // Checking to make sure nothing happens when not all inputs filled
        if (ArticleID) {
            const sqlUpdate = "UPDATE `Articles` SET `Dislikes` = `Dislikes` - 1 WHERE `ArticleID` = ?";
            db.query(sqlUpdate, ArticleID, (err, result) => {
                response.send("Un-Disliked Article");
            });
        } else {
            response.send("You haven't chosen an Article!");
        }
    } else {
        response.send("You haven't logged in!");
    }

});

app.post("/api/undoLike/", (require, response) => {
    const UserID = require.body.UserID;
    const ArticleID = require.body.ArticleID;

    if (UserID) { // Checking to make sure nothing happens when not all inputs filled
        if (ArticleID) {
            const sqlUpdate = "UPDATE `Articles` SET `Likes` = `Likes` - 1 WHERE `ArticleID` = ?";
            const sqlSelect = "UPDATE `Users` SET `ArticlesLiked` = `ArticlesLiked` - 1 WHERE `UserID` = ?";
            db.query(sqlUpdate, ArticleID, (err, result) => {
                db.query(sqlSelect, UserID, (err2, result2) => {
                    response.send("Un-Liked Article");
                });
            });
        } else {
            response.send("You haven't chosen an Article!");
        }
    } else {
        response.send("You haven't logged in!");
    }

});

app.post("/api/comment/", (require, response) => {
    const UserID = require.body.UserID;
    const ArticleID = require.body.ArticleID;
    const Content = require.body.Content;
    //const DateCommented = require.body.DateCommented;

    if (UserID) { // Checking to make sure nothing happens when not all inputs filled
        if (ArticleID) {
            var todayDate = new Date().toISOString().slice(0, 10);
            const sqlUpdate = "INSERT INTO `Comments` VALUES (?,?,?,?)";
            db.query(sqlUpdate, [UserID, ArticleID, Content, todayDate], (err, result) => {
                response.send("Comment Successful!")
            });
        } else {
            response.send("You haven't chosen an Article!");
        }
    } else {
        response.send("You haven't logged in!");
    }

});

app.post("/api/uncomment/", (require, response) => {
    const UserID = require.body.UserID;
    const ArticleID = require.body.ArticleID;
    const Content = require.body.Content;

    if (UserID) { // Checking to make sure nothing happens when not all inputs filled
        if (ArticleID) {
            const sqlUpdate = "DELETE FROM `Comments` WHERE `UserID` = ?, `ArticleID` = ?, `Content` = ?";
            db.query(sqlUpdate, [UserID, ArticleID, Content], (err, result) => {
                response.send("Comment Sucessfully Deleted!")
            });
        } else {
            response.send("You haven't chosen an Article!");
        }
    } else {
        response.send("You haven't logged in!");
    }

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