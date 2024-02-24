import app from './app.js';
import { connectDB } from './config/database.js';
import nodeCron from 'node-cron';
import { Stats } from './models/Stats.js';
connectDB();

nodeCron.schedule('0 0 * * * *', async () => {
  try {
    await Stats.create({});
  } catch (error) {
    console.log(error);
  }
});
app.listen(process.env.PORT, () => {
  console.log(`Server is Working on port : ${process.env.PORT || 4000}`);
});
