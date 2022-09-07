const validateUser = (req, res, next) => {
  const fields = ['username', 'password', 'email', 'fullname'];

  fields.forEach((field) => {
    if (!req.body[field]) {
      return res.status(400).json({ message: `${field} is required` });
    }
  });

  next();
};

export { validateUser };
