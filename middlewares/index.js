const controllerSync = require('./controllerSync');
const validation = require('./valid');
const upload = require('./upload');
const authenticate = require('./authenticate');

module.exports = {
  controllerSync,
  validation,
  authenticate,
  upload,
};
