// todo.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateTodoDto, UpdateTodoDto } from '../../core/dtos';
import { TodoCaseService } from '../../use-cases/todo/todo-case.service';
import { JwtAuthGuard } from '../../frameworks/auth-services/JwtAuthGuard';

@ApiTags('api/todo')
@UseGuards(JwtAuthGuard)
@Controller('api/todo')
export class TodoController {
  constructor(private readonly todoService: TodoCaseService) {}

  @Post('create')
  @ApiOperation({ summary: 'Créer un nouveau todo' })
  @ApiResponse({ status: 201, description: 'Todo créé avec succès.' })
  async create(@Body() createTodoDto: CreateTodoDto) {
    return await this.todoService.create(createTodoDto);
  }

  @Get('')
  @ApiOperation({ summary: 'Récupérer tous les todos' })
  @ApiResponse({ status: 200, description: 'Liste des todos récupérée avec succès.' })
  async findAll() {
    return await this.todoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un todo par son ID' })
  @ApiResponse({ status: 200, description: 'Todo trouvé.' })
  @ApiResponse({ status: 404, description: 'Todo non trouvé.' })
  async findOne(@Param('id') id: string) {
    return await this.todoService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un todo' })
  @ApiResponse({ status: 200, description: 'Todo mis à jour avec succès.' })
  @ApiResponse({ status: 404, description: 'Todo non trouvé.' })
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return await this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un todo' })
  @ApiResponse({ status: 200, description: 'Todo supprimé avec succès.' })
  @ApiResponse({ status: 404, description: 'Todo non trouvé.' })
  async delete(@Param('id') id: string) {
    return await this.todoService.delete(id);
  }
}