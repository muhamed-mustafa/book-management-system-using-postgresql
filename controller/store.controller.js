import { dbquery } from '../db/connection.js';
import { queryList } from '../db/queries.js';
import { generateStoreCode } from '../utils/generator.js';
import { LoggerService } from '../services/logger.service.js';

const logger = new LoggerService('book.controller');

const getStoreList = async (_req, res) => {
  try {
    let storeListQuery = queryList.GET_STORE_LIST_QUERY;
    let result = await dbquery(storeListQuery);
    logger.info('Store list query', result.rows);
    return res.status(200).json(result.rows);
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
};

const saveStore = async (req, res) => {
  try {
    let createdBy = 'admin',
      createdOn = new Date();

    let { storeName, address } = req.body;
    if (!storeName || !address) {
      logger.error('store name and address are required , can not empty');
      return res
        .status(500)
        .send({ error: 'store name and address are required , can not empty' });
    }

    let storeCode = generateStoreCode();
    let values = [storeName, storeCode, address, createdBy, createdOn];
    let saveStoreQuery = queryList.SAVE_STORE_QUERY;
    await dbquery(saveStoreQuery, values);

    logger.info('Successfully store created');
    return res
      .status(201)
      .json({ status: 'OK', message: 'Successfully store created' });
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
};

export { getStoreList, saveStore };
