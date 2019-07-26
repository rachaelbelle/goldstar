# goldstar

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