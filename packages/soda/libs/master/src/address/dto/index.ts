import { CursorPaginationDTO, mustBe, mustBeValidEnum } from '@app/core'
import { Address, Locality, State, Country } from '../entity'
import { IsEnum, IsOptional, IsString } from 'class-validator'
import { FileType } from '../../file/entity'

export class AllAddressDTO extends CursorPaginationDTO {
  @IsOptional()
  @IsEnum(FileType, {
    message: mustBeValidEnum(FileType, 'fileType'),
  })
  fileType: FileType

  @IsOptional()
  @IsString({ message: mustBe('string', 'url') })
  url: string

  @IsOptional()
  @IsString({ message: mustBe('string', 'productId') })
  productId: string

  @IsOptional()
  @IsString({ message: mustBe('string', 'reviewId') })
  reviewId: string

  @IsOptional()
  @IsString({ message: mustBe('string', 'categoryId') })
  categoryId: string

  @IsOptional()
  @IsString({ message: mustBe('string', 'userId') })
  userId: string

  active: boolean
}

export class AddressesDTO extends CursorPaginationDTO {}

export class AddressDTO implements Partial<Address> {
  phone: string
  email: string
  fullname: string
  address: string
  region: string
  nearby: string
  city: string
  state: string
  country: string
  zipcode: string
  latitude?: string
  longitude?: string
  cityId?: string
  stateId?: string
  countryId?: string
}
export class AllLocalityDTO extends CursorPaginationDTO {
  @IsOptional()
  @IsString({ message: mustBe('string', 'type') })
  type: string

  @IsOptional()
  @IsString({ message: mustBe('string', 'code') })
  code: string

  @IsOptional()
  @IsString({ message: mustBe('string', 'stateCode') })
  stateCode: string

  @IsOptional()
  @IsString({ message: mustBe('string', 'countryCode') })
  countryCode: string

  @IsOptional()
  @IsString({ message: mustBe('string', 'name') })
  name: string

  active: boolean
}

export class LocalityDTO implements Partial<Locality> {
  id: string
  code: string
  name: string
  type: string
  stateCode: string
  countryCode: string
  active?: boolean
  createdAt?: Date
  updatedAt?: Date
}
export class AllStateDTO extends CursorPaginationDTO {
  @IsOptional()
  @IsString({ message: mustBe('string', 'type') })
  type: string

  @IsOptional()
  @IsString({ message: mustBe('string', 'code') })
  code: string

  @IsOptional()
  @IsString({ message: mustBe('string', 'countryCode') })
  countryCode: string

  @IsOptional()
  @IsString({ message: mustBe('string', 'name') })
  name: string

  active: boolean
}

export class StateDTO implements Partial<State> {
  code: string
  name: string
  countryCode: string
  type: string
  active?: boolean
  createdAt?: Date
  updatedAt?: Date
  country_code: string
  state_code: string
}
export class AllCountryDTO extends CursorPaginationDTO {
  @IsOptional()
  @IsString({ message: mustBe('string', 'type') })
  type: string

  @IsOptional()
  @IsString({ message: mustBe('string', 'code') })
  code: string

  @IsOptional()
  @IsString({ message: mustBe('string', 'name') })
  name: string

  @IsOptional()
  @IsString({ message: mustBe('string', 'currency') })
  currency: string

  active: boolean
}

export class CountryDTO implements Partial<Country> {
  code: string
  name: string
  currency: string
  currencySymbol: string
  emoji: string
  active?: boolean
  createdAt?: Date
  updatedAt?: Date
}
