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

## Advanced Queries
~~~~sql
SELECT DISTINCT ArticleID, Title, DateLiked, Likes
FROM Articles a JOIN Likes l USING (ArticleID)
WHERE DateLiked > 20221014 AND Likes > 400

UNION

SELECT DISTINCT ArticleID, Title, DateDisliked, Dislikes
FROM Articles a JOIN Dislikes d USING (ArticleID)
WHERE DateDisliked > 20221014 AND Dislikes > 250

ORDER BY ArticleID;
~~~~

![alt text](https://github.com/cs411-alawini/fa22-cs411-Q-team006-Cowbuddy/blob/main/doc/SubqueryOne.png)


## Indexing Analaysis
![alt text](https://github.com/cs411-alawini/fa22-cs411-Q-team006-Cowbuddy/blob/main/doc/A1.png)

CREATE INDEX article_idx on Articles(ArticleID)
![alt text](https://github.com/cs411-alawini/fa22-cs411-Q-team006-Cowbuddy/blob/main/doc/A2.png)

CREATE INDEX date_liked_idx on Likes(DateLiked)
![alt text](https://github.com/cs411-alawini/fa22-cs411-Q-team006-Cowbuddy/blob/main/doc/A3.png)

CREATE INDEX likes_idx on Articles(Likes)
![alt text](https://github.com/cs411-alawini/fa22-cs411-Q-team006-Cowbuddy/blob/main/doc/A4.png)

~~~~sql
SELECT a.Title, a.Date, t.NumberOfArticles
FROM Articles a NATURAL JOIN (
    SELECT Author, COUNT(*) NumberOfArticles
    FROM Articles
    WHERE Title LIKE '%The%' OR Title LIKE '%the%'
    GROUP BY Author
) t
ORDER BY t.NumberOfArticles DESC, a.Title;
~~~~

![alt text](https://github.com/cs411-alawini/fa22-cs411-Q-team006-Cowbuddy/blob/main/doc/SubqueryTwo.png)


## Indexing Analaysis

Original Query:
```
"-> Limit: 15 row(s)  (actual time=12.134..12.136 rows=15 loops=1)
    -> Sort: t.NumberOfArticles DESC, a.Title, limit input to 15 row(s) per chunk  (actual time=12.133..12.134 rows=15 loops=1)
        -> Stream results  (cost=5335.25 rows=0) (actual time=5.661..11.116 rows=2066 loops=1)
            -> Nested loop inner join  (cost=5335.25 rows=0) (actual time=5.655..10.310 rows=2066 loops=1)
                -> Filter: (a.Author is not null)  (cost=210.25 rows=2050) (actual time=0.113..0.974 rows=2067 loops=1)
                    -> Table scan on a  (cost=210.25 rows=2050) (actual time=0.112..0.826 rows=2070 loops=1)
                -> Index lookup on t using <auto_key0> (Author=a.Author)  (actual time=0.001..0.001 rows=1 loops=2067)
                    -> Materialize  (cost=0.00..0.00 rows=0) (actual time=8.217..8.914 rows=964 loops=1)
                        -> Table scan on <temporary>  (actual time=0.001..0.098 rows=964 loops=1)
                            -> Aggregate using temporary table  (actual time=4.206..4.377 rows=964 loops=1)
                                -> Filter: ((Articles.Title like '%The%') or (Articles.Title like '%the%'))  (cost=210.25 rows=430) (actual time=0.043..2.678 rows=2069 loops=1)
                                    -> Table scan on Articles  (cost=210.25 rows=2050) (actual time=0.034..0.702 rows=2070 loops=1)
"
```

~~~~sql
CREATE INDEX title_idx ON Articles(Title);
~~~~
```
"-> Limit: 15 row(s)  (actual time=12.508..12.510 rows=15 loops=1)
    -> Sort: t.NumberOfArticles DESC, a.Title, limit input to 15 row(s) per chunk  (actual time=12.508..12.509 rows=15 loops=1)
        -> Stream results  (cost=5335.25 rows=0) (actual time=5.675..11.479 rows=2066 loops=1)
            -> Nested loop inner join  (cost=5335.25 rows=0) (actual time=5.670..10.658 rows=2066 loops=1)
                -> Filter: (a.Author is not null)  (cost=210.25 rows=2050) (actual time=0.060..0.979 rows=2067 loops=1)
                    -> Table scan on a  (cost=210.25 rows=2050) (actual time=0.059..0.810 rows=2070 loops=1)
                -> Index lookup on t using <auto_key0> (Author=a.Author)  (actual time=0.001..0.002 rows=1 loops=2067)
                    -> Materialize  (cost=0.00..0.00 rows=0) (actual time=8.442..9.178 rows=964 loops=1)
                        -> Table scan on <temporary>  (actual time=0.002..0.106 rows=964 loops=1)
                            -> Aggregate using temporary table  (actual time=4.318..4.491 rows=964 loops=1)
                                -> Filter: ((Articles.Title like '%The%') or (Articles.Title like '%the%'))  (cost=210.25 rows=430) (actual time=0.037..2.689 rows=2069 loops=1)
                                    -> Table scan on Articles  (cost=210.25 rows=2050) (actual time=0.029..0.755 rows=2070 loops=1)
"
```

~~~~sql
CREATE INDEX author_idx ON Articles(Author);
~~~~
```
"-> Limit: 15 row(s)  (actual time=16.065..16.068 rows=15 loops=1)
    -> Sort: t.NumberOfArticles DESC, a.Title, limit input to 15 row(s) per chunk  (actual time=16.064..16.067 rows=15 loops=1)
        -> Stream results  (cost=370.59 rows=913) (actual time=7.917..15.352 rows=2066 loops=1)
            -> Nested loop inner join  (cost=370.59 rows=913) (actual time=7.912..14.509 rows=2066 loops=1)
                -> Filter: (t.Author is not null)  (cost=295.72..50.88 rows=430) (actual time=7.881..8.197 rows=963 loops=1)
                    -> Table scan on t  (cost=0.02..7.88 rows=430) (actual time=0.002..0.179 rows=964 loops=1)
                        -> Materialize  (cost=296.31..304.17 rows=430) (actual time=7.879..8.118 rows=964 loops=1)
                            -> Group aggregate: count(0)  (cost=253.27 rows=430) (actual time=0.284..7.380 rows=964 loops=1)
                                -> Filter: ((Articles.Title like '%The%') or (Articles.Title like '%the%'))  (cost=210.25 rows=430) (actual time=0.277..6.380 rows=2069 loops=1)
                                    -> Index scan on Articles using author_idx  (cost=210.25 rows=2050) (actual time=0.271..4.264 rows=2070 loops=1)
                -> Index lookup on a using author_idx (Author=t.Author)  (cost=0.53 rows=2) (actual time=0.005..0.006 rows=2 loops=963)
"
```

~~~~sql
CREATE INDEX title_idx ON Articles(Title);
CREATE INDEX author_idx ON Articles(Author);
~~~~
```
"-> Limit: 15 row(s)  (actual time=13.577..13.580 rows=15 loops=1)
    -> Sort: t.NumberOfArticles DESC, a.Title, limit input to 15 row(s) per chunk  (actual time=13.577..13.579 rows=15 loops=1)
        -> Stream results  (cost=370.59 rows=913) (actual time=6.325..12.908 rows=2066 loops=1)
            -> Nested loop inner join  (cost=370.59 rows=913) (actual time=6.320..12.069 rows=2066 loops=1)
                -> Filter: (t.Author is not null)  (cost=295.72..50.88 rows=430) (actual time=6.295..6.586 rows=963 loops=1)
                    -> Table scan on t  (cost=0.02..7.88 rows=430) (actual time=0.002..0.159 rows=964 loops=1)
                        -> Materialize  (cost=296.31..304.17 rows=430) (actual time=6.293..6.509 rows=964 loops=1)
                            -> Group aggregate: count(0)  (cost=253.27 rows=430) (actual time=0.220..5.952 rows=964 loops=1)
                                -> Filter: ((Articles.Title like '%The%') or (Articles.Title like '%the%'))  (cost=210.25 rows=430) (actual time=0.212..4.972 rows=2069 loops=1)
                                    -> Index scan on Articles using author_idx  (cost=210.25 rows=2050) (actual time=0.205..2.939 rows=2070 loops=1)
                -> Index lookup on a using author_idx (Author=t.Author)  (cost=0.53 rows=2) (actual time=0.004..0.005 rows=2 loops=963)
"
```

We can see that adding index to the `Title` column of table `Articles` has almost no effect on 
the performance of this query. It may happen because the `Title` values are used to perform 
pattern matching, which doesn't rely on the indices (each record must be compared to the pattern
no matter what). Adding index to the `Author` column significantly reduces the cost of the query.
The execution time of the query reduces from more than 200 ms to less than 140 ms. The speed-up
happens the index helps reduce the cost of scanning the `Article` table for `Author` from 210.25 to 0.53.
