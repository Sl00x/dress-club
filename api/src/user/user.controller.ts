import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthenticatedRequest } from 'interfaces/request.interface';
import { Public } from 'src/auth/auth.constant';
import { GenderService } from 'src/gender/gender.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateGenderDto } from './dto/gender.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly genderService: GenderService,
  ) {}

  @Post()
  @Public()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Patch('/gender')
  @ApiBearerAuth('jwt')
  updateGender(
    @Req() req: AuthenticatedRequest,
    @Body() updateGenderDto: UpdateGenderDto,
  ) {
    return this.userService.updateGender(req.user.id, updateGenderDto.genderId);
  }

  @Get('/gender')
  @ApiBearerAuth('jwt')
  async getGender(@Req() req: AuthenticatedRequest) {
    const user = await this.userService.findOne(req.user.id);
    if (!user.genderId) throw new BadRequestException('No gender set for user');
    return this.genderService.findOne(user.genderId);
  }

  @Get()
  @ApiBearerAuth('jwt')
  getMe(@Req() req: AuthenticatedRequest) {
    return this.userService.findOne(req.user.id);
  }
}
