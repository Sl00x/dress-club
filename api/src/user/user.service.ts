import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  validatePassword(password: string) {
    if (password.length < 8) {
      return 'Le mot de passe doit contenir au moins 8 caractères';
    }
    if (!password.match(/[a-z]/)) {
      return 'Le mot de passe doit contenir au moins une lettre minuscule';
    }
    if (!password.match(/[A-Z]/)) {
      return 'Le mot de passe doit contenir au moins une lettre majuscule';
    }
    return true;
  }

  hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const passwordValidation = this.validatePassword(createUserDto.password);
    if (passwordValidation !== true) {
      throw new BadRequestException(passwordValidation);
    }
    const hashedPassword = await this.hashPassword(createUserDto.password);
    createUserDto.password = hashedPassword;
    const result = await this.userRepository.save(createUserDto);
    delete result.password;
    return result;
  }

  findAll(options?: FindManyOptions<User>) {
    return this.userRepository.find(options);
  }

  findOne(options: string | FindManyOptions<User>) {
    if (typeof options === 'string') {
      return this.userRepository.findOne({ where: { id: options } });
    } else {
      return this.userRepository.findOne(options);
    }
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.userRepository.softDelete(id);
  }

  updateGender(userId: string, genderId: string) {
    return this.userRepository.update(userId, { genderId });
  }
}
