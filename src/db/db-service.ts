import { PrismaClient } from '@prisma/client';
import { injectable } from 'inversify';

/**
 * Abstract db Client inside prisma
 */
@injectable()
export class DBService {
  _prismaInstance = null;

  constructor() {
    if (!this._prismaInstance) {
      console.log('Prisma Instane created');
      this._prismaInstance = new PrismaClient({});
    }
  }

  get client(): PrismaClient {
    return this._prismaInstance;
  }
}
