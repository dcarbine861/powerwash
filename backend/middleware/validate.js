// middleware/validate.js
// Reusable middleware that checks for express-validator errors
// and returns a 400 response if any are found.
// Always use this as the last middleware in a validation chain.

const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Return the first error message for simplicity
    const firstError = errors.array()[0].msg;
    return res.status(400).json({ success: false, message: firstError });
  }

  next();
};

module.exports = validate;
