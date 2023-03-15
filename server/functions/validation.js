const { body, validationResult } = require('express-validator');

const email = [
  body('email').trim().not().isEmpty().withMessage('must provide a value'),
  body('email').trim().isEmail().normalizeEmail({all_lowercase: true}).withMessage('must be an email address')
];

const newPassword = [
  body('password').trim().not().isEmpty().withMessage('must provide a value'),
];

const password = [
  ...newPassword,
  body('password').trim().isLength({ min: 5 }).withMessage('must be a minimum of 5 characters')
];

const username = [
  body('username').trim().not().isEmpty().withMessage('must provide a value')
];

const registerValidationRules = () => {
  return [...email,...password,...username];
}

const loginValidationRules = () => {
  return [...email,...newPassword];
}

const updateValidationRules = () => {
  return [
    body('password').exists().withMessage('property must exist in request body. Empty value is acceptable.'),
    body('password').if(body('password').not().isEmpty()).trim().isLength({ min: 5 }).withMessage('must be a minimum of 5 characters'),
    body('username').exists().withMessage('property must exist in request body. Empty value is acceptable.')
  ];
}

const deleteValidationRules = () => {
  return [...email];
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(400).json({
    errors: extractedErrors,
  })
}

module.exports = {
  registerValidationRules,
  loginValidationRules,
  updateValidationRules,
  deleteValidationRules,
  validate
}