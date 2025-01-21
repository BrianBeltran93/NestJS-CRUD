import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './passport-strategy/access-token.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({})],
  exports: [TypeOrmModule],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy]
})
export class AuthModule {}
