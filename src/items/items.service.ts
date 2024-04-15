import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
// import { UpdateItemDto } from './dto/update-item.dto';
import { EntityManager, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateItemDto } from './dto/update-item.dto';
import { Listing } from './entities/listing.entity';
//import { CreateCommentDto } from './dto/create-comment-dto';
import { Comment } from './entities/comment.entity';
import { Tag } from './entities/tag.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
    private readonly enitityManager: EntityManager,
  ) {}
  // eslint-disable-next-line prettier/prettier
  
  async create(createItemDto: CreateItemDto) {
    const listing = new Listing({
      ...createItemDto.listing,
      rating: 0,
    });
    const tags = createItemDto.tags.map(
      (createTagDto) => new Tag(createTagDto),
    );
    const item = new Item({
      ...createItemDto,
      comment: [],
      tags,
      listing,
    });
    await this.enitityManager.save(item);
  }

  async findAll() {
    return this.itemsRepository.find();
  }

  async findOne(id: number) {
    const item = this.itemsRepository.findOne({
      where: { id },
      //getting both ths item and listening
      relations: { listing: true, comment: true, tags: true },
    });
    if (!item) {
      throw new Error('[ITEM NOT FOUND]');
    }
    return item;
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    await this.enitityManager.transaction(async (enitityManager) => {
      const item = await this.itemsRepository.findOneBy({ id });
      item.public = updateItemDto.public;
      const comments = updateItemDto.comment.map(
        (createCommentDto) => new Comment(createCommentDto),
      );
      item.comment = comments;
      await enitityManager.save(item);
      throw new Error();
      const tagContent = `${Math.random()}`;
      const tag = new Tag({ content: tagContent });
      await enitityManager.save(tag);
    });
  }

  async remove(id: number) {
    await this.itemsRepository.delete(id);
  }
}
