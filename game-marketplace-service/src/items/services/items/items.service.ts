import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemDto } from 'src/items/dto/ItemDto.dto';
import { Item } from 'src/typeorm';
import { Repository } from 'typeorm';

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

  async getItemById(id: number) {
    return await this.itemRepository.findOne(id);
  }

  async getItemsForSale() {
    const now = Date.now();
    return await this.itemRepository
      .createQueryBuilder()
      .select('*')
      .where('sale > :now', { now })
      .orderBy('sale')
      .execute();
  }

  async getUserItems(user_id: number) {
    return await this.itemRepository
      .createQueryBuilder()
      .select('*')
      .where('owner = :user_id', { user_id })
      .orderBy('sale')
      .execute();
  }

  async editItem(item: ItemDto) {
    return await this.itemRepository.save(item);
  }

  //update on condition
  // async update() {
  //   const t = await this.itemRepository
  //     .createQueryBuilder()
  //     .update(Item)
  //     .set()
  //     .where('')
  //     .execute();
  //   return;
  // }

  async transferItem(item: ItemDto, id: number) {
    return await this.itemRepository.save({
      ...item,
      owner: id,
      price: 0,
      sale: 0,
    });
  }
}
