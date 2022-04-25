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

  @Get('id/:item_Id')
  async getItemById(@Param('item_Id', ParseIntPipe) item_Id: number) {
    return this.itemsService.getItemById(item_Id);
  }

  @Get('user/:user_id')
  async getUserItems(@Param('user_id', ParseIntPipe) user_id: number) {
    return this.itemsService.getUserItems(user_id);
  }

  // POST METHODS

  @Post('create')
  @UsePipes(ValidationPipe)
  async createItem(@Body() createItem: ItemDto) {
    const creatorId = createItem.owner;
    const tax = createItem.price * 0.05;
    // making sure user has enough to create an item
    const creator = await this.usersService.findUsersById(creatorId);
    if (creator.token_balance < tax) throw Error('Not enough to add item');

    //updating creators account
    const creatorUpdated = await this.usersService.updateUserBalance(
      creatorId,
      -tax,
    );
    const item = this.itemsService.createItem(createItem);
    return { item, user: creatorUpdated };
  }

  //PUT METHODS

  @Put('id/:id')
  @UsePipes(ValidationPipe)
  async editItem(@Param('id', ParseIntPipe) id: number, @Body() item: ItemDto) {
    if (id !== Number(item.id)) throw Error('Cannot update this item');
    return this.itemsService.editItem(item);
  }

  @Put('transfer/:user_id')
  @UsePipes(ValidationPipe)
  async transferItem(
    @Param('user_id', ParseIntPipe) user_id: number,
    @Body() item: ItemDto,
  ) {
    //making sure the buyer has enough to buy the item
    const buyer = await this.usersService.findUsersById(user_id);
    if (buyer.token_balance < item.price) throw Error('Nice Try xD');

    const taxedValue = item.price - item.price * 0.05;
    //updating the sellers account
    await this.usersService.updateUserBalance(item.owner, taxedValue);

    //updating buyers account
    const updatedBuyer = await this.usersService.updateUserBalance(
      user_id,
      -item.price,
    );

    //transfering the item
    const updatedItem = await this.itemsService.transferItem(item, user_id);

    return { item: updatedItem, user: updatedBuyer };
  }
}
