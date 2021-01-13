// user.remote.repository.js

const axios = require('axios');

const log = require('../../../../shared/infrastructure/log/logFacade');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[userRemote Repository]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.getByLoginname = async (loginname, endpoint) => {
  const funcName = 'getByFilter';
  log.debug(`${MODULE_NAME}:${funcName} (IN) -> loginname: ${loginname}`);

  const querystring = `loginname=${loginname}`;

  const innerAxiosData = await axios.get(`${endpoint}?${querystring}`);
  const innerResult = innerAxiosData.data;
  log.debug(`${MODULE_NAME}:${funcName} (MID) -> innerResult: ${JSON.stringify(innerResult)}`);

  // Build Result
  let result;
  if (Array.isArray(innerResult) && innerResult.length > 0) {
    result = innerResult.find((x) => x.loginname === loginname);
  }

  log.debug(`${MODULE_NAME}:${funcName} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
};
