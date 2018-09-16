var Logging = require('./winston');
var message = {
    level: 'info',
    message: 'Hello distributed log files!'
  };

  Logging.log(message);
  Logging.info('sdf');
  Logging.error(message);
  Logging.warn(message);
