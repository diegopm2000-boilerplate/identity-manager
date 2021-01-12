// schemaValidator.js

const { Validator } = require('jsonschema');

const logger = require('../log/logFacade');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[SchemaValidator]';

// //////////////////////////////////////////////////////////////////////////////
// Public Functions
// //////////////////////////////////////////////////////////////////////////////

exports.validate = (instance, schema) => {
  const funcName = 'validate';
  logger.debug(`${MODULE_NAME}:${funcName} (IN) --> instance: ${JSON.stringify(instance)}, schema: ${JSON.stringify(schema)}`);

  const v = new Validator();

  const validationResult = v.validate(instance, schema);
  logger.debug(`${MODULE_NAME} validate (MID) --> validationResult: ${JSON.stringify(validationResult)}`);

  // Preparing Result
  const result = validationResult.errors.map((x) => `${x.property} --> ${x.message}`);

  logger.debug(`${MODULE_NAME} validate (OUT) --> result: ${JSON.stringify(result)}`);

  return result;
};
