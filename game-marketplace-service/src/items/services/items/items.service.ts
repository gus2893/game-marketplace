import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemDto } from 'src/items/dto/ItemDto.dto';
import { Item } from 'src/typeorm';
import { UsersService } from 'src/users/services/users/users.service';
import { Repository, MoreThan } from 'typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>, // private readonly userService: UsersService,
  ) {}

  async createItem(createItem: ItemDto) {
    const newItem = await this.itemRepository.create(createItem);
    return this.itemRepository.save(newItem);
  }

  async getItems() {
    return await this.itemRepository.find();
  }

  async getItemsForSale() {
    return await this.itemRepository.find({
      where: {
        sales_expiry: MoreThan(0),
      },
      //We would add pagination here
      take: 20,
    });
  }

  async getUserItems(user_id: number) {
    return await this.itemRepository.findAndCount({
      where: {
        owner: user_id,
      },
      //We would add pagination here
      take: 20,
    });
  }

  async editItem(item: ItemDto) {
    return await this.itemRepository.save(item);
  }

  async transferItem(item: ItemDto, id: number) {
    return await this.itemRepository.save({
      ...item,
      owner: id,
      price: 0,
      sales_expiry: 0,
    });
  }
}
