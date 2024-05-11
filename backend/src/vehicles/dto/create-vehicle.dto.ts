import { Type } from 'class-transformer';
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Types } from 'mongoose';

class InsuranceDetailDto {
  @IsString()
  type: string;

  @IsNumber()
  period: number;

  @IsNotEmpty()
  expiryDate: Date;

  @IsString()
  provider: string;
}

class InspectionDetailDto {
  @IsNotEmpty()
  expiryDate: Date;
}

export class CreateVehicleDto {
  @IsString()
  licensePlate: string;

  @IsString()
  category: string;

  @IsString()
  ecoType: string;

  @IsString()
  VIN: string;

  @IsString()
  make: string;

  @IsString()
  vehicleModel: string;

  @IsNumber()
  year: number;

  @ValidateNested()
  @Type(() => InsuranceDetailDto)
  insurance: InsuranceDetailDto;

  @ValidateNested()
  @Type(() => InspectionDetailDto)
  vehicleInspection: InspectionDetailDto;

  @ValidateNested()
  @Type(() => InspectionDetailDto)
  tachographInspection: InspectionDetailDto;

  @IsString()
  status: string;

  @IsString()
  currentLocation: string;

  @IsOptional()
  @IsMongoId()
  assignedDriver: Types.ObjectId;
}
