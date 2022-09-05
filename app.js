import express from 'express';
import cors from 'cors';
import { mountRoutes } from './route/index.js';

const app = express();

app.use(express.json());
app.use(cors());

// Mount Routes
mountRoutes(app);

const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => console.log(`App Running On Port ${PORT}`));
