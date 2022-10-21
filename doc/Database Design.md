# DDL Commands

CREATE TABLE Country (
    CountryID INT PRIMARY KEY,
    OfficialName VARCHAR(64),
    Population INT,
    Continent VARCHAR(64),
    NumberOfArticles INT
);

CREATE TABLE Publication (
    PublicationID INT PRIMARY KEY,
    PublicationName VARCHAR(64),
    CountryOfOrigin INT REFERENCES Country(CountryID) ON DELETE SET NULL,
    DateEstablished DATE,
    Medium VARCHAR(64)
);

CREATE TABLE Article (
    ArticleID INT PRIMARY KEY,
    Title VARCHAR(128),
    Author VARCHAR(64),
    Date DATE,
    PublicationID INT,
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
    Article VARCHAR(128) REFERENCES Article(URL) ON DELETE CASCADE,
    Context VARCHAR(128),
    DateCommented DATE,
    PRIMARY KEY (UserID, Article)
);

CREATE TABLE Dislikes (
    UserID INT REFERENCES Users(UserID) ON DELETE SET NULL,
    Article VARCHAR(128) REFERENCES Article(URL) ON DELETE CASCADE,
    DateDisliked DATE,
    PRIMARY KEY (UserID, Article)
);

CREATE TABLE Likes (
    UserID INT REFERENCES Users(UserID) ON DELETE SET NULL,
    Article VARCHAR(128) REFERENCES Article(URL) ON DELETE CASCADE,
    DateLiked DATE,
    PRIMARY KEY (UserID, Article)
);

## Terminal Connection
![alt text](https://github.com/cs411-alawini/fa22-cs411-Q-team006-Cowbuddy/blob/main/doc/TerminalInfo.png)
