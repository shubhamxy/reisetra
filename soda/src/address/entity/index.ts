import { Prisma, Address as AddressModel } from '.prisma/client';

export class Order implements AddressModel {
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

  constructor(partial: Partial<AddressModel>) {
    Object.assign(this, partial);
  }

  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
