var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var ClassSchema = new mongoose.Schema({
  adminCreator: {
    type: ObjectId,
    ref: 'Admin',
    required: true
  },
  title: {
      type: String,
      required: true
  },
  description: {
      type: String,
      required: false,
  },
});

ClassSchema.pre('save', function (next) {
  console.log("pre-save complete");
  next();
});

var Class = mongoose.model('Class', ClassSchema);
module.exports = Class;