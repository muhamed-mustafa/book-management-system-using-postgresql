import { dbquery } from '../db/connection.js';
import { queryList } from '../db/queries.js';
import { updateBookByID } from '../utils/updateBook.js';

const getBookList = async (_req, res) => {
  try {
    let bookListQuery = queryList.GET_BOOK_LIST_QUERY;
    let result = await dbquery(bookListQuery);
    return res.status(200).json(result.rows);
  } catch (e) {
    return res.status(500).send({ error: 'Failed to get books' });
  }
};

const getBookDetails = async (req, res) => {
  try {
    let { bookId } = req.params;
    let query = await dbquery(
      `SELECT book_id FROM BMS.BOOK WHERE book_id = ${bookId}`
    );

    if (!query.rows.length) {
      return res
        .status(400)
        .json({ message: `there is no books with this id ${bookId}` });
    }

    let bookDetailsQuery = queryList.GET_BOOK_DETAILS_QUERY;
    let result = await dbquery(bookDetailsQuery, [bookId]);

    return res.status(200).json(result.rows[0]);
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
};

const saveBook = async (req, res) => {
  try {
    let createdBy = 'admin',
      createdOn = new Date();

    let { title, description, author, publisher, pages, storeCode } = req.body;

    let query = await dbquery(`SELECT store_code FROM BMS.STORE`);

    let result = Object.values(query.rows).filter((code) => {
      return code.store_code === storeCode;
    });

    if (result.length === 0) {
      return res.status(400).json({
        message: `there is no store with this storeCode ${storeCode}`,
      });
    }

    let values = [
      title,
      description,
      author,
      publisher,
      pages,
      storeCode,
      createdBy,
      createdOn,
    ];

    let saveBookQuery = queryList.SAVE_BOOK_QUERY;
    await dbquery(saveBookQuery, values);

    return res
      .status(201)
      .json({ status: 'OK', message: 'Successfully adding new book' });
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
};

const updateBook = async (req, res) => {
  try {
    let { bookId } = req.params;
    let result = await dbquery(
      `SELECT book_id FROM BMS.BOOK WHERE book_id = ${bookId}`
    );

    if (!result.rows.length) {
      return res
        .status(400)
        .json({ message: `there is no books with this id ${bookId}` });
    }

    let updateBookQuery = updateBookByID(bookId, req.body);

    let data = Object.keys(req.body).map(function (key) {
      return req.body[key];
    });

    await dbquery(updateBookQuery, data);

    return res
      .status(200)
      .json({ status: 'OK', message: 'Successfully update book' });
  } catch (e) {
    console.log(e.message);
    return res.status(500).send({ error: e.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    let { bookId } = req.params;
    if (!bookId) {
      return res.status(400).json({ message: `${bookId} is required` });
    }

    let deleteBookQuery = queryList.DELETE_BOOK_QUERY;
    await dbquery(deleteBookQuery, [bookId]);

    return res
      .status(201)
      .json({ status: 'OK', message: 'Successfully book deleted' });
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
};

const deleteAllBooks = async (req, res) => {
  try {
    let deleteAllBookQuery = queryList.DELETE_ALL_BOOK_QUERY;
    await dbquery(deleteAllBookQuery);

    return res
      .status(201)
      .json({ status: 'OK', message: 'Successfully books deleted' });
  } catch (e) {
    console.log(e.message);
    return res.status(500).send({ error: e.message });
  }
};

export {
  getBookList,
  getBookDetails,
  saveBook,
  updateBook,
  deleteBook,
  deleteAllBooks,
};
