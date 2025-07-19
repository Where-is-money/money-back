import { applyDecorators, Type } from '@nestjs/common';
import { ApiResponse, getSchemaPath } from '@nestjs/swagger';

interface ApiStandardResponseOptions {
  type: Type<unknown>;
  isArray?: boolean;
  description?: string;
  status?: number;
}

export function ApiStandardResponse(options: ApiStandardResponseOptions) {
  const { type, isArray = false, description = 'Success', status = 200 } = options;

  const dataSchema = isArray
    ? {
        type: 'object',
        properties: {
          items: {
            type: 'array',
            items: { $ref: getSchemaPath(type) },
          },
          total: { type: 'number' },
        },
      }
    : { $ref: getSchemaPath(type) };

  return applyDecorators(
    ApiResponse({
      status,
      description,
      schema: {
        type: 'object',
        properties: {
          data: dataSchema,
        },
      },
    })
  );
}
