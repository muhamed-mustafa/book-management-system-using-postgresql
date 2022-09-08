import express from 'express';
import { validateUser } from '../middlewares/validateUserMiddleware.js';
import { verifyToken } from '../utils/jwt.js';

const router = express.Router();

import {
  getUserList,
  getUserDetails,
  saveNewUser,
  updateUser,
  deleteUser,
} from '../controller/user.controller.js';

import { getUserProfile, signIn } from '../controller/login.controller.js';

router.get('/', getUserList);
router.get('/:userId', getUserDetails);
router.post('/', validateUser, saveNewUser);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);
router.post('/login', signIn);
router.get('/profile/:userId', verifyToken, getUserProfile);

export { router as userRoute };
