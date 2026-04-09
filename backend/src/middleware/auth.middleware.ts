import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils";
import { Request, Response, NextFunction } from "express";

const protect = (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token,JWT_SECRET);

    //   req.user = decoded;
    console.log({decoded});
    
      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }
};

export default protect;