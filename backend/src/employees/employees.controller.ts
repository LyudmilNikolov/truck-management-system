import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return await this.employeesService.create(createEmployeeDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return await this.employeesService.update(id, updateEmployeeDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return await this.employeesService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getEmployeeById(@Param('id') id: string) {
    return await this.employeesService.getEmployeeById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.employeesService.delete(id);
  }
}
