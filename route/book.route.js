import express from 'express';
import { validateBook } from '../middlewares/validateBookMiddleware.js';

const router = express.Router();

import {
  getBookList,
  getBookDetails,
  saveBook,
  updateBook,
  deleteBook,
  deleteAllBooks,
} from '../controller/book.controller.js';

router.get('/', getBookList);
router.get('/:bookId', getBookDetails);
router.post('/', validateBook, saveBook);
router.put('/:bookId', updateBook);
router.delete('/:bookId', deleteBook);
router.delete('/', deleteAllBooks);

export { router as bookRoute };
