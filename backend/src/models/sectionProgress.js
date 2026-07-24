import mongoose from 'mongoose';

const sectionProgressSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  courseId: { type: String, required: true },
  moduleId: { type: String, required: true },
  sectionId: { type: String, required: true },
  status: {
    type: String,
    enum: ['locked', 'unlocked', 'completed'],
    default: 'locked',
  },
  videoProgress: { type: Number, default: 0 },
  videoPositionSeconds: { type: Number, default: 0 },
  completedAt: { type: Date },
}, { timestamps: true });

sectionProgressSchema.index({ userId: 1, courseId: 1, sectionId: 1 }, { unique: true });

const assessmentResultSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  courseId: { type: String, required: true },
  assessmentId: { type: String, required: true },
  sectionId: { type: String },
  score: { type: Number, required: true },
  passed: { type: Boolean, required: true },
  answers: { type: mongoose.Schema.Types.Mixed },
  breakdown: { type: mongoose.Schema.Types.Mixed },
  submittedAt: { type: Date, default: Date.now },
}, { timestamps: true });

assessmentResultSchema.index({ userId: 1, assessmentId: 1, sectionId: 1 });

export const SectionProgress = mongoose.model('SectionProgress', sectionProgressSchema);
export const AssessmentResult = mongoose.model('AssessmentResult', assessmentResultSchema);
