var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var QuestionSchema = new mongoose.Schema({
  unitAssignment: {
    type: ObjectId,
    ref: 'Unit',
    required: true
  },
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
  text: {
      type: String,
      required: true,
  },
  answer: {
      type: String,
      required: false,
  },
  units: {
      type: String,
      required: false,
  },
  leadingQuestions: [
    {    
        question: {
            type: String,
            required: false,
        },
        option: [
            {
                answer: String,
                correct: Boolean,
            }
        ],
    }
  ]
});



QuestionSchema.pre('save', function (next) {
  console.log("pre-save complete");
  next();
});

var Question = mongoose.model('Question', QuestionSchema);
module.exports = Question;