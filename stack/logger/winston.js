
var winston = require('winston');

module.exports = winston.createLogger({
    level: 'info',
 //   format: winston.format.simple(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: 'TodaysLog.log'
        })
    ]
});
