import express from 'express';
import cors from 'cors';
import { v1Router } from './infrastructure/http/routes/v1/v1.routes';
import { initializeDatabase } from './typeorm-setup';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
// TODO: Setup corsOptions for production
app.use(express.json(), cors());

initializeDatabase().then(() => {
  app.get('/', (req, res) => {
    res.send({ message: 'Hello API' });
  });

  app.use("/api/v1", v1Router);

  app.listen(port, host, () => {
    console.log(`[ ready ] http://${host}:${port}`);
  });
});
