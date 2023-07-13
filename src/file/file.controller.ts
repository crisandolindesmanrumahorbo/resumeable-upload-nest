import {
  Controller,
  Delete,
  Head,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { FileService } from './file.service';

@Controller('files/*')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Patch()
  async upload(@Req() request: Request, @Res() response: Response) {
    return this.fileService.handle(request, response);
  }

  @Post()
  async initialize(@Req() request: Request, @Res() response: Response) {
    return this.fileService.handleInitiate(request, response);
  }

  @Head()
  async checkChunk(@Req() request: Request, @Res() response: Response) {
    return this.fileService.handle(request, response);
  }

  @Delete()
  async delete(@Req() request: Request, @Res() response: Response) {
    return this.fileService.handle(request, response);
  }
}
