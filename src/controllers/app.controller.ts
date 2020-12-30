import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from '../services/app.service';
import { CreateCatDto } from '../dtos/create-cat.dto';
import { Cat } from '../interfaces/cats.interface';

@Controller('cats')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('create')
  async create(@Body() createCatDto: CreateCatDto) {
    return this.appService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.appService.findAll();
  }

  @Get(':id')
  findByID(@Param('id') id: string): Cat {
    const convertedID = parseInt(id);
    if (Number.isNaN(convertedID)) {
      throw new HttpException('Invalid id.', HttpStatus.FORBIDDEN);
    }
    const cat = this.appService.findByID(convertedID);
    if (cat === undefined) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    } else {
      return this.appService.findByID(parseInt(id));
    }
  }
}
