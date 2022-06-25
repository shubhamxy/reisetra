import {
  Address as AddressModel,
  State as StateModel,
  Locality as LocalityModel,
  Country as CountryModel,
} from '@prisma/client'

export class Address implements AddressModel {
  constructor(partial: Partial<AddressModel>) {
    Object.assign(this, partial)
  }

  id: string
  fullname: string
  phone: string
  email: string

  address: string
  region: string
  nearby: string
  zipcode: string
  userId: string
  locality: string
  stateCode: string
  countryCode: string
  localityCode: string
  latitude: string
  longitude: string
  active: boolean
  createdAt: Date
  updatedAt: Date
}

export class Locality implements LocalityModel {
  constructor(partial: Partial<LocalityModel>) {
    Object.assign(this, partial)
  }

  id: string
  code: string
  name: string
  type: string
  stateCode: string
  countryCode: string
  active: boolean
  createdAt: Date
  updatedAt: Date
}

export class State implements StateModel {
  constructor(partial: Partial<StateModel>) {
    Object.assign(this, partial)
  }

  id: string
  code: string
  name: string
  type: string
  countryCode: string
  active: boolean
  createdAt: Date
  updatedAt: Date
}

export class Country implements CountryModel {
  constructor(partial: Partial<CountryModel>) {
    Object.assign(this, partial)
  }

  id: string
  code: string
  name: string
  emoji: string
  currency: string
  currencySymbol: string
  active: boolean
  createdAt: Date
  updatedAt: Date
}
