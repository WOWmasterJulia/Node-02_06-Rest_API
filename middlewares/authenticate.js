const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  // const { authenticate = "" } = req.headers;
  // const [bearer, token] = authorization.split(" ");
  const [bearer, token] = req.headers.authorization.split(" ");
  console.log(token);
  
  
  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    // if (!user || !user.token || user.token !== token) {
    if (!user) {
      next(HttpError(401, "No authorized"));
    }
    req.user = user; // запис хто робить запит
    // console.log(user);
    // console.log(req.user);

    next();
  } catch {
    next(HttpError(401, "No authorize"));
  }
};

module.exports = authenticate;
