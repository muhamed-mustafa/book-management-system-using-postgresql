import express from 'express';
import cors from 'cors';
import { mountRoutes } from './route/index.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert { type: 'json' };

const app = express();

app.use(express.json());
app.use(cors());

// Mount Routes
mountRoutes(app);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => console.log(`App Running On Port ${PORT}`));

export { app };
