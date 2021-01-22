// healthcheck.usecase.js

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[healthcheck UseCase]';

let logger;
let presenter;

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

function init(loggerIN, presenterIN) {
  logger = loggerIN;
  presenter = presenterIN;
}

async function healthcheck() {
  // IN
  logger.debug(`${MODULE_NAME}:${healthcheck.name} (IN)  -> no params`);

  // Prepare message result
  const innerResult = { message: 'OK' };
  logger.debug(`${MODULE_NAME}:${healthcheck.name} (MID) -> innerResult: ${JSON.stringify(innerResult)}`);

  // Build & Return result
  const result = presenter.presentObject(innerResult);
  logger.debug(`${MODULE_NAME}:${healthcheck.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

module.exports = {
  init,
  healthcheck,
};
