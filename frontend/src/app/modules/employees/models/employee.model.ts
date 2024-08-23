export interface DriverLicenses {
  card: number;
  expiryDate: string;
}

export interface Employee {
  firstName: string;
  lastName: string;
  phone: string;
  role: string;
  status: string;
  driverId: DriverLicenses;
  driverLicense: DriverLicenses;
  driverPsycho: DriverLicenses;
  driverQualification: DriverLicenses;
  driverTachograph: DriverLicenses;
  _id: string;
}
