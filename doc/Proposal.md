# What Country Is In The News?

## Project Summary
This project aims to provide users with a more global perspective of the news. Especially in America, people rarely hear about what is happening in other parts of the world. The website will display what countries are currently in the news and provide links to articles relevant to that country. Users will be able to search for countries that they are interested in and will get the opportunity to compare the results between different countries. 

## Description
The application will crawl the web every twenty four hours to find new articles from reputable sources. It will then sort the articles it finds by countries it is relevant to, and update the internal database. Links will be kept for one week before they are deleted. Users will be able to click on a country in the main table to view the articles relevant to that country in the past week.

The issue that we want to solve is that many people in the US do not consume enough international news. Most news websites focus on American news and it is difficult to find good articles on most countries. Our application will make it significantly easier for anyone to find recent news related to any country that they are interested in. If a user is interested in how the results of multiple countries compare, they will get a chance to compare them by looking at the number and content of the articles. 

## Usefullness
Our application will be useful because it will give users an easy way to find out what is going on in the world without having to read articles. Many people on the internet do not have very much patience, so this application will be a concise way to show them which countries are relevant at the moment. Since we are also linking the URLs to articles, this app can also be a great way for someone to find information about a country that they are interested in. 

This application is also very unique because most news websites just list articles about various different topics. People can search for the name of a country, but Google results do not always give the most recent results. Also, there is no way to compare the results between different countries when searching on the internet. There aren't any websites that we know of that focus specifically on which countries are in the news at the moment.

## Realness
The data powering our databases will be articles scraped from other companies from around the world. We will, ideally, get a major news/article from a variety of countries and scrap the articles from their websites. This will be enough to get us articles for most countries as well as that specific country's views on topics. We can also do an additional filter on these articles for them to be exclusively about a country, in case an article talks about multiple countries' sides.

Our data, as stated before, will be articles. We will also scrap important information such as the author, company, date, country of origin, and much more. For right now we want to focus on being able to show all major articles for a particular country when asked for by the user.

## Functionalities
We will have a country of the day displayed on the UI to engage users to look at news about other countries and learn new things about what is happening around the globe. We will also implement an auto-update feature that will essentially scrape websites every time the articles are updated. This might change depending on the resources required to do real-time updates, if that doesn’t work we might resort to hourly or once every 3-hour updates. Users will also be able to update the application by giving upvotes and downvotes to different articles, which will give us insight into the sources and types of articles people are interested in.

Another essential feature we will add is the ability to search for articles by country. This is the feature that will bring our project together. They will also be able to compare different countries and the news going on against each other. This will be a significant feature of our project as well as it will allow users to compare what countries are talking about, especially if there is political tension going on between the two countries. The final feature will be to go directly where an article was scraped. This is a necessary feature as we do not own these articles. And the users can then go to these article websites and look for other articles by this company.

## UI Mockup
![alt text](https://github.com/cs411-alawini/fa22-cs411-Q-team006-Cowbuddy/blob/main/doc/UI_Mockup.jpg)

## Project Work Distribution
Rohan will work on adding an upvote/downvote feature to all of the articles and make sure that the data is saved every time a user makes a selection. This feature will allow users to interact with the articles and communicate the type of articles that they want to be shown on the website.

Kaushal will work on the “Country of the Day” feature of the project which will randomly choose a country for the day and show articles pertaining to that country. This feature will expose users to news from different countries, and encourage them to explore what is going on in different countries. I will also add the URLs for every article. This will allow the user to backtrack and find the article on the original website it was found.

Scharfrichter will work on the “Compare Countries” feature of the project where users can choose two countries and get detailed statistics over a specific period of time. This feature will expose users to interactions between different countries, encourage them to identify countries that appear to be performing better, and prompt a search for ways to improve their own countries. 

Ian will work on the search feature of the project and make sure that accurate results come up when users search for a country. The search function will work specifically as a way to filter all of the articles on the website by country. It could also be used to find specific types of articles if a user types in a keyword.

For the Backend of the project, every group member will work on populating the databases pertaining to their frontend part and add in the implementation for it to work with their frontend. For example, Kaushal will work on Country of the Day in the frontend, and also populate the Database for all necessary info if not already there. He will also add all backend features required to have the frontend work.



