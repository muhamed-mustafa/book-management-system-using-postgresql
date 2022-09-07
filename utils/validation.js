import passwordValidator from 'password-validator';
import bcrypt from 'bcryptjs';

let schema = new passwordValidator();

const isValidEmail = (email) => {
  const regEx = /\S+@\S+\.\S+/;
  return regEx.test(email);
};

const comparePassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};

const isValidPassword = (password) => {
  schema
    .is()
    .min(8)
    .is()
    .max(15)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .digits(2)
    .has()
    .not()
    .spaces()
    .is()
    .not()
    .oneOf(['Passw0rd', 'Password123']);

  return schema.validate(password);
};

export { isValidEmail, isValidPassword, comparePassword };
