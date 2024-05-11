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

class CardDetailDto {
  @IsNumber()
  card: number;

  @IsNotEmpty()
  expiryDate: Date;
}

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  role?: string;

  @ValidateNested()
  @Type(() => CardDetailDto)
  driverLicense: CardDetailDto;

  @ValidateNested()
  @Type(() => CardDetailDto)
  driverId: CardDetailDto;

  @ValidateNested()
  @Type(() => CardDetailDto)
  driverTachograph: CardDetailDto;

  @ValidateNested()
  @Type(() => CardDetailDto)
  driverPsycho: CardDetailDto;

  @ValidateNested()
  @Type(() => CardDetailDto)
  driverQualification: CardDetailDto;

  @IsOptional()
  @IsMongoId()
  assignedVehicle?: Types.ObjectId;

  @IsOptional()
  @IsString()
  status?: string;
}
