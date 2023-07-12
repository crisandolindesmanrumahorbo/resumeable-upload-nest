import { All, Controller, Req, Res } from '@nestjs/common';
import { FileService } from './file.service';
import { Request, Response } from 'express';

@Controller('files/*')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @All()
  async upload(@Req() request: Request, @Res() response: Response) {
    this.fileService.handleUpload(request, response);
  }
}
