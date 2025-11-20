import { Router } from 'express';
import { UsersService } from './users.service';
import { authMiddleware, AuthRequest } from '../../middleware/authMiddleware';

export const usersRouter = Router();
const usersService = new UsersService();

// Current user info
usersRouter.get('/me', authMiddleware, async (req: AuthRequest, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const user = await usersService.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json({
    id: user.id,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt
  });
});
