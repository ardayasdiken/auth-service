import { Router } from 'express';
import { AuthService } from './auth.service';
import { validateRequest } from '../../middleware/validateRequest';
import { RegisterDto } from './dto/RegisterDto';
import { LoginDto } from './dto/LoginDto';

export const authRouter = Router();
const authService = new AuthService();

authRouter.post('/register', validateRequest(RegisterDto), async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

authRouter.post('/login', validateRequest(LoginDto), async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

authRouter.post('/refresh', async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: 'refreshToken is required' });
    }
    const result = await authService.refresh(refreshToken);
    res.json(result);
  } catch (err) {
    next(err);
  }
});
