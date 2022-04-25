import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { CreateUserDto, UserCredentialsDto } from 'src/users/dto/users.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const newUser = await this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  async validateUser(userCredentials: UserCredentialsDto) {
    const user = await this.userRepository.findOne({
      email: userCredentials.email,
    });
    if (user.password === userCredentials.password) return user;
    return null;
  }

  async getUsers() {
    return await this.userRepository.find();
  }

  async findUsersById(id: number) {
    return await this.userRepository.findOne(id);
  }

  async updateUserBalance(id: number, balance: number) {
    await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ token_balance: () => `token_balance + ${balance}` })
      .where('id = :id', { id })
      .execute();

    return await this.userRepository.findOne(id);
  }
}
