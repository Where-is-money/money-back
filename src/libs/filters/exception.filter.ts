import {
  ArgumentsHost,
  Catch,
  ExceptionFilter as NestExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Request, Response } from 'express';

@Catch()
export class ExceptionFilter implements NestExceptionFilter {
  catch(exception: HttpException | Error, host: ArgumentsHost) {
    const error = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'The server is unexpected error.',
    };

    const http = host.switchToHttp();
    const response = http.getResponse<Response>();

    if (exception instanceof HttpException) {
      error.statusCode = exception.getStatus();
      error.message = exception.cause as string;
    } else if (exception instanceof Error) {
      error.message = exception.message;
    }

    console.log(exception);

    response.status(error.statusCode).json({
      data: {
        message: error.message,
      },
    });
  }
}
