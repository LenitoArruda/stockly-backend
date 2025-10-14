import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { User } from 'src/users/entities/user.entity';

export class LoginResponseDto {
  access_token: string;
  user: UserResponseDto;

  static fromEntity(user: User, token: string): LoginResponseDto {
    return {
      access_token: token,
      user: UserResponseDto.fromEntity(user),
    };
  }
}
