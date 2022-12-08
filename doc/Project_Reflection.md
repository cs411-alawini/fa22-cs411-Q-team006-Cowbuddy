# Project Reflection

## Changes In Direction 
The main difference between our initial plan and the final product was that we did not incorporate any web scraping. We wanted to be able to update the website every few hours to display relevant articles from all over the world. Due to limited time, we were unable to get this done, so we only ended up using databases with fixed values for Articles and Publications. Other than that, we followed the proposal and added all the features that we planned.

## Usefulness
Since we were unable to incorporate web scraping, the application is only currently useful for the time period that our data covers. It can still track the number of articles that pertain to each country. The overall goal of this project was to allow users to find articles for any country they are interested in, which was something we were able to complete. Also, users can insert their own articles into the database, so the website could end up being a medium where users could share interesting articles with each other. 

## Schema
The main change to our schema and data source was that we did not use web crawling to update our data every few hours. We wanted to remove any articles that were more than a week old and replace them with newer articles found on prominent websites. Instead, we decided to use a static dataset due to a lack of time. The other change that we made was that we allowed users to enter their own Articles into the database. This means that the database is technically not static and will increase in size when articles are added.

## Table Implementation
We did not make any significant changes to our implementation. All we did was change some of the entities to simplify our tables. For example, we made the primary keys of the Article table ArticleID instead of URL. We also included valuable information in our final implementation, like adding the Date for Articles. Other than that, the overall structure of our tables did not change. We kept all of the relationships between the tables the same.

## Functionalities
The main functionality that we did not add was updating the database with articles in real time. We did not have any experience with web scraping and did not have the time to learn. 

Another feature that we changed was the Country of the Day. We instead decided to add a histogram of the most popular countries of the week so that users would be able to see which countries were showing up in the news every week. 

A functionality that we kept was adding upvotes/downvotes and comments to articles. We also decided to give users the opportunity to insert their own articles in case they found something interesting that was not in our database. 

## Advanced Database Programs
Our trigger helps complement our application because it makes sure that users cannot both like and dislike an article. It also makes sure that one user cannot like or dislike an article multiple times. Without this, any user could completely mess with the number of likes and dislikes and even make them negative. An important part of the application is using user input to decide which type of articles to include in the future, and the trigger helps maintain accuracy.

For our stored procedure, we decided to save the country of origin for all of the Articles in the database and display the results on a histogram. Since users can input their own articles, we can use the stored procedure to update the histogram at any time. This would be even more helpful if we are able to implement web scraping in the future since there would be new articles coming in every few hours. The histogram was an important addition to our application because it is a simple way of displaying the most popular countries in the news at the moment.

## Technical Challenges
One technical challenge that Kaushal faced while coding this project was the fact that most of us had minimal knowledge of React and Express.js. This made making our own components such as a login and logout screen much more time-consuming. We had to simplify the process of how a login and logout screen worked in order to fit the time frame of when the project was due and in addition code in a register button to work. Due to our limited constraints and knowledge of the language, tutorials were not much help. They delved too deep into React concepts that we could not follow unless we changed the whole framework of our project. In the end, we decided to use a much more simplistic approach of changing an image when we knew a user logged in and in addition had the website store the user ID for any future likes/dislikes/comments. 

Rohan on the other hand had struggled with the Like and Dislike undoing operation. While he had the SQL query to do it, the tables did not match in several ways requiring him to undo actions in several different locations. He did however get this solved with the help of another teammate Scharfrichter, who allowed him to get past his technical issue. 

Scharfrichter had trouble with implementing the triggers for the application. However, he preserved through and was able to figure it out with the help of chatting with his peers. It would keep giving him an error when he tried figuring out how to stop a user from both liking and disliking an article.

Ian had a lot of trouble with the work he was given. We helped him out when necessary and he was able to do his part. He had trouble applying concepts in SQL to the project.

## Other Changes
The only other changes that we made involved the UI. We wanted to add images and more user-friendly ways to interact with the articles, but we decided to keep it simple and make sure our database and login systems worked perfectly. 

Another feature that we did not include was a comparison tool between multiple countries. We decided that the histogram of the most popular countries was enough and we mainly wanted to focus on giving the users a chance to interact with the articles. The main focus of our project was always to give users an idea of what countries were being most represented in the news, and that did not change.

## Future Work
The main feature that we would like to add in the future would be scraping different news websites and selecting articles on a variety of topics from different countries. We would also like to update our database automatically every few hours so that new articles would always be coming in.

We could also make it easier for users to enter their own articles into the database. Currently, they have to enter all the information about the article including the publication, date, author, title, etc. We could make it a lot easier by allowing users to just submit a URL. We could parse through the article and find all of the necessary information to add it to the database. 

Lastly, we could improve the search function for Articles. Currently, users can only search by ArticleID, which is difficult unless they can access the database. A better idea would be to allow users to search for specific categories, like Country. We could also add a Category entity to our Article table because many users would like to see articles on specific topics.

## Division Of Labor
The general Division of Labor for this project was that Kaushal worked on creating the general Frontend and Backend, where then Scharfrichter would populate with the SQL code which Rohan had worked on. Rohan and Scharfrichter also worked on adding the datasets to GCP while all of us had a collaborative effort in finding datasets to put in the database. 

After that, we all took part in finishing and designing the frontend, such as Kaushal working on the login and logout portion of the app, Rohan adding the Like, Dislike, and Comment portion of the app, and Scharfrichter working on the creative component as well as the triggers. Ian worked on helping the group when they needed as well as making some SQL queries and UI redesigns.

Overall, we all worked well together as a team. We made sure to communicate frequently on Discord and bounce ideas off each other when working on the application. If one person ran into issues, he made sure to ask everyone else for their input, which helped us solve issues more efficiently.
