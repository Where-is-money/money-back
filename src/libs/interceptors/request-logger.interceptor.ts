import {
  type CallHandler,
  type ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { type Observable, tap } from 'rxjs';
import type { Request } from 'express';

@Injectable()
export class RequestLoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();
    const request = http.getRequest<Request>();

    const { method, url } = request;
    const startTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        console.log(`[Request] ${method} - ${url} (${Date.now() - startTime}ms)`);
      })
    );
  }
}
