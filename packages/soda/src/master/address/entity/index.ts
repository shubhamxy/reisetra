import { Address as AddressModel } from '.prisma/client'

export class Address implements AddressModel {
  constructor(partial: Partial<AddressModel>) {
    Object.assign(this, partial)
  }

  id: string
  fullname: string
  address: string
  region: string
  nearby: string
  zipcode: string
  city: string
  state: string
  country: string

  phone: string
  email: string

  userId: string

  active: boolean
  createdAt: Date
  updatedAt: Date
}
