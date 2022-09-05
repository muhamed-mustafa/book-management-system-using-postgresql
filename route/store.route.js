import express from 'express';

const router = express.Router();

import { getStoreList, saveStore } from '../controller/store.controller.js';

router.get('/', getStoreList);
router.post('/', saveStore);

export { router as storeRoute };
