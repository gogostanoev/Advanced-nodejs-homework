import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
    ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOne(username);

    if (user && user.password === password) {
      const { password, ...restProp } = user;

      return restProp;
    }

    return null;
  };

  async login(user: User) {
    const payload = { username: user.username, ID: user.id };

    return {
        access_token: this.jwtService.sign(payload)
    };
  };
}
