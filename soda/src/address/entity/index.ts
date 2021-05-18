import { Prisma, Address as AddressModel } from '.prisma/client';

export class Address implements AddressModel {
  constructor(partial: Partial<AddressModel>) {
    Object.assign(this, partial);
  }

  id: string;
  fullname: string;
  address: string;
  town: string;
  region: string;
  nearby: string;
  zipcode: string;
  city: string;
  country: string;
  userId: string;

  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
