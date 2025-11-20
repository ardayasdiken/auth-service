import { Repository } from 'typeorm';
import { AppDataSource } from '../../config/data-source';
import { User, UserRole } from './user.entity';
import { hashPassword } from '../../utils/password';

export class UsersService {
  private repo: Repository<User>;

  constructor() {
    this.repo = AppDataSource.getRepository(User);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.repo.findOne({ where: { id } });
  }

  async createUser(email: string, password: string, role: UserRole = 'USER'): Promise<User> {
    const existing = await this.findByEmail(email);
    if (existing) {
      const err: any = new Error('Email already in use');
      err.status = 400;
      throw err;
    }

    const passwordHash = await hashPassword(password);

    const user = this.repo.create({
      email,
      passwordHash,
      role,
      isActive: true
    });

    return this.repo.save(user);
  }
}
