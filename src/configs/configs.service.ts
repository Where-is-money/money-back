import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

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

  private checkUndefined(config: Record<string, any>, name: string) {
    Object.entries(config).forEach(([key, value]) => {
      if (value === undefined) {
        throw new Error(`The ${name}'s ${key} is not defined.`);
      }
    });
  }
}
