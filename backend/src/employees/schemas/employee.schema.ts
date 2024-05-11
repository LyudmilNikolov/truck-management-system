import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Employee extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  role: string;

  @Prop({ type: Object })
  driverLicense: {
    card: number;
    expiryDate: Date;
  };

  @Prop({ type: Object })
  driverId: {
    card: number;
    expiryDate: Date;
  };

  @Prop({ type: Object })
  driverTachograph: {
    card: number;
    expiryDate: Date;
  };

  @Prop({ type: Object })
  driverPsycho: {
    card: number;
    expiryDate: Date;
  };

  @Prop({ type: Object })
  driverQualification: {
    card: number;
    expiryDate: Date;
  };

  @Prop({ type: Types.ObjectId, ref: 'Vehicle' })
  assignedVehicle: Types.ObjectId;

  @Prop()
  status: string;
  // Maybe more cards that will be required or images
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
