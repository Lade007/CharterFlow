import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
  Request,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { mkdirSync } from 'fs';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { NotebooksService } from './notebooks.service';
import { CreateNotebookDto } from './dto/create-notebook.dto';
import { UpdateNotebookDto } from './dto/update-notebook.dto';

@ApiTags('notebooks')
@Controller('notebooks')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class NotebooksController {
  constructor(private readonly notebooksService: NotebooksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new notebook' })
  @ApiResponse({ status: 201, description: 'Notebook created successfully' })
  async create(@Request() req, @Body() createNotebookDto: CreateNotebookDto) {
    return this.notebooksService.create(req.user.id, createNotebookDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all user notebooks' })
  @ApiResponse({ status: 200, description: 'List of user notebooks' })
  async findAll(@Request() req) {
    return this.notebooksService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get notebook by ID' })
  @ApiResponse({ status: 200, description: 'Notebook details' })
  async findOne(@Param('id') id: string, @Request() req) {
    return this.notebooksService.findOne(id, req.user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update notebook' })
  @ApiResponse({ status: 200, description: 'Notebook updated successfully' })
  async update(
    @Param('id') id: string,
    @Request() req,
    @Body() updateNotebookDto: UpdateNotebookDto,
  ) {
    return this.notebooksService.update(id, req.user.id, updateNotebookDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete notebook' })
  @ApiResponse({ status: 200, description: 'Notebook deleted successfully' })
  async remove(@Param('id') id: string, @Request() req) {
    await this.notebooksService.remove(id, req.user.id);
    return { message: 'Notebook deleted successfully' };
  }

  @Get(':id/documents')
  @ApiOperation({ summary: 'Get notebook documents' })
  @ApiResponse({ status: 200, description: 'List of notebook documents' })
  async getDocuments(@Param('id') id: string, @Request() req) {
    return this.notebooksService.getDocuments(id, req.user.id);
  }

  @Post(':id/documents')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          const uploadDir = join(process.cwd(), 'uploads');
          mkdirSync(uploadDir, { recursive: true });
          cb(null, uploadDir);
        },
        filename: (_req, file, cb) => {
          const safeExt = extname(file.originalname || '').toLowerCase();
          const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          cb(null, `${unique}${safeExt}`);
        },
      }),
      limits: {
        fileSize: 25 * 1024 * 1024,
      },
    }),
  )
  @ApiOperation({ summary: 'Upload a document to a notebook' })
  @ApiResponse({ status: 201, description: 'Document uploaded successfully' })
  async uploadDocument(
    @Param('id') id: string,
    @Request() req,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    return this.notebooksService.createDocumentFromUpload({
      notebookId: id,
      userId: req.user.id,
      originalName: file.originalname,
      storedFileName: file.filename,
      mimeType: file.mimetype,
      size: file.size,
    });
  }
}
