import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'item_id',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
  })
  name: string;

  @Column({
    nullable: false,
    default: '',
  })
  description: string;

  @Column({
    nullable: true,
    type: 'decimal',
  })
  price: number;

  @Column({
    type: 'bigint',
    nullable: false,
    default: 0,
  })
  sale: number;

  @Column({
    type: 'bigint',
    nullable: false,
  })
  owner: number;
}
