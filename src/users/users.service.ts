import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../config/prisma/prisma.service';
import { BcryptService } from '../shared/utils/bcrypt.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private bcrypt: BcryptService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, confirmPassword, ...rest } = createUserDto;
    const user = await this.prisma.user.findUnique({
      where: {
        email: rest.email,
      },
    });

    if (!user) {
      const passwordHash = await this.bcrypt.generateHash(password);
      return await this.prisma.user.create({
        data: {
          ...rest,
          password: passwordHash,
          createdBy: rest.email,
        },
      });
    }

    return 'User exists';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
