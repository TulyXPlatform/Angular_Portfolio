import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Import Routes
import authRoutes from './modules/auth/auth.route';
import settingsRoutes from './modules/settings/settings.route';
import projectRoutes from './modules/projects/projects.route';
import uploadRoutes from './modules/media/upload.route';
import heroRoutes from './modules/hero/hero.route';
import aboutRoutes from './modules/about/about.route';
import experienceRoutes from './modules/experience/experience.route';
import blogRoutes from './modules/blog/blog.route';
import contactRoutes from './modules/contact/contact.route';
import inquiryRoutes from './modules/inquiry/inquiry.route';
import seedAdmin from './config/seed';

dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolioDb', {
  autoIndex: true,
})
.then(async () => {
  console.log('MongoDB connected');
  await seedAdmin();
})
.catch(err => console.error('MongoDB connection error:', err));

// Routes Configuration
app.use('/api/auth', authRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/hero', heroRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/inquiry', inquiryRoutes);

// Additional routes omitted for brevity

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      success: false,
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  } else {
    // Production mode
    if (err.isOperational) {
      res.status(err.statusCode).json({
        success: false,
        status: err.status,
        message: err.message
      });
    } else {
      // Programming or other unknown error: don't leak error details
      console.error('ERROR 💥', err);
      res.status(500).json({
        success: false,
        status: 'error',
        message: 'Something went very wrong!'
      });
    }
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
