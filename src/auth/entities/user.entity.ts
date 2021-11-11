import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 8 })
  uid!: string;

  @Column({ type: 'char', length: 60 })
  password!: string;

  @Column({ type: 'varchar', length: 5 })
  nickname!: string;
}
