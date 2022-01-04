import { 
  Column, 
  Entity, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn, 
  DeleteDateColumn,
  JoinColumn,
  ManyToOne, 
} from 'typeorm';
import { Account } from './account.entity';

@Entity({name: "redeem"})
export class Redeem {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToOne(() => Account, account => account.id, {
    eager: true
  })
  @JoinColumn({ name: "accountId" })
  public accountId: string;

  @Column()
  public redeemCode: string;

  @Column()
  public fromFirstName: string;

  @Column()
  public fromLastName: string;

  @Column()
  public toFirstName: string;

  @Column()
  public toLastName: string;
  
  @Column()
  public toPhone: string;

  @Column({ default: 0 })
  public status: number;

  @CreateDateColumn()
  public created!: Date;

  @UpdateDateColumn()
  public updated!: Date;

  @DeleteDateColumn({ nullable: true })
  public deletedAt?: Date;
}
