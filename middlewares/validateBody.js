const { HttpError } = require("../helpers");

// const validateBody = (schema) => {
//   const func = (req, res, next) => {
//     console.log(req.body)
//     const { error } = schema.validate(req.body);
//     const empty = req._body;

//     if (!empty) {
//       next(HttpError(400, "missing fields"));
//     }
//     if (error) {
//       next(HttpError(400, error.message));
//     }
//     next();
//   };
//   return func;
// };
const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) next(HttpError(400, error.message));
    next();
  };

  return func;
};

module.exports = validateBody;