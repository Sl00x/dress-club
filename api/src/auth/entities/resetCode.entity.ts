import { ApiProperty } from '@nestjs/swagger'
import { User } from 'src/user/entities/user.entity'

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class ResetCode {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty()
  @Column()
  code: string

  @ManyToOne(() => User)
  user: User

  @ApiProperty()
  @Column()
  userId: string

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date

  @ApiProperty()
  @DeleteDateColumn()
  deleted_at: Date
}
