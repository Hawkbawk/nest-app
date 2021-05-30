import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CatsService } from '../services/cats.service';
import { CreateCatDto } from '../dtos/create-cat.dto';
import { Cat } from '../interfaces/cats.interface';

@Controller('cats')
export class CatsController {
  constructor(private readonly catService: CatsService) {}

  @Post('create')
  async create(@Body() createCatDto: CreateCatDto) {
    return this.catService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catService.findAll();
  }

  @Get(':id')
  findByID(@Param('id') id: string): Cat {
    const convertedID = parseInt(id);
    if (Number.isNaN(convertedID)) {
      throw new HttpException('Invalid id.', HttpStatus.FORBIDDEN);
    }
    const cat = this.catService.findByID(convertedID);
    if (cat === undefined) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    } else {
      return this.catService.findByID(parseInt(id));
    }
  }
}
