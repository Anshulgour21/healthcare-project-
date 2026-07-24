import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import coursesRouter from './routes/courses.js';
import authRouter from './routes/auth.js';
import modulesRouter from './routes/modules.js';
import topicsRouter from './routes/topics.js';
import assessmentsRouter from './routes/assessments.js';
import enrollmentsRouter from './routes/enrollments.js';
import progressRouter from './routes/progress.js';
import usersRouter from './routes/users.js';
import learningProgressRouter from './routes/learningProgress.js';

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/courses', coursesRouter);
app.use('/api/courses/:courseId/modules', modulesRouter);
app.use('/api/courses/:courseId/modules/:moduleId/topics', topicsRouter);
app.use('/api/courses/:courseId/modules/:moduleId/assessment', assessmentsRouter);
app.use('/api/enrollments', enrollmentsRouter);
app.use('/api/progress', progressRouter);
app.use('/api/users', usersRouter);
app.use('/api', learningProgressRouter);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

export default app;
