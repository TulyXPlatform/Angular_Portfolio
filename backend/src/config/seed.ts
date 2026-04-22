import User from '../modules/auth/user.model';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: 'admin' });
    if (adminExists) {
      console.log('Admin user already exists.');
      return;
    }

    const adminUser = new User({
      username: process.env.ADMIN_USERNAME || 'admin',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      role: 'admin'
    });

    await adminUser.save();
    console.log('Admin user seeded successfully.');
  } catch (error) {
    console.error('Error seeding admin user:', error);
  }
};

export default seedAdmin;
