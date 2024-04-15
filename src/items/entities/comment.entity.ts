import { AbstarctEntity } from 'src/database/abstract.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Item } from './item.entity';

@Entity()
export class Comment extends AbstarctEntity<Comment> {
  @Column()
  content: string;

  @ManyToOne(() => Item, (item) => item.comment)
  item: Item;
}
