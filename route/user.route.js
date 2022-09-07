import express from 'express';
import { validateUser } from '../middlewares/validateUserMiddleware.js';

const router = express.Router();

import {
  getUserList,
  getUserDetails,
  saveNewUser,
  updateUser,
  deleteUser,
} from '../controller/user.controller.js';

router.get('/', getUserList);
router.get('/:userId', getUserDetails);
router.post('/', validateUser, saveNewUser);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);

export { router as userRoute };
