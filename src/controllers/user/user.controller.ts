import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
  Param,
  Body,
  HttpStatus,
  HttpCode
} from '@nestjs/common';
import { JwtAuthGuard } from '../../frameworks/auth-services/JwtAuthGuard';
import { UserRepository } from '../../core/repositories';
import { CreateUserDto, UpdateUserDto } from 'src/core/dtos';
import { User } from 'src/core/entities';
import { UserFactoryService } from '../../use-cases/user/user-factory.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Users')
@UseGuards(JwtAuthGuard)
@Controller('api/user')
export class UserController implements UserRepository {
  constructor(
    private readonly userFactoryService: UserFactoryService,
  ) {}

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un utilisateur par son ID' })
  @ApiResponse({ status: 200, description: 'Utilisateur trouvé avec succès', type: User })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  async findOne(@Param('id') id: string): Promise<User | null> {
    return this.userFactoryService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Créer un nouvel utilisateur' })
  @ApiResponse({ status: 201, description: 'Utilisateur créé avec succès' })
  async create(@Body() user: CreateUserDto): Promise<void> {
    return this.userFactoryService.create(user);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Mettre à jour un utilisateur' })
  @ApiResponse({ status: 204, description: 'Utilisateur mis à jour avec succès' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  async update(
    @Param('id') id: string,
    @Body() user: UpdateUserDto
  ): Promise<void> {
    return this.userFactoryService.update(id, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprimer un utilisateur' })
  @ApiResponse({ status: 204, description: 'Utilisateur supprimé avec succès' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  async delete(@Param('id') id: string): Promise<void> {
    return this.userFactoryService.delete(id);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les utilisateurs' })
  @ApiResponse({ status: 200, description: 'Liste des utilisateurs récupérée avec succès', type: [User] })
  async findAll(): Promise<User[]> {
    return this.userFactoryService.findAll();
  }
}