// BaseDomainObj.js

class BaseDomainObj {
  constructor(data, schemaValidatorInfra, schema, nameDomainObj) {
    // Check data
    const errors = schemaValidatorInfra.validate(data, schema);
    // Build object
    if (errors && errors.length > 0) {
      this.errors = errors;
    } else if (data) {
      Object.keys(data).forEach((x) => {
        this[x] = data[x];
      });
    } else {
      throw new Error(`Error in constructor of ${nameDomainObj}`);
    }
  }
}

module.exports = {
  BaseDomainObj,
};
