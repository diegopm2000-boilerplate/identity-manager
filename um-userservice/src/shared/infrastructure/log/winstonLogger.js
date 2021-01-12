// winstonLogger.js

const { createLogger, format, transports } = require('winston');
const winstonTimestampColorize = require('winston-timestamp-colorize');
const moment = require('moment');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

let logger;

const myFormat = format.printf((info) => `[${info.timestamp}] ${info.level} ${info.message}`);

// //////////////////////////////////////////////////////////////////////////////
// Private Functions
// //////////////////////////////////////////////////////////////////////////////

const init = (level) => createLogger({
  level,
  colorize: true,
  format: format.combine(
    format((info) => {
      info.level = info.level.toUpperCase(); // eslint-disable-line no-param-reassign
      info.timestamp = moment().format('YYYY-MM-DD hh:mm:ss Z').trim(); // eslint-disable-line no-param-reassign
      return info;
    })(),
    format.colorize(),
    format.timestamp(),
    winstonTimestampColorize({ color: 'yellow' }),
    myFormat,
  ),
  transports: [
    new transports.Console({ level: 'debug' }),
  ],
});

// //////////////////////////////////////////////////////////////////////////////
// Public Functions
// //////////////////////////////////////////////////////////////////////////////

exports.defaultInit = () => {
  logger = init('debug');
};

exports.init = (options) => {
  logger = init(options.level);
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
