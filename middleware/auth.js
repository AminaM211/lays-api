import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json("Unauthorized");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json("Invalid token");
  }
};

export const admin = (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).json("Forbidden");
  next();
};
