import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { ResetCode } from './entities/resetCode.entity';

interface TokenPayload {
  sub: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectRepository(ResetCode)
    private readonly resetCodeRepository: Repository<ResetCode>,
  ) {}

  async signIn(authDto: AuthDto): Promise<any> {
    const { email, password } = authDto;
    const user = await this.userService.findOne({
      where: { email },
      select: ['id', 'password'],
    });
    if (!user) throw new BadRequestException('bad_credentials');
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      throw new BadRequestException('bad_credentials');
    }

    const payload = { sub: user.id } as TokenPayload;
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  // async sendResetPasswordEmail(user: User) {
  //   const code = Math.floor(100000 + Math.random() * 900000).toString();
  //   await this.resetCodeRepository.softDelete({ userId: user.id });
  //   await this.resetCodeRepository.save({ code, userId: user.id });
  //   try {
  //     await this.mailerService.sendMail({
  //       to: user.email,
  //       subject: 'Trigo BT - Réinitialisation du mot de passe',
  //       template: 'forgotPassword',
  //       context: {
  //         firstName: user.firstname,
  //         lastName: user.lastname,
  //         code,
  //         codeValidity: Number(process.env.PASSWORD_RESET_CODE_EXPIRE),
  //       },
  //     });
  //   } catch (e) {
  //     console.log(e);
  //     throw new InternalServerErrorException();
  //   }
  // }

  // async validateResetCode(email: string, code: string) {
  //   const resetCode = await this.resetCodeRepository.findOne({
  //     where: { user: { email }, code },
  //   });
  //   if (!resetCode) throw new BadRequestException();
  //   return resetCode;
  // }

  // async resetPassword(email: string, code: string, password: string) {
  //   const resetCode = await this.validateResetCode(email, code);
  //   const passwordValidation = this.userService.validatePassword(password);
  //   if (passwordValidation !== true) {
  //     throw new BadRequestException(passwordValidation);
  //   }
  //   await this.resetCodeRepository.softDelete(resetCode.id);
  //   const hashedPassword = await this.userService.hashPassword(password);
  //   await this.userService.update(resetCode.userId, {
  //     password: hashedPassword,
  //   });
  //   return true;
  // }
}
