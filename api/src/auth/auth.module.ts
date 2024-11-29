import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { ResetCode } from './entities/resetCode.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ResetCode]),
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.TOKEN_SECRET_SECURITY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRE },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
