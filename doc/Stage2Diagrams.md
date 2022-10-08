## UML Diagram
![alt text](https://github.com/cs411-alawini/fa22-cs411-Q-team006-Cowbuddy/blob/main/doc/UML.png)

Country(CountryID: INT [PK], OfficialName: VARCHAR(64), Population: INT, Continent: VARCHAR(64), NumberOfArticles: INT),
Publication(PublicationID: INT [PK], PublicationName: VARCHAR(64), CountryOfOrigin: INT [FK to Country.CountryID], DateEstablished: DATE, Medium: VARCHAR(64)),
Article(URL: VARCHAR(256) [PK], Title: VARCHAR(128), Author: VARCHAR(64), PublicationID: INT [FK to Publication.PublicationID], Likes: INT, Dislikes: INT),
IsAbout(URL: VARCHAR(256) [FK to Article.URL], CountryID: INT [FK to Country.CountryID], [PK: (URL, CountryID)]),
Users(UserID: INT [PK], Email: VARCHAR(64), Username: VARCHAR(64), Password: VARCHAR(64), ArticlesRead: INT, ArticlesLiked: INT, AccountCreationDate: DATE),
Comments(UserID: INT [FK to Users.UserID], Article: VARCHAR(128) [FK to Article.URL], Context: VARCHAR(128), DateCommented: DATE, [PK: (UserID, Article)]),
Dislikes(UserID: INT [FK to Users.UserID], Article: VARCHAR(128) [FK to Article.URL], DateLiked: DATE, [PK: (UserID, Article)]),
Likes(UserID: INT [FK to Users.UserID], Article: VARCHAR(128) [FK to Article.URL], DateDisliked: DATE, [PK: (UserID, Article)]).
