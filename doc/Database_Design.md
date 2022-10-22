# DDL Commands

~~~~sql
CREATE TABLE Countries (
    CountryID INT PRIMARY KEY,
    OfficialName VARCHAR(64),
    Population INT,
    NumberOfArticles INT
);

CREATE TABLE Publications (
    PublicationID INT PRIMARY KEY,
    PublicationName VARCHAR(64),
    CountryOfOrigin INT REFERENCES Country(CountryID) ON DELETE SET NULL,
    DateEstablished DATE,
    Medium VARCHAR(64)
);

CREATE TABLE Articles (
    ArticleID INT PRIMARY KEY,
    Title VARCHAR(256),
    Author VARCHAR(128),
    `Date` DATE,
    PublicationID INT REFERENCES Publication (PublicationID) ON DELETE CASCADE,
    Likes INT,
    Dislikes INT
);

CREATE TABLE Users (
    UserID INT PRIMARY KEY,
    Email VARCHAR(64),
    Username VARCHAR(64),
    Password VARCHAR(64),
    ArticlesRead INT,
    ArticlesLiked INT,
    AccountCreationDate DATE
);

CREATE TABLE Comments (
    UserID INT REFERENCES Users(UserID) ON DELETE SET NULL,
    ArticleID INT REFERENCES Articles(ArticleID) ON DELETE CASCADE,
    Content VARCHAR(512),
    DateCommented DATE,
    PRIMARY KEY (UserID, ArticleID)
);

CREATE TABLE Dislikes (
    UserID INT REFERENCES Users(UserID) ON DELETE SET NULL,
    ArticleID INT REFERENCES Article(ArticleID) ON DELETE CASCADE,
    DateDisliked DATE,
    PRIMARY KEY(UserID, ArticleID)
);

CREATE TABLE Likes (
    UserID INT REFERENCES Users(UserID) ON DELETE SET NULL,
    ArticleID INT REFERENCES Article(ArticleID) ON DELETE CASCADE,
    DateLiked DATE,
    PRIMARY KEY(UserID, ArticleID)
);
~~~~

## Terminal Connection
![alt text](https://github.com/cs411-alawini/fa22-cs411-Q-team006-Cowbuddy/blob/main/doc/TerminalInfo.png)

## Data Insertion
![alt text](https://github.com/cs411-alawini/fa22-cs411-Q-team006-Cowbuddy/blob/main/doc/Counts.png)

## Advanced Subqueries
SELECT DISTINCT ArticleID, Title, DateLiked, Likes
FROM Articles a JOIN Likes l USING (ArticleID)
WHERE DateLiked > 20221014 AND Likes > 400

UNION

SELECT DISTINCT ArticleID, Title, DateDisliked, Dislikes
FROM Articles a JOIN Dislikes d USING (ArticleID)
WHERE DateDisliked > 20221014 AND Dislikes > 250

ORDER BY ArticleID;

![alt text](https://github.com/cs411-alawini/fa22-cs411-Q-team006-Cowbuddy/blob/main/doc/SubqueryOne.png)



