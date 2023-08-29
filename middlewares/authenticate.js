const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  // console.log(req.headers.authorization);
  // if (!req.headers.authorization) {
  //   next(HttpError(401, "Not authorization"));
  //   return;
  // }
  // const [bearer, token] = req.headers.authorization.split(" ");
  // console.log(token);

  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized"));
  }
  // || !token
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    // console.log(id);
    const user = await User.findById(id);
    // console.log(user);
    // if (!user || !user.token || user.token !== token) {
    if (!user) {
      next(HttpError(401, "No authorized"));
    }
    req.user = user; // запис хто робить запит

    next();
  } catch {
    next(HttpError(401, "No authorize"));
  }
};

module.exports = authenticate;
