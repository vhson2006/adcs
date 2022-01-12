import { 
  Column, 
  Entity, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn, 
  DeleteDateColumn,
  OneToMany, 
} from 'typeorm';
import { Redeem } from './redeem.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column()
  public contactName: string;

  @Column()
  public email: string;

  @Column()
  public password: string;
  
  @Column()
  public phone: string;

  @Column()
  public address: string;
  
  @Column()
  public code: string;
  
  @Column()
  public codeNumberLimit: number;

  @Column()
  public codeNumberWarning: number;

  @Column()
  public position: string;
  
  @Column({ default: 0 })
  public invitedQuantity: number;

  @Column({ default: 0 })
  public activedQuantity: number;

  @Column({ nullable: true })
  public forgotToken: string;

  @Column({ nullable: true })
  public resetToken: string;

  @Column({ default: 0 })
  public webSession: number;

  @CreateDateColumn()
  public created!: Date;

  @UpdateDateColumn()
  public updated!: Date;

  @DeleteDateColumn({ nullable: true })
  public deletedAt?: Date;

  @OneToMany(() => Redeem, redeem => redeem.accountId)
  public redeems: Promise<Redeem[]>;
}
