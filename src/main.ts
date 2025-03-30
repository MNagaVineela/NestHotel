import express, { Express } from 'express';
import statesRouter from './routes/router';

async function bootstrap() {
  const app: Express = express();

  // Middleware
  app.use(express.json());

  // Mount the router
  app.use('/api/states', statesRouter);

  // Start the server
  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
}
bootstrap();
