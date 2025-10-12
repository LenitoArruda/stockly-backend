import { Injectable } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { fakeUsers } from "src/data/users";
import { InvalidCredentialsError } from "./errors";
import * as bcrypt from "bcrypt";
import { User } from "src/users/entities/user.entity";
import { JwtService } from "@nestjs/jwt";
import { LoginResponseDto } from "./dto/login-response.dto";

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }
    private users: User[] = fakeUsers;

    async login(loginDto: LoginDto): Promise<LoginResponseDto> {
        const user = this.users.find(user => user.email === loginDto.email);

        if (!user || !(await bcrypt.compare(loginDto.password, user.password)))
            throw new InvalidCredentialsError();

        const payload = {
            sub: user.id,
            role: user.role
        };

        return { access_token: this.jwtService.sign(payload) };
    }
}
