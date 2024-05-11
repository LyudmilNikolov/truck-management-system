import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Vehicle extends Document {
  @Prop()
  licensePlate: string;

  @Prop()
  category: string;

  @Prop()
  ecoType: string;

  @Prop()
  VIN: string;

  @Prop()
  make: string;

  @Prop()
  vehicleModel: string;

  @Prop()
  year: number;

  @Prop({ type: Object })
  insurance: {
    type: string;
    period: number;
    expiryDate: Date;
    provider: string;
  };

  @Prop({ type: Object })
  vehicleInspection: {
    expiryDate: Date;
  };

  @Prop({ type: Object })
  tachographInspection: {
    expiryDate: Date;
  };

  @Prop()
  status: string;

  @Prop()
  currentLocation: string;

  @Prop({ type: Types.ObjectId, ref: 'Employee' })
  assignedDriver: Types.ObjectId;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
