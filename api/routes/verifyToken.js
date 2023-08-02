const jwt = require("jsonwebtoken");
const { createError } = require("../error");

const verifyToken = (req, res, next) => {
  // Take from headers field just as we send things in body field.
  // console.log(req.headers);
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    // console.log(token);
    jwt.verify(token, process.env.JWT, (err, user) => {
      if (err) return next(createError(403, "Token is not Valid!"));
      req.user = user;
      // Will leave his function and then will continue from over route.
      next();
    });
  } else {
    return res.status(401).json("You are not Authenticated!");
    // console.log("in else");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) next();
    else res.status(403).json("You are not allowed to do that!");
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) next();
    else res.status(403).json("You are not allowed to do that!");
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
