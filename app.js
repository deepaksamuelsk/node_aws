var config = require('./config');
var port = process.env.PORT || 3000;
var val = require('./validation/validation');
var AWS = require('aws-sdk');
var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
const bodyParser = require('body-parser');
app.use(bodyParser.json({ extended: true }))

AWS.config.update({
    region: config.Kinesis.region,
    accessKeyId: config.Kinesis.accessKeyId,
    secretAccessKey: config.Kinesis.secretAccessKey
});

app.post('/t', function (req, res) {

    var resContent = {
        "status": "",
        "response": "",
    }

    try {
        var firehose = new AWS.Firehose();
        var bodyContent = JSON.stringify(req.body);       
        res.contentType = "application/json";
        var params = {
            DeliveryStreamName: config.Kinesis.streamname,
            Record: {
                Data: bodyContent
            }
        };
        firehose.putRecord(params, function (err, data) {
                if (err) {
                    resContent.status = "Error in Kinesis api";
                    resContent.response = err;
                }
                else {
                    resContent.status = "Ok";
                    resContent.response = data;
                }
                res.send(resContent);
            });      
    }
    catch (ex) {
        resContent.status = "Error";
        resContent.response = ex;
        res.send(resContent);
    }
});

app.listen(port, function (err) {
    if (err) {
        console.log(err)
    }
    console.log('Server started...')
})