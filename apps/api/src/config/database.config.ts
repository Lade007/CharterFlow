import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../database/entities/user.entity';
import { Workspace } from '../database/entities/workspace.entity';

export const databaseConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
    const isDevelopment = configService.get<string>('NODE_ENV') === 'development';
    
    if (isDevelopment) {
      // Use SQLite for development
      return {
        type: 'sqlite',
        database: ':memory:',
        entities: [User, Workspace],
        synchronize: true,
        logging: true,
      };
    }
    
    // Use PostgreSQL for production
    return {
      type: 'postgres',
      host: configService.get<string>('DATABASE_HOST', 'localhost'),
      port: configService.get<number>('DATABASE_PORT', 5432),
      username: configService.get<string>('DATABASE_USERNAME', 'charterflow'),
      password: configService.get<string>('DATABASE_PASSWORD', 'charterflow_dev'),
      database: configService.get<string>('DATABASE_NAME', 'charterflow'),
      entities: [User, Workspace],
      synchronize: configService.get<string>('NODE_ENV') === 'development',
      logging: configService.get<string>('NODE_ENV') === 'development',
      migrations: ['dist/migrations/*.js'],
      migrationsRun: configService.get<string>('NODE_ENV') === 'development',
    };
  },
};
