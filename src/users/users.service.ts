import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { fakeUsers } from "src/data/users";
import { AlreadyExistsError, NotFoundError } from "src/common/errors";
import { UserResponseDto } from "./dto/user-response.dto";

@Injectable()
export class UsersService {
  private users: User[] = fakeUsers;

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const existingUser = this.users.find(u => u.email.toLowerCase() === createUserDto.email.toLowerCase() && !u.archived);

    if (existingUser)
      throw new AlreadyExistsError("User", `${createUserDto.email}`, "email");

    const newUser: User = {
      id: this.users.length + 1,
      ...createUserDto,
      archived: false,
    };

    this.users.push(newUser);

    return UserResponseDto.fromEntity(newUser);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = this.users.filter(user => !user.archived);
    return users.map(user => UserResponseDto.fromEntity(user));
  }

  async findOne(id: number): Promise<UserResponseDto> {
    const userEntity = this.users.find(user => user.id === id && !user.archived);

    if (!userEntity)
      throw new NotFoundError("User", String(id));

    return UserResponseDto.fromEntity(userEntity);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    const userEntity = await this.users.find(user => user.id === id && !user.archived);

    if (!userEntity)
      throw new NotFoundError("User", String(id));

    const existingUser = this.users.find(u => updateUserDto.email && u.email.toLowerCase() === updateUserDto.email.toLowerCase() && !u.archived && u.id !== id);

    if (existingUser)
      throw new AlreadyExistsError("User", `${updateUserDto.email}`, "email");

    Object.assign(userEntity, updateUserDto);

    return UserResponseDto.fromEntity(userEntity);
  }

  async remove(id: number): Promise<void> {
    const userEntity = this.users.find(user => user.id === id && !user.archived);

    if (!userEntity)
      throw new NotFoundError("User", String(id));

    userEntity.archived = true;
  }
}
