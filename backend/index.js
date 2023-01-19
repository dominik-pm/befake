var fs = require('fs');
var http = require('http')
var https = require('https')
var privateKey  = fs.readFileSync('/etc/ssl/private/key.pem', 'utf8');
var certificate = fs.readFileSync('/etc/ssl/private/cert.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};

// create a new express app
const express = require("express");
const app = express();
// import ffmpeg
const ffmpeg = require("fluent-ffmpeg");



// serve static files from the Vue app
app.use(express.static(__dirname + "/../dist"));

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
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
}); // listen on port 3000

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(9999);
httpsServer.listen(10001);
