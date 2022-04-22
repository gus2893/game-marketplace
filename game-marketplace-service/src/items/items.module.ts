import { Module } from '@nestjs/common';
import { ItemsController } from './controllers/items/items.controller';
import { ItemsService } from './services/items/items.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item, User } from 'src/typeorm';
import { UsersService } from 'src/users/services/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Item, User])],
  controllers: [ItemsController],
  providers: [ItemsService, UsersService],
})
export class ItemsModule {}
