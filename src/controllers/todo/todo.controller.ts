// todo.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateTodoDto, UpdateTodoDto } from '../../core/dtos';
import { TodoCaseService } from '../../use-cases/todo/todo-case.service';
import { JwtAuthGuard } from '../../frameworks/auth-services/JwtAuthGuard';
import { TodoRepository } from '../../core/repositories';
import { Todo } from '../../core/entities';

@ApiTags('Todo')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/todo')
export class TodoController implements TodoRepository{
  constructor(private readonly todoService: TodoCaseService) {}

  @Post('create')
  @ApiOperation({ summary: 'Créer un nouveau todo' })
  @ApiResponse({ status: 201, description: 'Todo créé avec succès.' })
  async create(@Body() createTodoDto: CreateTodoDto): Promise<void> {
    return await this.todoService.create(createTodoDto);
  }

  @Get('')
  @ApiOperation({ summary: 'Récupérer tous les todos' })
  @ApiResponse({ status: 200, description: 'Liste des todos récupérée avec succès.' })
  async findAll(): Promise<Todo[]> {
    return await this.todoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un todo par son ID' })
  @ApiResponse({ status: 200, description: 'Todo trouvé.' })
  @ApiResponse({ status: 404, description: 'Todo non trouvé.' })
  async findOne(@Param('id') id: string): Promise<Todo | null> {
    return await this.todoService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un todo' })
  @ApiResponse({ status: 200, description: 'Todo mis à jour avec succès.' })
  @ApiResponse({ status: 404, description: 'Todo non trouvé.' })
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto): Promise<void> {
    return await this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un todo' })
  @ApiResponse({ status: 200, description: 'Todo supprimé avec succès.' })
  @ApiResponse({ status: 404, description: 'Todo non trouvé.' })
  async delete(@Param('id') id: string): Promise<void> {
    return await this.todoService.delete(id);
  }
}