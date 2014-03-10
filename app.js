var express = require("express"),
        app = express(),
        redis = require("redis"),
        client = redis.createClient(6379, "127.0.0.1", {connect_timeout: 2000}),
moment = require('moment');

client.on("ready", function() {
    console.log("Redis client ready");
});
client.on("connect", function() {
    console.log("Redis connected");
});
client.on("error", function(err) {
    console.log("Error " + err);
});
app.use(express.bodyParser());

app.post("/stats/save", function(req, res) {
    /* some server side logic */
    var dd = moment().format("YYYYMMDD");
    var vid = req.body.vid, uid = req.body.uid, action = req.body.a;
    if (vid !== "" && uid !== "" && action !== "") {
        //Increment stats for user:video
        var yearStats = "stats:" + action + ":" + uid + ":" + vid + ":" + moment().format("YYYY");
        var monthStats = "stats:" + action + ":" + uid + ":" + vid + ":" + moment().format("YYYYMM");
        var dailyStats = "stats:" + action + ":" + uid + ":" + vid + ":" + moment().format("YYYYMMDD");
        client.incr(yearStats);
        client.incr(monthStats);
        client.incr(dailyStats);
        
        //Increment stats for user
        var yearStats = "stats:" + action + ":" + uid + ":" + moment().format("YYYY");
        var monthStats = "stats:" + action + ":" + uid + ":" + moment().format("YYYYMM");
        var dailyStats = "stats:" + action + ":" + uid + ":" + moment().format("YYYYMMDD");
        client.incr(yearStats);
        client.incr(monthStats);
        client.incr(dailyStats);
    }
    res.send("OK");
});

app.get("/crossdomain.xml", function(req, res) {
    res.set('Content-Type', 'text/xml').sendfile("crossdomain.xml");
});

/* serves main page */
app.get("/", function(req, res) {
    var dd = moment().format("YYYY-MM-DD HH:mm:ss");
    res.send("Stats server OK<br>" + dd);
});

var port = process.env.PORT || 8112;
app.listen(port, function() {
    console.log("Listening on " + port);
});