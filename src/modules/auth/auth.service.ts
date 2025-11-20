import { UsersService } from '../users/users.service';
import { comparePassword } from '../../utils/password';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../../utils/jwt';
import { RegisterDto } from './dto/RegisterDto';
import { LoginDto } from './dto/LoginDto';

export class AuthService {
  private usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  async register(dto: RegisterDto) {
    const user = await this.usersService.createUser(
      dto.email,
      dto.password,
      dto.role || 'USER'
    );

    const payload = { sub: user.id, role: user.role };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      },
      accessToken,
      refreshToken
    };
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      const err: any = new Error('Invalid credentials');
      err.status = 401;
      throw err;
    }

    const isValid = await comparePassword(dto.password, user.passwordHash);
    if (!isValid) {
      const err: any = new Error('Invalid credentials');
      err.status = 401;
      throw err;
    }

    const payload = { sub: user.id, role: user.role };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      },
      accessToken,
      refreshToken
    };
  }

  async refresh(refreshToken: string) {
    try {
      const payload = verifyRefreshToken(refreshToken);
      const newPayload = { sub: payload.sub, role: payload.role };
      const accessToken = signAccessToken(newPayload);
      const newRefreshToken = signRefreshToken(newPayload);

      return {
        accessToken,
        refreshToken: newRefreshToken
      };
    } catch (err) {
      const error: any = new Error('Invalid refresh token');
      error.status = 401;
      throw error;
    }
  }
}
