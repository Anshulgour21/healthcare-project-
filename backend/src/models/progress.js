import mongoose from 'mongoose';

const topicProgressSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true },
  completed: { type: Boolean, default: true },
  completedAt: { type: Date, default: Date.now }
});

topicProgressSchema.index({ userId: 1, topicId: 1 }, { unique: true });

const assessmentAttemptSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  assessmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessment', required: true },
  score: { type: Number, required: true },
  passed: { type: Boolean, required: true },
  attemptedAt: { type: Date, default: Date.now }
});

const TopicProgress = mongoose.model('TopicProgress', topicProgressSchema);
const AssessmentAttempt = mongoose.model('AssessmentAttempt', assessmentAttemptSchema);

export { TopicProgress, AssessmentAttempt };
