import { Injectable } from '@nestjs/common';
import { Cat } from '../interfaces/cats.interface';

@Injectable()
export class AppService {
  private readonly cats: Cat[] = [];

  getHello(): string {
    return 'Hello World!';
  }

  findByID(id: number): Cat {
    return this.cats[id];
  }

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
