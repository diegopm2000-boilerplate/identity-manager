// User.js

const { BaseDomainObj } = require('../../shared/domain/BaseDomainObj');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const NAME_DOMAIN_OBJ = 'User';

const SCHEMA = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  properties: {
    id: { type: 'string', maxLength: 45 },
    loginname: { type: 'string', maxLength: 45 },
    name: { type: 'string', maxLength: 45 },
    surname: { type: 'string', maxLength: 45 },
    email: { type: 'string', maxLength: 45 },
    password: { type: 'string', maxLength: 120 },
  },
  required: ['id', 'loginname', 'name', 'surname', 'email'],
  additionalProperties: false,
};

// //////////////////////////////////////////////////////////////////////////////
// Class Implementation
// //////////////////////////////////////////////////////////////////////////////

class User extends BaseDomainObj {
  constructor(data, schemaValidator) {
    super(data, schemaValidator, SCHEMA, NAME_DOMAIN_OBJ);
  }
}

module.exports = User;
