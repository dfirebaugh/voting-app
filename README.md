#Voting-App
This is a simple Universal Javascript application for voting on topics.


### Project setup:
* Download [docker](https://www.docker.com/get-started) to run this project.
* create a `.env` to store environmental variables:
    > GITHUB_KEY=
    >
    > GITHUB_SECRET=
    >
    > MONGO_URI=mongodb://database:27017/dbname
    >
    > PORT=8080
    >
    > APP_URL=http://localhost:8080/

You will need to setup an oauth token with [github](https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/)


* Run `docker-compose up` to build the containers

 [demo](https://voting-app-df.herokuapp.com/)