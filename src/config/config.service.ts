import { config as setConfig } from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AlgoliaModuleOptions } from '@modules/algolia/algolia-module-options';

setConfig();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT'), 10),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),

      entities: ['dist/src/**/**.js'],
      migrations: ['dist/src/migration/*.js'],
      keepConnectionAlive: true,

      migrationsTableName: 'migration',

      cli: {
        migrationsDir: 'src/migration',
      },

      ssl: this.isProduction(),
    };
  }

  // TODO: Add GraphQL config

  public getAlgoliaConfig(): AlgoliaModuleOptions {
    return {
      applicationId: this.getValue('ALGOLIA_APP_ID'),
      apiKey: this.getValue('ALGOLIA_API_KEY'),
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
  'ALGOLIA_APP_ID',
  'ALGOLIA_API_KEY',
]);

export { configService };
