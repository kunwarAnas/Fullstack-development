import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export interface _Request extends Request {
  userId?: number
}

export async function authenticateAdmin(req: _Request, res: Response, next: NextFunction) {
  // Get the JWT token from the request header
  const token = req.header('Authorization') || req.headers.cookie?.split('Token=')[1]

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.', status: 401 });
  }

  try {
    const decoded: any = jwt.verify(token, `${process.env.JWT_SECRET}`);

    if (!decoded.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Only admin users are allowed.' });
    }

    req.userId = decoded.userId

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
}
