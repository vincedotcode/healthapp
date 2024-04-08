import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    // Check if the authorization header is present
    if (!req.headers.authorization) {
      return res.status(401).json({
        message: "No Authorization header present",
        success: false,
      });
    }

    // Extract the token from the authorization header
    const token = req.headers.authorization.split(" ")[1]; // "Bearer <token>"

    // Check if the token is present after "Bearer"
    if (!token) {
      return res.status(401).json({
        message: "Auth Failed! Token not found.",
        success: false,
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).json({
          message: "Auth Failed! Invalid Token.",
          success: false,
        });
      } else {
        req.body.userId = decode.id;
        next();
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      message: "Auth Failed! Error in processing the token.",
      success: false,
    });
  }
};

export { authMiddleware };
