

var fs = require('fs');
var srcFile = './embed.html';
var destFile = 'embed.min.html';

fs.readFile(srcFile, (err, data) => {
    if(err) return console.error(err);

    var newText = data.toString()
        .replace(/\n/g, '')
        .replace(/\r/g, '');

    fs.writeFile(destFile, newText, (err) => {
        if(err) return console.error(err)
        console.log("success!")

    });
});