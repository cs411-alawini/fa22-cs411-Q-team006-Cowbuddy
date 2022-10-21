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
    &nbsp; ArticleID: INT [PK], \
    &nbsp; Title: VARCHAR(128), \
    &nbsp; Author: VARCHAR(64), \
    &nbsp; PublicationID: INT [FK to Publication.PublicationID], \
    &nbsp; Likes: INT, \
    &nbsp; Dislikes: INT \
)

IsAbout( \
    &nbsp; ArticleID: INT [FK to Article.ArticleID], \
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
    &nbsp; DateDisiked: DATE, [PK: (UserID, Article)] \
)

Likes( \
    &nbsp; UserID: INT [FK to Users.UserID], \
    &nbsp; Article: VARCHAR(128) [FK to Article.URL], \
    &nbsp; DateLiked: DATE, \
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

## Assumptions

#### Users

Each user will have a unique UserID, and a single email. username, and password. The ArticlesRead and ArticlesLiked are counters that will keep track of how many articles the user has read and liked, respectively. The AccountCreationDate attribute will be automatically created when the account is made.

#### Comments

Each user can only make one comment per article.

#### Likes

The three attributes are immutable. Each user can only like an article once. Cannot have a like and a dislike for the same article.

#### Dislikes

The three attributes are immutable. Each user can only dislike an article once. Cannot have a like and a dislike for the same article.

#### Articles

The Likes and Dislikes attributs are counters that are automatically updated. Each article must be related to at least one country and must be published by exactly one publisher. We will add a trigger to make sure that a user cannot both like and dislike an article.

#### Countries

NumberOfArticles will be automatically updated.

#### Publications

A publication does not have to have an article. An article can only be on one publication.  
