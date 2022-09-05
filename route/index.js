import { storeRoute } from './store.route.js';
import { bookRoute } from './book.route.js';

const mountRoutes = (app) => {
  app.use('/api/v1/store', storeRoute);
  app.use('/api/v1/book', bookRoute);
};

export { mountRoutes };
