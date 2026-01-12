import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notebook } from '../../database/entities/notebook.entity';
import { Document } from '../../database/entities/document.entity';
import { CreateNotebookDto } from './dto/create-notebook.dto';
import { UpdateNotebookDto } from './dto/update-notebook.dto';

@Injectable()
export class NotebooksService {
  constructor(
    @InjectRepository(Notebook)
    private notebooksRepository: Repository<Notebook>,
    @InjectRepository(Document)
    private documentsRepository: Repository<Document>,
  ) {}

  async create(userId: string, createNotebookDto: CreateNotebookDto): Promise<Notebook> {
    const notebook = this.notebooksRepository.create({
      ...createNotebookDto,
      userId,
    });
    return this.notebooksRepository.save(notebook);
  }

  async findAll(userId: string): Promise<Notebook[]> {
    return this.notebooksRepository.find({
      where: { userId, isActive: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, userId: string): Promise<Notebook> {
    const notebook = await this.notebooksRepository.findOne({
      where: { id, userId, isActive: true },
    });

    if (!notebook) {
      throw new NotFoundException(`Notebook with ID ${id} not found`);
    }

    return notebook;
  }

  async update(id: string, userId: string, updateNotebookDto: UpdateNotebookDto): Promise<Notebook> {
    const notebook = await this.findOne(id, userId);
    
    if (!notebook) {
      throw new NotFoundException(`Notebook with ID ${id} not found`);
    }

    Object.assign(notebook, updateNotebookDto);
    return this.notebooksRepository.save(notebook);
  }

  async remove(id: string, userId: string): Promise<void> {
    const notebook = await this.findOne(id, userId);
    
    if (!Notebook) {
      throw new NotFoundException(`Notebook with ID ${id} not found`);
    }

    // Soft delete
    notebook.isActive = false;
    await this.notebooksRepository.save(notebook);
  }

  async getDocuments(notebookId: string, userId: string): Promise<Document[]> {
    // First verify user owns the notebook
    const notebook = await this.findOne(notebookId, userId);
    if (!notebook) {
      throw new NotFoundException(`Notebook with ID ${notebookId} not found`);
    }

    return this.documentsRepository.find({
      where: { notebookId, userId, isActive: true },
      order: { createdAt: 'DESC' },
    });
  }
}
