import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['single-choice', 'multiple-select', 'true-false', 'match-the-following', 'match-following', 'ordering', 'scenario', 'short-answer'],
    default: 'single-choice',
  },
  text: { type: String, required: true },
  scenario: { type: String },
  options: { type: [String], default: [] },
  pairs: { type: [mongoose.Schema.Types.Mixed], default: [] },
  choices: { type: [String], default: [] },
  items: { type: [String], default: [] },
  correctOption: { type: Number },
  correctAnswer: { type: mongoose.Schema.Types.Mixed },
  correctOptions: { type: [String], default: undefined },
  explanation: { type: String },
  order: { type: Number, default: 0 }
});

const assessmentSchema = new mongoose.Schema({
  moduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true, unique: true },
  passingScore: { type: Number, default: 70 },
  questions: { type: [questionSchema], default: [] }
});

const Assessment = mongoose.model('Assessment', assessmentSchema);
export default Assessment;
