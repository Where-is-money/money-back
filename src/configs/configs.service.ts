import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { type ConnectionOptions } from 'bullmq';
import { type DataSourceOptions } from 'typeorm';

@Injectable()
export class ConfigsService {
  constructor(private readonly config: NestConfigService) {}

  get server() {
    const config = {
      port: this.config.get<string>('SERVER_PORT') || 3000,
    };

    this.checkUndefined(config, 'server');
    return config;
  }

  get mysql() {
    const config: DataSourceOptions = {
      type: 'mysql',
      host: this.config.get<string>('MYSQL_HOST'),
      port: Number(this.config.get<number>('MYSQL_PORT')),
      username: this.config.get<string>('MYSQL_USERNAME'),
      password: this.config.get<string>('MYSQL_PASSWORD'),
      database: this.config.get<string>('MYSQL_DATABASE'),
    };

    this.checkUndefined(config, 'mysql');
    return config;
  }

  get redis() {
    const config: ConnectionOptions = {
      host: this.config.get<string>('REDIS_HOST'),
      port: Number(this.config.get<number>('REDIS_PORT')),
    };

    this.checkUndefined(config, 'redis');
    return config;
  }

  private checkUndefined(config: Record<string, any>, name: string) {
    Object.entries(config).forEach(([key, value]) => {
      if (value === undefined) {
        throw new Error(`The ${name}'s ${key} is not defined.`);
      }
    });
  }
}
