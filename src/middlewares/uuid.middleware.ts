import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { v4 as uuid } from 'uuid';
import type { Request, Response } from 'express';
import { Context, ContextKey } from '@libs/context';

@Injectable()
export class UUIDMiddleware implements NestMiddleware {
  constructor(private readonly context: Context) {}

  use(req: Request, _: Response, next: NextFunction) {
    const txId = req.get('x-request-id') || uuid();
    this.context.set(ContextKey.TXID, txId);
    next();
  }
}
