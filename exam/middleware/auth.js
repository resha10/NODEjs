import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.redirect("/login");

  try {
    const decoded = jwt.verify(token, "SECRET123");
    req.user = decoded;
    next();
  } catch (err) {
    return res.redirect("/login");
  }
};
