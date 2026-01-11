import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { WorkspacesModule } from './modules/workspaces/workspaces.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { NotebooksModule } from './modules/notebooks/notebooks.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { UvzModule } from './modules/uvz/uvz.module';
import { ChartersModule } from './modules/charters/charters.module';
import { OperationsModule } from './modules/operations/operations.module';
import { FunnelsModule } from './modules/funnels/funnels.module';
import { AutomationsModule } from './modules/automations/automations.module';
import { AiModule } from './modules/ai/ai.module';

import { databaseConfig } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    TypeOrmModule.forRootAsync(databaseConfig),
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minute
        limit: 100, // 100 requests per minute
      },
    ]),
    
    // Feature modules
    AuthModule,
    UsersModule,
    WorkspacesModule,
    ProjectsModule,
    NotebooksModule,
    DocumentsModule,
    UvzModule,
    ChartersModule,
    OperationsModule,
    FunnelsModule,
    AutomationsModule,
    AiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
