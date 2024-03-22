// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Path: /comments
app.get('/comments', function(req, res) {
    // Read comments from file
    fs.readFile('comments.json', 'utf8', function(err, data) {
        if (err) {
            res.status(500).send('Server error');
            return;
        }
        res.send(data);
    });
});

// Path: /comments
app.post('/comments', function(req, res) {
    // Read comments from file
    fs.readFile('comments.json', 'utf8', function(err, data) {
        if (err) {
            res.status(500).send('Server error');
            return;
        }
        var comments = JSON.parse(data);
        var newComment = req.body;
        comments.push(newComment);
        // Write comments to file
        fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
            if (err) {
                res.status(500).send('Server error');
                return;
            }
            res.send('Comment added');
        });
    });
});

var server = app.listen(3001, function() {
    console.log('Server running at http://

