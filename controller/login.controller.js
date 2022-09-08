import { dbquery } from '../db/connection.js';
import { queryList } from '../db/queries.js';
import { LoggerService } from '../services/logger.service.js';
import { comparePassword } from '../utils/validation.js';
import { generateToken } from '../utils/jwt.js';

const logger = new LoggerService('login.controller');

const getUserProfile = (req, res) => {
  try {
    return res.status(200).send({ user: req.user });
  } catch (err) {
    logger.error(`${err.message}`);
    return res.status(500).send(`${err.message}`);
  }
};

const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send('username , password are required');
    }

    let loginQuery = queryList.LOGIN_QUERY;
    let query = await dbquery(loginQuery, [username]);
    let result = query.rows[0];

    if (!result) {
      logger.error(`${username} not exists`);
      return res.status(401).send(`${username} not exists`);
    }

    let isPasswordValid = comparePassword(password, result.password);

    if (!isPasswordValid) {
      logger.error('Invalid password');
      return res.status(401).send('Invalid password');
    }

    let token = generateToken(result.user_id, result.email);
    console.log(token);
    return res.status(200).send({ status: 200, user: result, token: token });
  } catch (err) {
    logger.error(
      'Failed to SignIn , Invalid username or password' + JSON.stringify(err)
    );
    return res.status(500).send({ error: err.message });
  }
};

export { getUserProfile, signIn };
