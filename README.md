#Voting-App
This is a simple Universal Javascript application for voting on topics.


### Project setup:
* Download mongodb
* start `mongod --dbpath=<path to data>`  make sure this continues to run in the background
* navigate to project root and run `npm install` to install dependencies
* create a `.env` to store environmental variables:
    > GITHUB_KEY=
    >
    > GITHUB_SECRET=
    >
    > MONGO_URI=mongodb://localhost:27017/dbname
    >
    > PORT=8080
    >
    > APP_URL=http://localhost:8080/

You will need to setup an oauth token with [github](https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/)


* run `npm run dev` to spin up the webserver