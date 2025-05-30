const mongoose = require('mongoose');
const { userSchema } = require('../../kuden-web/src/App');

module.exports = mongoose.model('User', userSchema);
