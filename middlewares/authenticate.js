const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authenticate = "" } = req.headers;
  const [bearer, token] = authenticate.split(" ");
  console.log(token);
  
  console.log(req.user);
  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(HttpError(401, "No authorized"));
    }
    req.user = user; // запис хто робить запит
    console.log(user);
    next();
  } catch {
    next(HttpError(401, "No authorize"));
  }
};

module.exports = authenticate;
