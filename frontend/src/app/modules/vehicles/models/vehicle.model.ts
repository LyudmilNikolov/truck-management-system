export interface Insurance {
  type: string;
  period: number;
  expiryDate: string;
  provider: string;
}

export interface Vehicle {
  licensePlate: string;
  category: string;
  ecoType: string;
  VIN: string;
  make: string;
  vehicleModel: string;
  year: number;
  insurance: Insurance;
  vehicleInspection: {
    expiryDate: string;
  };
  tachographInspection: {
    expiryDate: string;
  };
  status: string;
  currentLocation: string;
  assignedDriver: string;
  _id: string;
}