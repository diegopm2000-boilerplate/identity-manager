// logColorLogger.js

const Log = require('log-color');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

let logger;

// //////////////////////////////////////////////////////////////////////////////
// Public Functions
// //////////////////////////////////////////////////////////////////////////////

exports.defaultInit = () => {
  logger = new Log({ level: 'debug', color: true });
};

exports.init = (options) => {
  logger = new Log({ level: options.level, color: true });
};

exports.error = (message) => {
  logger.error(message);
};

exports.warning = (message) => {
  logger.warning(message);
};

exports.info = (message) => {
  logger.info(`${message}`);
};

exports.debug = (message) => {
  logger.debug(message);
};
