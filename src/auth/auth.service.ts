import { Injectable } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { fakeUsers } from "src/data/users";
import { InvalidCredentialsError } from "./errors";
import * as bcrypt from "bcrypt";
import { User } from "src/users/entities/user.entity";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }
    private users: User[] = fakeUsers;

    async login(loginDto: LoginDto) {
        const user = this.users.find(user => user.email === loginDto.email);

        if (!user || !bcrypt.compare(loginDto.password, user.password))
            throw new InvalidCredentialsError();

        const payload = {
            sub: user.id,
            role: user.role
        };

        return { access_token: this.jwtService.sign(payload) };
    }
}
