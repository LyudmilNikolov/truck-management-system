import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './schemas/employee.schema';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const newEmployee = new this.employeeModel(createEmployeeDto);
    return await newEmployee.save();
  }

  async update(
    id: string,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    const updatedEmployee = await this.employeeModel
      .findByIdAndUpdate(id, updateEmployeeDto, { new: true })
      .exec();
    if (!updatedEmployee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return updatedEmployee;
  }

  async getAll(): Promise<Employee[]> {
    return await this.employeeModel.find().exec();
  }

  async getEmployeeById(id: string): Promise<Employee> {
    const employee = await this.employeeModel.findById(id).exec();
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  async delete(id: string): Promise<void> {
    const result = await this.employeeModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
  }
}
