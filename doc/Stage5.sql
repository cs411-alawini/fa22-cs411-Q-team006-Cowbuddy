CREATE PROCEDURE GetCountriesOfTheWeek()
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE curr_country INT;
    DECLARE country_cur CURSOR FOR SELECT DISTINCT CountryID FROM IsAbout;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    DROP TABLE IF EXISTS CountriesOfTheWeek;

    CREATE TABLE CountriesOfTheWeek
    (
        CountryName VARCHAR(64) PRIMARY KEY,
        Heat        INT
    );

    CREATE TEMPORARY TABLE tempCountries1
    (
        CountryID INT,
        Heat      INT
    );

    CREATE TEMPORARY TABLE tempCountries2
    (
        CountryID INT,
        Heat      INT
    );

    OPEN country_cur;

    REPEAT
        FETCH country_cur INTO curr_country;
        INSERT INTO tempCountries1 ( SELECT CountryID,
                                            (COUNT(*) * 100 + SUM(Likes) * 2 + SUM(Dislikes) * 3 +
                                             t.num_comments * 10) AS Heat
                                     FROM ( Articles NATURAL JOIN IsAbout NATURAL JOIN Countries )
                                              JOIN ( SELECT CountryID, COUNT(*) AS num_comments
                                                     FROM Comments
                                                              NATURAL JOIN IsAbout
                                                     GROUP BY CountryID ) t USING (CountryID)
                                     WHERE CountryID = curr_country
                                     GROUP BY CountryID );
    UNTIL done END REPEAT;

    INSERT INTO tempCountries2 SELECT * FROM tempCountries1;

    INSERT INTO CountriesOfTheWeek ( SELECT OfficialName, Heat
                                     FROM tempCountries1
                                              NATURAL JOIN Countries
                                     ORDER BY Heat DESC
                                     LIMIT 5 )
    UNION
    ( SELECT OfficialName, Heat
      FROM Countries
               NATURAL JOIN ( SELECT CountryID
                              FROM Events
                                       NATURAL JOIN Articles
                                       NATURAL JOIN IsAbout
                                       NATURAL JOIN Countries
                              WHERE EventDate BETWEEN (NOW() - INTERVAL 7 DAY) AND NOW()
                              GROUP BY CountryID ) t
               NATURAL JOIN tempCountries2 )
    LIMIT 10;

    DROP TEMPORARY TABLE IF EXISTS tempCountries1, tempCountries2;
    CLOSE country_cur;
END;

CREATE TRIGGER EventTrig
    BEFORE INSERT
    ON Events
    FOR EACH ROW
BEGIN
    -- Abort like/dislike operation if the user has already liked/disliked the article.
    IF new.Type IN (0, 1) AND
       EXISTS(SELECT * FROM Events WHERE UserID = new.UserID AND ArticleID = new.ArticleID AND Type IN (0, 1)) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'ERROR: User has already liked/disliked this article.';
    END IF;

    -- Perform operations.
    IF new.Type = 0 THEN
        REPLACE INTO Likes VALUES (new.UserID, new.ArticleID, CURDATE());
        UPDATE Users SET ArticlesLiked = Users.ArticlesLiked + 1 WHERE UserID = new.UserID;
        UPDATE Articles SET Likes = Likes + 1 WHERE ArticleID = new.ArticleID;
    ELSEIF new.Type = 1 THEN
        REPLACE INTO Dislikes VALUES (new.UserID, new.ArticleID, CURDATE());
        UPDATE Users SET ArticlesDisliked = Users.ArticlesDisliked + 1 WHERE UserID = new.UserID;
        UPDATE Articles SET Dislikes = Dislikes + 1 WHERE ArticleID = new.ArticleID;
    ELSEIF new.Type = 2 THEN
        REPLACE INTO Comments VALUES (new.UserID, new.ArticleID, new.Content, CURDATE());
    END IF;
END;

CREATE TRIGGER EventUndoTrig
    BEFORE DELETE
    ON Events
    FOR EACH ROW
BEGIN
    -- Abort like/dislike operation if the user has already liked/disliked the article.
    IF NOT EXISTS(SELECT * FROM Events WHERE UserID = old.UserID AND ArticleID = old.ArticleID AND Type = old.Type) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'ERROR: User has not liked/disliked/commented on this article yet.';
    END IF;

    -- Perform operations.
    IF old.Type = 0 THEN
        DELETE FROM Likes WHERE UserID = old.UserID AND ArticleID = old.ArticleID;
        UPDATE Users SET ArticlesLiked = Users.ArticlesLiked - 1 WHERE UserID = old.UserID;
        UPDATE Articles SET Likes = Likes - 1 WHERE ArticleID = old.ArticleID;
    ELSEIF old.Type = 1 THEN
        DELETE FROM Dislikes WHERE UserID = old.UserID AND ArticleID = old.ArticleID;
        UPDATE Users SET ArticlesDisliked = Users.ArticlesDisliked - 1 WHERE UserID = old.UserID;
        UPDATE Articles SET Dislikes = Dislikes - 1 WHERE ArticleID = old.ArticleID;
    ELSEIF old.Type = 2 THEN
        DELETE FROM Comments WHERE UserID = old.UserID AND ArticleID = old.ArticleID;
    END IF;
END;
