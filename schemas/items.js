var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const schema = new Schema({
  name    : String,
  status  : String,
  ordering: Number,
 
});

module.exports = mongoose.model('items', schema);