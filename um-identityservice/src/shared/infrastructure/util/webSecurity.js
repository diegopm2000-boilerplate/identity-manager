// websecurity.js

const helmet = require('helmet');
const hsts = require('hsts'); // Only to force https
const frameguard = require('frameguard'); // Only to force same origin for frames

const log = require('../log/logFacade');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[webSecurity Util]';

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
// //////////////////////////////////////////////////////////////////////////////

exports.init = (app, useHsts) => {
  const funcName = 'init';
  log.debug(`${MODULE_NAME}:${funcName} (IN) --> app: <<app>>, useHsts: ${useHsts}`);

  // 1. Use helmet framework security. View in npm helmet the issues activated by default
  app.use(helmet());

  // 2. Force same origin for frames
  app.use(frameguard({
    action: 'sameorigin',
  }));

  // 3. Force https always
  if (useHsts) {
    app.use(hsts({
      maxAge: 31536000, // 365 days in seconds
    }));
  }

  log.debug(`${MODULE_NAME}:${funcName} (OUT) --> Web Security initialized OK!`);
};
