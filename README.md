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

// Run client & server with concurrently
npm run dev

// Server runs on http://localhost:5000 and client on http://localhost:3000
```