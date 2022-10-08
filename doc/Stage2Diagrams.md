## UML Diagram
![alt text](https://github.com/cs411-alawini/fa22-cs411-Q-team006-Cowbuddy/blob/main/doc/UML.png)


#### Logical design


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
