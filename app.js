var express = require("express"),
        app = express(),
        redis = require("redis"),
        client = redis.createClient(),
        moment = require('moment');

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router); 

app.post("/stats/save", function(req, res) {
    console.log(req.body);
    /* some server side logic */
    /*var dd = moment().format("YYYYMMDD");
     var vid = req.body.vid, uid = req.body.uid, action = req.body.a;
     var yearStats = "stats:"+action+":"+uid+":"+vid+":"+moment().format("YYYY");
     var monthStats = "stats:"+action+":"+uid+":"+vid+":"+moment().format("YYYYMM");
     var dailyStats = "stats:"+action+":"+uid+":"+vid+":"+moment().format("YYYYMMDD");
     client.incr(yearStats);
     client.incr(monthStats);
     client.incr(dailyStats);*/
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