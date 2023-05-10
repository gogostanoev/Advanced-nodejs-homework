import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { RolesGuard } from 'src/common/role-guard/roles.guards';

@Module({
  imports: [UsersModule, JwtModule.register({
    secret: 'hardcoded_secret',
    signOptions: { expiresIn: '60s' }
  }),
  TypeOrmModule.forFeature([UserEntity])],
  providers: [AuthService, LocalStrategy, JwtStrategy, RolesGuard],
  exports: [AuthService]
})
export class AuthModule {}
