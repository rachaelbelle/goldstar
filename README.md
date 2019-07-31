# goldstar

## Welcome to Gold Star!

In a fast-paced world, we sometimes forget to celebrate life's little wins. Gold Star will motivate you to work towards your goals while reminding you of what a great job you're already doing. 

Here's how it works:
* Create an account and add tasks to your to-do list
* Assign each task a star value based on how difficult it is
* Check off stars as you work on the task
* View your achievements and give yourself a pat on the back for earning all of those stars!
* Check out some motivational videos for a willpower boost
* Take a look at other users' tasks and add them to your to-do list if you wish
* Come back every day to be greeted with an inspirational quote!

To run the app, please complete the following steps:

## Mongo Configuration

Make sure to add the correct `MONGOURI` from the [mLab](http://mlab.com) database in `config/keys.js`.

```javascript
module.exports = {
  mongoURI: "*MONGO_URI*",
  secretOrKey: "secret"
};
```

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
echo "mongodb://[*username*]:[*password*]@mongodb0.example.com:27017/custommethoddb" >> .env


// Run client & server with concurrently
npm run dev

// Server runs on http://localhost:5000 and client on http://localhost:3000
```

