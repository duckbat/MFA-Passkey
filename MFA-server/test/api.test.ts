/* eslint-disable @typescript-eslint/no-loss-of-precision */
import mongoose from 'mongoose';
import app from '../src/app';
// const app = 'http://localhost:3000';

describe('GET /api/v1', () => {
  beforeAll(async () => {
    if (!process.env.DB_URL) {
      throw new Error('DB_URL is not defined');
    }
    await mongoose.connect(process.env.DB_URL);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
