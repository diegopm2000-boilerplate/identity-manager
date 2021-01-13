// jwtManager.js

const jwt = require('jwt-simple');
const moment = require('moment');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS & PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

const HS256 = 'HS256';
const H384 = 'HS384';
const HS512 = 'HS512';

let tokenSecret;
let tokenExpirationTime; // in seconds
let tokenAlgorithm;

// TODO Add easy support to RS512 (certificate required)

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

const init = (secret, expirationTime, algorithm) => {
  tokenSecret = secret;
  tokenExpirationTime = expirationTime;
  tokenAlgorithm = algorithm;
};

const create = (data) => {
  const payload = {
    sub: data,
    iat: moment().unix(),
    exp: moment().add(tokenExpirationTime, 'seconds').unix(),
  };

  return jwt.encode(payload, tokenSecret, tokenAlgorithm);
};

const check = (token) => jwt.decode(token, tokenSecret, tokenAlgorithm);

const refresh = (token) => {
  const payload = jwt.decode(token, tokenSecret, tokenAlgorithm);
  payload.iat = moment().unix();
  payload.exp = moment().add(tokenExpirationTime, 'seconds').unix();
  return jwt.encode(payload, tokenSecret, tokenAlgorithm);
};

const getData = (token) => jwt.decode(token, tokenSecret, tokenAlgorithm).sub;

module.exports = {
  HS256,
  H384,
  HS512,
  init,
  create,
  check,
  refresh,
  getData,
};
