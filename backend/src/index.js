import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app.js';

dotenv.config();

const port = process.env.PORT || 3000;
const mongo = process.env.MONGODB_URI || 'mongodb://localhost:27017/course-canvas';

mongoose.connect(mongo, { dbName: process.env.DB_NAME || 'course-canvas' })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => console.log(`Server listening on ${port}`));
  })
  .catch(err => {
    console.error('Mongo connection error', err);
    process.exit(1);
  });
