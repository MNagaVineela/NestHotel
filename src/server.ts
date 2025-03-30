import express from 'express';
import cors from 'cors';
import statesRouter from './routes/router'; // Import your router
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Routes
app.use('/api/states', statesRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
