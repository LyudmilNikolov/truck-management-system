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
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehiclesService } from './vehicles.service';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createVehicleDto: CreateVehicleDto) {
    return await this.vehiclesService.create(createVehicleDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ) {
    return await this.vehiclesService.update(id, updateVehicleDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return await this.vehiclesService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getByVehiclesId(@Param('id') id: string) {
    return await this.vehiclesService.getByVehiclesId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.vehiclesService.delete(id);
  }
}
