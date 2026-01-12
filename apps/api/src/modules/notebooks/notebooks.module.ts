import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotebooksService } from './notebooks.service';
import { NotebooksController } from './notebooks.controller';
import { Notebook } from '../../database/entities/notebook.entity';
import { Document } from '../../database/entities/document.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notebook, Document]),
  ],
  controllers: [NotebooksController],
  providers: [NotebooksService],
  exports: [NotebooksService],
})
export class NotebooksModule {}
