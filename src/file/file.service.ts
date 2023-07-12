import { Injectable } from '@nestjs/common';
import { FileStore } from '@tus/file-store';
import { Metadata, Server } from '@tus/server';
import { Request, Response } from 'express';

@Injectable()
export class FileService {
  private readonly tusServer = new Server({
    path: '/files/upload',
    datastore: new FileStore({ directory: './storage' }),
    namingFunction: (req: Request) => {
      // 'upload-metadata': 'filename YmVyYmVyYmVyLm00YQ==,filetype YXVkaW8veC1tNGE=',
      const { 'upload-metadata': uploadMetadata } = req.headers;
      const { filename } = Metadata.parse(uploadMetadata as string);
      return filename;
    },
  });

  async handleUpload(request: Request, response: Response) {
    return this.tusServer.handle(request, response);
  }
}
