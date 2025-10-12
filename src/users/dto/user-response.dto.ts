import { User } from '../entities/user.entity';

export class UserResponseDto {
  id: number;
  email: string;
  name: string;
  role: string;

  static fromEntity(user: User): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }
}
