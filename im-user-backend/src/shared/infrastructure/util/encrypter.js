// encrypter.js

const bcrypt = require('bcrypt');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const SALT_ROUNDS = 12;

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.encrypt = (text) => bcrypt.hashSync(text, SALT_ROUNDS);