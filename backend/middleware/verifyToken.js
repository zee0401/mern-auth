import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
      error: "No token provided",
    });
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  console.log(req);

  req.userId = decodedToken.userId;
  next();
  try {
  } catch (error) {}
};
