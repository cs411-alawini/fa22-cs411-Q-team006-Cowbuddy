## UML Diagram
![alt text](https://github.com/cs411-alawini/fa22-cs411-Q-team006-Cowbuddy/blob/main/doc/UML.png)


## Relational Schema


Country( \
    &nbsp; CountryID: INT [PK], \
    &nbsp; OfficialName: VARCHAR(64), \
    &nbsp; Population: INT, \
    &nbsp; Continent: VARCHAR(64), \
    &nbsp; NumberOfArticles: INT \
) 

Publication( \
    &nbsp; PublicationID: INT [PK], \
    &nbsp; PublicationName: VARCHAR(64), \
    &nbsp; CountryOfOrigin: INT [FK to Country.CountryID], \
    &nbsp; DateEstablished: DATE, \
    &nbsp; Medium: VARCHAR(64) \
)

Article( \
    &nbsp; URL: VARCHAR(256) [PK], \
    &nbsp; Title: VARCHAR(128), \
    &nbsp; Author: VARCHAR(64), \
    &nbsp; PublicationID: INT [FK to Publication.PublicationID], \
    &nbsp; Likes: INT, \
    &nbsp; Dislikes: INT \
)

IsAbout( \
    &nbsp; URL: VARCHAR(256) [FK to Article.URL], \
    &nbsp; CountryID: INT [FK to Country.CountryID], \
    &nbsp; [PK: (URL, CountryID)] \
)

Users( \
    &nbsp; UserID: INT [PK], \
    &nbsp; Email: VARCHAR(64), \
    &nbsp; Username: VARCHAR(64), \
    &nbsp; Password: VARCHAR(64), \
    &nbsp; ArticlesRead: INT, \
    &nbsp; ArticlesLiked: INT, \
    &nbsp; AccountCreationDate: DATE \
)

Comments( \
    &nbsp; UserID: INT [FK to Users.UserID], \
    &nbsp; Article: VARCHAR(128) [FK to Article.URL], \
    &nbsp; Context: VARCHAR(128), DateCommented: DATE, \
    &nbsp; [PK: (UserID, Article)] \
)

Dislikes( \
    &nbsp; UserID: INT [FK to Users.UserID], \
    &nbsp; Article: VARCHAR(128) [FK to Article.URL], \
    &nbsp; DateLiked: DATE, [PK: (UserID, Article)] \
)

Likes( \
    &nbsp; UserID: INT [FK to Users.UserID], \
    &nbsp; Article: VARCHAR(128) [FK to Article.URL], \
    &nbsp; DateDisliked: DATE, \
    &nbsp; [PK: (UserID, Article)] \
)

## Cardinality

#### UserComments
A user does not have to make any comments, and can make an unlimited amount of comments. A comment can only be made by one user. This means that there is a one-to-many relationship between Users and Comments. 

#### UserDislikes
A user does not have to make any dislikes, and can make an unlimited amount of dislikes. A dislike can only be made by one user. This means that there is a one-to-many relationship between Users and Dislikes. 

#### UserLikes
A user does not have to make any likes, and can make an unlimited amount of likes. A like can only be made by one user. This means that there is a one-to-many relationship between Users and Likes. 

#### ArticleComments
An Article does not need to have any comments, and can have an unlimited amount of comments. A specific comment can only be on a single article. This means that there is a one-to-many relationship between Articles and Comments. 

#### ArticleDislikes
An Article does not need to have any dislikes, and can have an unlimited amount of dislikes. A specific dislike can only be on a single article. This means that there is a one-to-many relationship between Articles and Dislikes. 

#### ArticleLikes
An Article does not need to have any likes, and can have an unlimited amount of likes. A specific like can only be on a single article. This means that there is a one-to-many relationship between Articles and Likes. 

#### IsAbout
An article must be about at least one country because all of the articles are related to at least one country. An article can also be about multiple countries and there is no limit to the amount of countries in an article. A country can have zero articles if not represented, but can also have an unlimited number of articles written about it. This means that there is a many-to -many relationship between Article and Country

#### Published
An article can only be on one publication. A publication does not have any articles, but it can have an unlimited number of articles on it. This means that there is a one-to-many relationship between Publication and Articles.
