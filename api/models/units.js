var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var UnitSchema = new mongoose.Schema({
  classAssignment: {
    type: ObjectId,
    ref: 'Class',
    required: true
  },
  adminCreator: {
    type: ObjectId,
    ref: 'Admin',
    required: true
  },
  title: {
      type: String,
      required: true,
  },
  description: {
      type: String,
      required: false,
  }
});

UnitSchema.pre('save', function (next) {
  console.log("pre-save complete");
  next();
});

var Unit = mongoose.model('Unit', UnitSchema);
module.exports = Unit;