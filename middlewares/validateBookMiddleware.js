const validateBook = (req, res, next) => {
  const fields = [
    'title',
    'description',
    'author',
    'publisher',
    'pages',
    'storeCode',
  ];

  fields.forEach((field) => {
    if (!req.body[field]) {
      return res.status(400).json({ message: `${field} is required` });
    }
  });

  next();
};

export { validateBook };
