import { PrimaryGeneratedColumn } from 'typeorm';

export class AbstarctEntity<T> {
  @PrimaryGeneratedColumn()
  id: number;

  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}
