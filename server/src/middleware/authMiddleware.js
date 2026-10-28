import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function requireAuth(req, res, next) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Please log in." });
    }

    const token = authorization.slice("Bearer ".length);
    const tokenData = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(tokenData.sub);

    if (!user) {
      return res.status(401).json({ message: "Account not found." });
    }

    req.user = user;
    next();
  } catch {
    return res.status(401).json({
      message: "Your login token is invalid or expired.",
    });
  }
}

export function allowRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "You do not have permission to access this.",
      });
    }

    next();
  };
}

export async function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  // No token means this request is from a guest.
  if (!authHeader) {
    return next();
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Invalid authorization header." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.sub);

    if (!user) {
      return res.status(401).json({ message: "Account not found." });
    }

    req.user = user;
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
}
