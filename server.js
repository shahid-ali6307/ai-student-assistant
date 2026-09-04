import dotenv from 'dotenv';
import express from 'express';
import aiRoutes from './routes/ai.routes.js';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/ai',aiRoutes);

app.listen(process.env.PORT || 5000, () => {
    console.log("the server is running....");
});