import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateNotebookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsOptional()
  settings?: Record<string, any>;
}
