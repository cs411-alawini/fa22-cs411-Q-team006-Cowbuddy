# What Country Is In The News?

## Project Summary
This project aims to provide users with a more global perspective of the news. Especially in America, people rarely hear about what is happening in other parts of the world. The website will display what countries are currently in the news and provide links to articles relevant to that country. Users will be able to search for countries that they are interested in and will get the opportunity to compare the results between different countries. 

## Description
The application will crawl the web every twenty four hours to find new articles from reputable sources. It will then sort the articles it finds by countries it is relevant to, and update the internal database. Links will be kept for one week before they are deleted. Users will be able to click on a country in the main table to view the articles relevant to that country in the past week.

The issue that needs to be solved is that many people in the USA do not consume enough international news. Most news websites focus on American news and it is difficult to find good articles on most countries. The application will make it significantly easier for anyone to find recent news related to any country that they are interested in. If a user is interested in how the results of multiple countries compare, they will get a chance to compare them by looking at the number and content of the articles. 

## Usefullness
The application will be useful because it will give users an easy way to find out what is going on in the world without having to read articles. Many people on the internet do not have very much patience, so this application will be a concise way to show them which countries are relevant at the moment. Since URLs are being linked to the articles, this app can also be a great way for someone to find information about a country that they are interested in. 

This application is also very unique because most news websites just list articles about various different topics. People can search for the name of a country, but Google results do not always give the most recent results. Also, there is no way to compare the results between different countries when searching on the internet. There aren't any websites that focus specifically on which countries are in the news at the moment.

## Realness
The data powering the databases will be articles scraped from other companies from around the world. Ideally, there will be major news/articles from a variety of countries and scrap the articles from their websites. This will be enough to get articles for most countries as well as that specific country's views on topics. There can also be an additional filter on these articles for them to be exclusively about a country, in case an article talks about multiple countries' sides.

The data, as stated before, will be articles. Important information will be scraped from the articles such as the author, company, date, country of origin, and much more. For right now the focus is on being able to show all major articles for a particular country when asked for by the user.

## Functionalities
There will be a country of the day displayed on the UI to engage users to look at news about other countries and learn new things about what is happening around the globe. There will also be an auto-update feature that will essentially scrape websites every time the articles are updated. This might change depending on the resources required to do real-time updates, and if that doesn’t work hourly or once every 3-hour updates would be an option. Users will also be able to update the application by giving upvotes and downvotes to different articles, which will provide insight into the sources and types of articles people are interested in. Users will also be able to add comments on the articles so that they can communicate any issues or ideas that they have with the articles. This also means that the users will have their own account, where they can track their progress, and make their likes, dislikes, and comments public.

Another essential feature that will be added is the ability to search for articles by country. This is the feature that will bring the project together. They will also be able to compare different countries and the news going on against each other. This will be a significant feature of the project and allow users to compare what countries are talking about, especially if there is political tension between the two countries. The final feature will be to go directly where an article was scraped. This is a necessary feature as these articles are owned by other sources. And the users can then go to these article websites and look for other articles by this company.

## UI Mockup
![alt text](https://github.com/cs411-alawini/fa22-cs411-Q-team006-Cowbuddy/blob/main/doc/UI_Mockup.jpg)

## Project Work Distribution
Rohan will work on adding an upvote/downvote and comment feature to all of the articles and make sure that the data is saved every time a user makes a selection. These features will allow users to interact with the articles and communicate the type of articles that they want to be shown on the website.  

Kaushal will work on the “Country of the Day” feature of the project which will randomly choose a country for the day and show articles pertaining to that country. This feature will expose users to news from different countries, and encourage them to explore what is going on in different countries. He will also add the URLs for every article. This will allow the user to backtrack and find the article on the original website it was found. He will also work on the account feature, which will allow the likes, dislikes, and comments to be publicly attached to someone.

Scharfrichter will work on the “Compare Countries” feature of the project where users can choose two countries and get detailed statistics over a specific period of time. This feature will expose users to interactions between different countries, encourage them to identify countries that appear to be performing better, and prompt a search for ways to improve their own countries. 

Ian will work on the search feature of the project and make sure that accurate results come up when users search for a country. The search function will work specifically as a way to filter all of the articles on the website by country. It could also be used to find specific types of articles if a user types in a keyword.

The most difficult part of the project will be scraping the data from the chosen articles and adding the auto-update feature. This means that multiple people will need to work on both of these parts. The current plan is to have Rohan and Kaushal work on the data scraping feature and Scharfrichter and Ian work on the auto-update feature. Depending on the difficulty of each of these, the roles may be switched up.

For the Backend of the project, every group member will work on populating the databases pertaining to their frontend part and add in the implementation for it to work with their frontend. For example, Kaushal will work on Country of the Day in the frontend, and also populate the Database for all necessary info if not already there. He will also add all backend features required to have the frontend work.



