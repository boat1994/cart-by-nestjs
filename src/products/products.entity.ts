import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    unique: true,
  })
  code: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({ default: 0 })
  qty: number;
}
