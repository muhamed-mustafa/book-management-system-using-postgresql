import randomstring from 'randomstring';

const generateStoreCode = () => {
  return randomstring.generate({
    length: 5,
    charset: 'alphabetic',
    capitalization: 'uppercase',
  });
};

const dateFormat = () => {
  return new Date(Date.now()).toLocaleString();
};

export { generateStoreCode, dateFormat };
