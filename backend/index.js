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
            const sqlInsert = "REPLACE INTO `Events` (UserID, ArticleID, Type, Content) VALUES (?,?,?,?)"
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
            const sqlInsert = "REPLACE INTO `Events` (UserID, ArticleID, Type, Content) VALUES (?,?,?,?)"
            db.query(sqlInsert, [UserID, ArticleID, 1, ''], (err, result) => {
                console.error(err);
                response.send("Disliked!");
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
            const sqlDelete = "DELETE FROM `Events` WHERE `UserID` = ? AND `ArticleID` = ? AND `Type` = ?";
            db.query(sqlDelete, [UserID, ArticleID, 1, ''], (err, result) => {
                console.error(err);
                response.send("Un-disliked!");
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
            const sqlDelete = "DELETE FROM `Events` WHERE `UserID` = ? AND `ArticleID` = ? AND `Type` = ?";
            db.query(sqlDelete, [UserID, ArticleID, 0, ''], (err, result) => {
                console.error(err);
                response.send("Un-liked!");
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

    if (UserID) { // Checking to make sure nothing happens when not all inputs filled
        if (ArticleID) {
            const sqlInsert = "REPLACE INTO `Events` (UserID, ArticleID, Type, Content) VALUES (?,?,?,?)"
            db.query(sqlInsert, [UserID, ArticleID, 2, Content], (err, result) => {
                console.error(err);
                response.send("Comment Successful!");
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
            const sqlDelete = "DELETE FROM `Events` WHERE `UserID` = ? AND `ArticleID` = ? AND `Type` = ?";
            db.query(sqlDelete, [UserID, ArticleID, 2, ''], (err, result) => {
                console.error(err);
                response.send("Comment Successfully Deleted!")
            });
        } else {
            response.send("You haven't chosen an Article!");
        }
    } else {
        response.send("You haven't logged in!");
    }
});


app.get("/api/stat", (require, response) => {
    const sqlSP = "CALL GetCountriesOfTheWeek";
    db.query(sqlSP, (err, result) => {
        console.log(err);
    });
    const sqlRet = "SELECT * FROM CountriesOfTheWeek ORDER BY Heat DESC";
    db.query(sqlRet, (err, result) => {
        console.log(err);
        response.send(result);
    });
});

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