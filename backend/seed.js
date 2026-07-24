import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from './src/models/course.js';
import Module from './src/models/module.js';
import Topic from './src/models/topic.js';
import Assessment from './src/models/assessment.js';

dotenv.config();

const mongo = process.env.MONGODB_URI || 'mongodb://localhost:27017/course-canvas';

async function run() {
  await mongoose.connect(mongo);
  console.log('Connected to', mongo);

  await Course.deleteMany({});
  await Module.deleteMany({});
  await Topic.deleteMany({});
  await Assessment.deleteMany({});

  const course = await Course.create({
    title: 'Intro to JavaScript',
    description: 'Learn the fundamentals of JavaScript.',
    category: 'Programming',
    level: 'beginner',
    thumbnailUrl: '',
  });

  const mod1 = await Module.create({ courseId: course._id, title: 'Basics', description: 'Variables and types', order: 1 });
  const mod2 = await Module.create({ courseId: course._id, title: 'Functions', description: 'Functions and scope', order: 2 });

  await Topic.create({ moduleId: mod1._id, title: 'Variables', order: 1, contentType: 'text', textContent: 'Variables in JS' });
  await Topic.create({ moduleId: mod1._id, title: 'Types', order: 2, contentType: 'text', textContent: 'Primitive types' });

  const assessment = await Assessment.create({ moduleId: mod2._id, passingScore: 60, questions: [
    { text: 'What is typeof 1?', options: ['string','number','boolean'], correctOption: 1, order: 1 }
  ]});

  console.log('Seed data created:', { courseId: course._id, modules: [mod1._id, mod2._id] });
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
