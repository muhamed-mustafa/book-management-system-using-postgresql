import { storeRoute } from './store.route.js';
import { bookRoute } from './book.route.js';
import { userRoute } from './user.route.js';

const mountRoutes = (app) => {
  app.use('/api/v1/store', storeRoute);
  app.use('/api/v1/book', bookRoute);
  app.use('/api/v1/user', userRoute);
};

export { mountRoutes };
