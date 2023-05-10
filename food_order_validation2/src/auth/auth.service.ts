import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { UsertDto } from 'src/users/dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { RefreshDto } from 'src/users/dto/refreshtoken.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) { }

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOne(username);

    const passwordValidation = bcrypt.compareSync(password, user.password);

    if (user && passwordValidation) {
      const { password, ...restProp } = user;

      return restProp;
    }

    return null;
  }

  // async login(user: User) {
  //   const payload = { username: user.username, ID: user.id, role: user.role };

  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // };

  async login(user: UsertDto): Promise<{ access_token: string; refresh_token: string }> {

    const userFound = await this.userRepository.findOne({
      where: { username: user.username }
    });

    console.log(userFound)
    const payload = { username: userFound.username, id: userFound.id };
    const access_token = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d', secret: 'refresh_token_secret' });

    userFound.refresh_token.push(refresh_token);
    await this.userRepository.save(userFound);

    return { access_token, refresh_token };
  };


  async register(userDto: UsertDto) {
    const userInfo = {
      username: userDto.username,
      password: bcrypt.hashSync(userDto.password, 12),
      role: userDto.role,
      refresh_token: []
    };

    const ID = await this.userService.save(userInfo);
    return ID;
  };

  async refreshTokens(refreshToken: RefreshDto): Promise<{ access_token: string; refresh_token: string }> {

    const decoded = this.jwtService.verify(refreshToken.token, { secret: 'refresh_token_secret' });
    const payload = { username: decoded.username, id: decoded.id };

    const access_token = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d', secret: 'refresh_token_secret' });

    const user = await this.userRepository.findOne({
      where: { id: payload.id }
    });

    user.refresh_token = user.refresh_token.filter(t => t !== refreshToken.token);
    user.refresh_token.push(refresh_token);
    await this.userRepository.save(user);

    return { access_token, refresh_token }
  }


  async logout(refreshToken: RefreshDto) {
    const decodedUser = this.jwtService.verify(refreshToken.token, { secret: 'refresh_token_secret' });

    const user = await this.userRepository.findOne({
      where: {id: decodedUser.ID}
    });

    user.refresh_token = user.refresh_token.filter(t => t !== refreshToken.token);
    await this.userRepository.save(user);

    return `Successfully logged out ${refreshToken.token}`;
  }
}
