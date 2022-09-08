import { dbquery } from '../db/connection.js';
import { queryList } from '../db/queries.js';
import { updateHelperByID } from '../utils/update-helper.js';
import { LoggerService } from '../services/logger.service.js';
import { dateFormat } from '../utils/generator.js';
import { auditActionList } from '../audit/auditAction.js';
import { prepareAudit } from '../audit/audit.service.js';
import { isValidEmail, isValidPassword } from '../utils/validation.js';
import bcrypt from 'bcryptjs';

const logger = new LoggerService('book.controller');

const getUserList = async (_req, res) => {
  try {
    let auditOn = dateFormat();
    let userListQuery = queryList.GET_USER_LIST_QUERY;
    let result = await dbquery(userListQuery);

    logger.info('Users list query', result.rows);
    prepareAudit(
      auditActionList.GET_USER_LIST,
      result.rows,
      200,
      null,
      'Admin',
      auditOn
    );

    return res.status(200).json(result.rows);
  } catch (e) {
    prepareAudit(
      auditActionList.GET_USER_LIST,
      null,
      500,
      JSON.stringify(e.message),
      'Admin',
      dateFormat()
    );
    return res.status(500).send({ error: e.message });
  }
};

const getUserDetails = async (req, res) => {
  try {
    let { userId } = req.params;

    let query = await dbquery(
      `SELECT user_id FROM BMS.APP_USER WHERE user_id = ${userId}`
    );

    if (!query.rows.length) {
      logger.error(`there is no users with this id ${userId}`);
      return res
        .status(400)
        .json({ message: `there is no users with this id ${userId}` });
    }

    let userDetailsQuery = queryList.GET_USER_DETAILS_QUERY;
    let result = await dbquery(userDetailsQuery, [userId]);

    logger.info(`return specific user with id ${userId}`, result.rows[0]);
    return res.status(200).json(result.rows[0]);
  } catch (e) {
    logger.error(`${e.message}`);
    return res.status(500).send({ error: e.message });
  }
};

const saveNewUser = async (req, res) => {
  try {
    let createdOn = new Date();

    let { username, password, email, fullname } = req.body;

    let isUserExistsQuery = queryList.IS_USER_EXISTS_QUERY;
    let result = await dbquery(isUserExistsQuery, [username, email]);

    if (result.rows[0].count !== '0') {
      return res.status(500).send({ error: 'User already Exists' });
    }

    if (!isValidEmail(email)) {
      return res.status(500).send({ error: 'Email is not valid' });
    }

    if (!isValidPassword(password)) {
      return res.status(500).send({ error: 'Password is not valid' });
    }

    let hashedPassword = await bcrypt.hash(password, 10);
    let values = [username, hashedPassword, email, fullname, createdOn];

    let saveUserQuery = queryList.SAVE_USER_QUERY;
    await dbquery(saveUserQuery, values);

    logger.info(`Successfully adding new user`);
    return res
      .status(201)
      .json({ status: 'OK', message: 'Successfully adding new user' });
  } catch (e) {
    logger.error(`${e.message}`);
    return res.status(500).send({ error: e.message });
  }
};

const updateUser = async (req, res) => {
  try {
    let { userId } = req.params;
    let result = await dbquery(
      `SELECT user_id FROM BMS.APP_USER WHERE user_id = ${userId}`
    );

    if (!result.rows.length) {
      logger.error(`there is no books with this id ${userId}`);
      return res
        .status(400)
        .json({ message: `there is no books with this id ${userId}` });
    }

    let updateUserQuery = updateHelperByID(
      userId,
      req.body,
      'BMS.APP_USER',
      'user_id'
    );

    let data = Object.keys(req.body).map(function (key) {
      return req.body[key];
    });

    await dbquery(updateUserQuery, data);
    logger.info(`Successfully update user with id ${userId}`);

    return res
      .status(200)
      .json({ status: 'OK', message: 'Successfully update user' });
  } catch (e) {
    console.log(e.message);
    return res.status(500).send({ error: e.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    let { userId } = req.params;
    let query = await dbquery(
      `SELECT user_id FROM BMS.APP_USER WHERE user_id = ${userId}`
    );

    if (!query.rows.length) {
      logger.error(`there is no users with this id ${userId}`);
      return res
        .status(400)
        .json({ message: `there is no users with this id ${userId}` });
    }

    let deleteUserQuery = queryList.DELETE_USER_QUERY;
    await dbquery(deleteUserQuery, [userId]);

    logger.info(`Successfully deleted user with id ${userId}`);
    return res
      .status(201)
      .json({ status: 'OK', message: 'Successfully deleted user' });
  } catch (e) {
    logger.error(`${e.message}`);
    return res.status(500).send({ error: e.message });
  }
};

export { getUserList, getUserDetails, saveNewUser, updateUser, deleteUser };
