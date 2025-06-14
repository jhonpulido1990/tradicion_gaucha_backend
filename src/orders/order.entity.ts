import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  Column,
} from 'typeorm';
import { User } from '../users/user.entity';
import { OrderItem } from './order-item.entity';
import { OrderStatus } from './order-status.enum';

export type ShippingAddressSnapshotType = {
  nombreCompleto: string;
  telefono: string;
  telefonoAlternativo?: string;
  email?: string;
  pais: string;
  departamento: string;
  ciudad: string;
  codigoPostal: string;
  direccionLinea1: string;
  direccionLinea2?: string;
  referencia?: string;
  notasEntrega?: string;
};

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.orders, {
    eager: true,
    onDelete: 'CASCADE',
  })
  user: User;

  @OneToMany(() => OrderItem, (item) => item.order, {
    cascade: true,
    eager: true,
  })
  items: OrderItem[];

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @CreateDateColumn()
  createdAt: Date;

  @Column('json', { nullable: true })
  shippingAddressSnapshot: ShippingAddressSnapshotType;
}
