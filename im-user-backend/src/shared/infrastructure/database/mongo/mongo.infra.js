// mongo.infra.js

const mongoose = require('mongoose');

const log = require('../../log/logFacade');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[Mongo Infra]';
const disconnectTimeOut = 20;

// //////////////////////////////////////////////////////////////////////////////
// PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

let options;
let connected = false;

// //////////////////////////////////////////////////////////////////////////////
// PRIVATE FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

const buildDBURI = () => `${options.mongoURL}`;

const delayedConnection = (time) => new Promise((resolve) => {
  log.debug(`${MODULE_NAME} ${delayedConnection.name} (IN) -> time: ${time}`);
  setTimeout(() => {
    exports.connect()
      .then(() => {
        resolve(true);
      });
  }, time);
});

const tryToReconnectIfNeccesary = () => {
  log.debug(`${MODULE_NAME} ${tryToReconnectIfNeccesary.name} (IN) -> Entering...`);
  if (options.reconnectTime > 0) {
    log.debug(`${MODULE_NAME} ${tryToReconnectIfNeccesary.name} (OUT) -> Launching delayedConnection`);
    return delayedConnection(options.reconnectTime);
  }

  log.debug(`${MODULE_NAME} ${tryToReconnectIfNeccesary.name} (OUT) -> delayedConnection NOT launched`);

  return false;
};

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

exports.isConnected = () => connected;

exports.connect = async () => {
  const funcName = 'connect';
  try {
    log.debug(`${MODULE_NAME}:${funcName} (IN) -> Entering...`);

    if (!connected) {
      const dbURI = buildDBURI();
      log.debug(`${MODULE_NAME}:${funcName} (MID) -> Trying to connect to mongodb using dbURI: ${dbURI}`);

      await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

      log.debug(`${MODULE_NAME}:${funcName} (OUT) --> Executed, returning true`);
      return true;
    }

    log.debug(`${MODULE_NAME}:${funcName} (OUT) -> Existing connection to mongodb, returning true`);
    return (true);
  } catch (error) {
    log.error(`${MODULE_NAME}:${funcName} (ERROR) -> Error: ${error.message}`);
    throw (error);
  }
};

exports.disconnect = async () => {
  const funcName = 'disconnect';
  try {
    log.debug(`${MODULE_NAME}:${funcName} (IN) -> Entering in disconnect`);
    if (exports.isConnected()) {
      mongoose.connection.close();

      setTimeout(() => {
        log.debug(`${MODULE_NAME}:${funcName} (OUT) -> Executed, returning false`);
        return true;
      }, disconnectTimeOut);
    }
    log.debug(`${MODULE_NAME}:${funcName} (OUT) --> Connection not was established, returning false`);
    return true;
  } catch (error) {
    log.error(`${MODULE_NAME}:${funcName} (ERROR) -> Error: ${error.message}`);
    throw (error);
  }
};

exports.init = async (mongoOptions) => {
  options = mongoOptions;
  const result = await exports.connect();
  return result;
};

// //////////////////////////////////////////////////////////////////////////////
// CONNECTION EVENTS
// //////////////////////////////////////////////////////////////////////////////

// When successfully connected
mongoose.connection.on('connected', () => {
  log.debug(`${MODULE_NAME} (Event on connected) -> Connection Open!`);
  connected = true;
});

// Event launched when the connection throws an error
mongoose.connection.on('error', (err) => {
  log.error(`${MODULE_NAME} (Event on error) -> Mongoose default connection error: ${err}`);
  connected = false;

  return tryToReconnectIfNeccesary();
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  log.info(`${MODULE_NAME} (Event on disconnected) -> Mongoose default connection disconnected`);

  // Only try to reconnect if the connected is true. Doubt to when the connection is disconnected,
  // the event disconnected and error are launched. We only want to try the reconnect one time.
  if (connected) {
    connected = false;
    log.info(`${MODULE_NAME} (Event on disconnected) (MID) -> Going to tryToReconnectIfNeccesary`);
    return tryToReconnectIfNeccesary();
  }

  return false;
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  log.info(`${MODULE_NAME} (Event on process.SIGINT) -> Exiting from process`);
  exports.disconnect()
    .then(() => {
      log.info(`${MODULE_NAME} (Event on process.SIGINT) --> Mongoose default connection disconnected through app termination`);
      process.exit(0);
    });
});
