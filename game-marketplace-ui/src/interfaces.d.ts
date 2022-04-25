export interface IUser {
  id: string;
  username: string;
  email: string;
  token_balance: number;
}

export interface ICreateItem {
  name: string;
  description: string;
  price: number;
  sale: string;
  owner: string;
}

export interface IItem extends ICreateItem {
  item_id: string;
}

export interface IItemTransfer {
  body: IItem;
  id: string;
}

export interface ICredentials {
  email: string;
  password: string;
}

export interface ICreateUser extends ICredentials {
  username: string;
}

export interface IFormItem {
  value: string | number | Date;
  helper: string;
  error: boolean;
}

export interface IAddItem {
  name: FormItem;
  description: FormItem;
  price: FormItem;
  sale: FormItem;
}

export interface IResponseBody {
  item: IItem | IItem[];
  user: IUser;
}
