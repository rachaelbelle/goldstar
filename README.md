# goldstar ⭐️💫⭐️

## Welcome to Gold Star!

In a fast-paced world, we sometimes forget to celebrate life's little wins. Gold Star will motivate you to work towards your goals while reminding you of what a great job you're already doing. 

Here's how it works:
* Create an account and start adding tasks
* Assign each task a star value based on how difficult it is
* Check off stars as you work on the task
* View your achievements and give yourself a pat on the back for earning all of those stars!
* Check out some motivational videos for a willpower boost
* Take a look at other users' tasks and add them to your to-do list if you wish
* Come back every day to be greeted with an inspirational quote!

Please visit http://getagoldstar.herokuapp.com/ to view and use our app!

If you would like to check out the code and run it locally, please complete the following steps:

## Mongo Configuration

This app requires a running Mongo database. Make sure you follow the steps below regarding Mongo database configuration. 


## How to Run locally

```javascript
// Install dependencies for server & client
npm install && npm run client-install

//create local environment variables in root directory of the app
cd ~/goldstar
touch .env
//if you do not have your mongo protected with a username/password, use the below
echo "mongoURItest=mongodb://localhost:27017/custommethoddb" >> .env
//Otherwise use the below format
echo "mongoURItest://[*username*]:[*password*]@mongodb0.example.com:27017/custommethoddb" >> .env
//Add the secret encryption key.
echo "SECRET_OR_KEY=[*your secret encryption key*]" >> .env
//Add the YouTube API key.
echo "YOUTUBE_API_KEY=[*your YouTube API key*]" >> .env
//Add the Google Maps API key.
echo "GOOGLEMAPS_API_KEY=[*your Google Maps API key*]" >> .env

// Run client & server concurrently
npm run dev

// Server runs on http://localhost:5000 and client on http://localhost:3000
```
When the above steps are complete, visit http://localhost:3000/ to view the application.

