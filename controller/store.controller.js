import { dbquery } from '../db/connection.js';
import { queryList } from '../db/queries.js';
import { generateStoreCode } from '../utils/generator.js';

const getStoreList = async (_req, res) => {
  try {
    let storeListQuery = queryList.GET_STORE_LIST_QUERY;
    let result = await dbquery(storeListQuery);
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
      return res
        .status(500)
        .send({ error: 'store name and address are required , can not empty' });
    }

    let storeCode = generateStoreCode();
    let values = [storeName, storeCode, address, createdBy, createdOn];
    let saveStoreQuery = queryList.SAVE_STORE_QUERY;
    await dbquery(saveStoreQuery, values);

    return res
      .status(201)
      .json({ status: 'OK', message: 'Successfully store created ' });
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
};

export { getStoreList, saveStore };
