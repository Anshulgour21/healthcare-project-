import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema({
  moduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true },
  title: { type: String, required: true },
  order: { type: Number, required: true },
  contentType: { type: String, enum: ['video','text','interactive'], default: 'text' },
  videoUrl: { type: String },
  textContent: { type: String },
  interactiveData: { type: String },
  durationMinutes: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

const Topic = mongoose.model('Topic', topicSchema);
export default Topic;
