var fs = require('fs');
var http = require('http')
var https = require('https')
import config from ('./../src/data/config.js')

try {
  var privateKey  = fs.readFileSync('/etc/ssl/private/key.pem', 'utf8');
  var certificate = fs.readFileSync('/etc/ssl/private/cert.pem', 'utf8');
  var credentials = {key: privateKey, cert: certificate};
} catch (error) {
  console.log(error) 
}

var cors = require('cors-anywhere');


// create a new express app
const express = require("express");
const app = express();
// import ffmpeg
const ffmpeg = require("fluent-ffmpeg");

// serve static files from the Vue app
app.use(express.static(__dirname + "/dist"));

// create backend api endpoint for media encoding
app.get("/api/encode", (req, res) => {
  // req.body will contain a JSON with a list of URL images to encode

  const images = req.body.images;
  const videoName = "video.mp4";
  const videoPath = __dirname + "/dist/" + videoName;
  // create a new video with the images
  console.log("who are you?");
  const video = ffmpeg();
});
// send / to index.html
app.get("/*", (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
}); // listen on port 3000

var httpServer = http.createServer(app);
try {
  var httpsServer = https.createServer(credentials, app);
} catch (error) {
  
}


cors.createServer({
  originWhitelist: [],
  requireHeader: ['origin', 'x-requested-with'],
  removeHeaders: ['cookie', 'cookie2']
}).listen(10002, config.server ?  "https://144.91.82.153" : "0.0.0.0", function() {
  console.log("CORS Anywhere server started...")
})
httpServer.listen(9999);
httpsServer.listen(10001);


