import {
  Body,
  Controller,
  Get,
  Put,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ItemDto } from 'src/items/dto/ItemDto.dto';
import { ItemsService } from 'src/items/services/items/items.service';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('items')
export class ItemsController {
  constructor(
    private readonly itemsService: ItemsService,
    private readonly usersService: UsersService,
  ) {}

  // GET METHODS

  @Get()
  async getItems() {
    return this.itemsService.getItems();
  }

  @Get('sale')
  async getItemsSale() {
    return this.itemsService.getItemsForSale();
  }

  @Get('user/:id')
  async getUserItems(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.getUserItems(id);
  }

  // POST METHODS

  @Post('create')
  @UsePipes(ValidationPipe)
  async createItem(@Body() createItem: ItemDto) {
    return this.itemsService.createItem(createItem);
  }

  //PUT METHODS

  @Put('id/:id')
  @UsePipes(ValidationPipe)
  async editItem(@Param('id', ParseIntPipe) id: number, @Body() item: ItemDto) {
    if (id !== item.id) throw Error('Cannot update this item');
    return this.itemsService.editItem(item);
  }

  @Put('transfer/:user_id')
  @UsePipes(ValidationPipe)
  async transferItem(
    @Param('user_id', ParseIntPipe) user_id: number,
    @Body() item: ItemDto,
  ) {
    // SHOULD CHECK IF USER HAS ENOUGH BALANCE BEFORE PERFORMING THIS OPERATIONS
    // WILL BE CHECKED IN THE FRONT END FOR NOW
    await this.usersService.updateUserBalance(item.owner, item.price);
    const buyer = await this.usersService.updateUserBalance(
      user_id,
      -item.price,
    );
    const updatedItem = await this.itemsService.transferItem(item, user_id);
    return { item: updatedItem, user: buyer };
  }
}
