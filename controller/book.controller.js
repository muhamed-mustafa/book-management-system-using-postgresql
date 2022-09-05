import { dbquery } from '../db/connection.js';
import { queryList } from '../db/queries.js';
import { updateHelperByID } from '../utils/update-helper.js';
import { LoggerService } from '../services/logger.service.js';
import { dateFormat } from '../utils/generator.js';
import { auditActionList } from '../audit/auditAction.js';
import { prepareAudit } from '../audit/audit.service.js';

const logger = new LoggerService('book.controller');

const getBookList = async (_req, res) => {
  try {
    let auditOn = dateFormat();
    let bookListQuery = queryList.GET_BOOK_LIST_QUERY;
    let result = await dbquery(bookListQuery);

    logger.info('Book list query', result.rows);
    prepareAudit(
      auditActionList.GET_BOOK_LIST,
      result.rows,
      200,
      null,
      'Admin',
      auditOn
    );

    return res.status(200).json(result.rows);
  } catch (e) {
    prepareAudit(
      auditActionList.GET_BOOK_LIST,
      null,
      500,
      JSON.stringify(e.message),
      'Admin',
      auditOn
    );
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
      logger.error(`there is no books with this id ${bookId}`);
      return res
        .status(400)
        .json({ message: `there is no books with this id ${bookId}` });
    }

    let bookDetailsQuery = queryList.GET_BOOK_DETAILS_QUERY;
    let result = await dbquery(bookDetailsQuery, [bookId]);

    logger.info(`return specific book with id ${bookId}`, result.rows[0]);
    return res.status(200).json(result.rows[0]);
  } catch (e) {
    logger.error(`${e.message}`);
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
      logger.error(`there is no store with this storeCode ${storeCode}`);
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

    logger.info(`Successfully adding new book`);
    return res
      .status(201)
      .json({ status: 'OK', message: 'Successfully adding new book' });
  } catch (e) {
    logger.error(`${e.message}`);
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
      logger.error(`there is no books with this id ${bookId}`);
      return res
        .status(400)
        .json({ message: `there is no books with this id ${bookId}` });
    }

    let updateBookQuery = updateHelperByID(
      bookId,
      req.body,
      'BMS.BOOK',
      'book_id'
    );

    let data = Object.keys(req.body).map(function (key) {
      return req.body[key];
    });

    await dbquery(updateBookQuery, data);
    logger.info(`Successfully update book with id ${bookId}`);

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
    let query = await dbquery(
      `SELECT book_id FROM BMS.BOOK WHERE book_id = ${bookId}`
    );

    if (!query.rows.length) {
      logger.error(`there is no books with this id ${bookId}`);
      return res
        .status(400)
        .json({ message: `there is no books with this id ${bookId}` });
    }

    let deleteBookQuery = queryList.DELETE_BOOK_QUERY;
    await dbquery(deleteBookQuery, [bookId]);

    logger.info(`Successfully book deleted with id ${bookId}`);
    return res
      .status(201)
      .json({ status: 'OK', message: 'Successfully book deleted' });
  } catch (e) {
    logger.error(`${e.message}`);
    return res.status(500).send({ error: e.message });
  }
};

const deleteAllBooks = async (req, res) => {
  try {
    let deleteAllBookQuery = queryList.DELETE_ALL_BOOK_QUERY;
    await dbquery(deleteAllBookQuery);

    logger.info(`Successfully deleted All Books`);
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
