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

// Additional routes omitted for brevity

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ success: false, status, message });
});

export default app;
