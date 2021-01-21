// logFacade.js

const myLogger = require('./logColorLogger');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

let logger;

// //////////////////////////////////////////////////////////////////////////////
// Public Functions
// //////////////////////////////////////////////////////////////////////////////

exports.defaultInit = () => {
  logger = myLogger;
  logger.defaultInit();
};

exports.init = (module, options) => {
  logger = module;
  logger.init(options);
};

exports.error = (message) => {
  logger.error(message);
};

exports.warning = (message) => {
  logger.warning(message);
};

exports.info = (message) => {
  logger.info(` ${message}`);
};

exports.debug = (message) => {
  logger.debug(message);
};
