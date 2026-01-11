import { IsEmail, IsString, IsOptional, IsObject } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsObject()
  skills?: Record<string, any>;

  @IsOptional()
  @IsObject()
  experience?: Record<string, any>;

  @IsOptional()
  @IsObject()
  assets?: Record<string, any>;
}
