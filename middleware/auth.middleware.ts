import jwt from "jsonwebtoken";
import User from "../models/User.model";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as jwt.Secret) as {
      email: string;
    };

    console.log("token", decoded);

    const user = await User.findOne({ email: decoded.email });

    console.log("user", user);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Extend Request type to include user property
    interface RequestWithUser extends Request {
      user?: typeof user;
    }
    (req as RequestWithUser).user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const isAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  interface RequestWithUser extends Request {
    user?: {
      role?: string;
    };
  }
  console.log("req", (req as RequestWithUser).user);
  const user = (req as RequestWithUser).user;

  if (!user || user.role !== "ADMIN") {
    return res
      .status(401)
      .json({ message: "Unauthorized To Access This Route" });
  }

  next();
};
