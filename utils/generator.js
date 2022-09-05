import randomstring from 'randomstring';

const generateStoreCode = () => {
  return randomstring.generate({
    length: 5,
    charset: 'alphabetic',
    capitalization: 'uppercase',
  });
};

export { generateStoreCode };
