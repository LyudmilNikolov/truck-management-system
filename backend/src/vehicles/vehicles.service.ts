import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './schemas/vehicle.schema';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectModel(Vehicle.name) private vehicleModel: Model<Vehicle>,
  ) {}

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const newVehicle = new this.vehicleModel(createVehicleDto);
    return await newVehicle.save();
  }

  async update(
    id: string,
    updateVehicleDto: UpdateVehicleDto,
  ): Promise<Vehicle> {
    const updatedVehicle = await this.vehicleModel
      .findByIdAndUpdate(id, updateVehicleDto, { new: true })
      .exec();
    if (!updatedVehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }
    return updatedVehicle;
  }

  async getAll(): Promise<Vehicle[]> {
    return await this.vehicleModel.find().exec();
  }

  async getByVehiclesId(id: string): Promise<Vehicle> {
    const vehicle = await this.vehicleModel.findById(id).exec();
    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }
    return vehicle;
  }

  async delete(id: string): Promise<void> {
    const result = await this.vehicleModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }
  }
}
