import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
//const router = require('./router/index');
import router from './router/index.js';

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`server started in on port = ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
