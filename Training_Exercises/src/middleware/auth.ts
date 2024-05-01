import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export function authenticateAdmin(req: Request, res: Response, next: NextFunction) {
  // Get the JWT token from the request header
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded: any = jwt.verify(token, `${process.env.JWT_SECRET}`);

    if (!decoded.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Only admin users are allowed.' });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
}
