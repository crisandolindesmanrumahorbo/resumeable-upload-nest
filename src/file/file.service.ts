import { Injectable } from '@nestjs/common';
import { FileStore } from '@tus/file-store';
import { Metadata, Server } from '@tus/server';
import { Request, Response } from 'express';
import { existsSync, mkdirSync } from 'fs';

@Injectable()
export class FileService {
  getMetadata = (req: Request) => {
    const { 'upload-metadata': uploadMetadata } = req.headers;
    return Metadata.parse(uploadMetadata as string);
  };

  private readonly tusServer = new Server({
    path: '/files/upload',
    datastore: new FileStore({ directory: './storage' }),
    namingFunction: (req: Request) => {
      const { roomCode, fileType, filename } = this.getMetadata(req);
      return `${roomCode}/${fileType}/${filename}`;
    },
  });

  async handle(request: Request, response: Response) {
    return this.tusServer.handle(request, response);
  }

  async handleInitiate(request: Request, response: Response) {
    const { roomCode, fileType } = this.getMetadata(request);
    const dir = `/Users/20058748/Documents/personal/twilio/tus.io/nest-server/storage/${roomCode}/${fileType}/`;
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    return this.tusServer.handle(request, response);
  }
}
