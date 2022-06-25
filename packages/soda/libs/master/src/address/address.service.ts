import { Injectable } from '@nestjs/common'
import {
  AppError,
  CursorPagination,
  CursorPaginationResultInterface,
  RecordDoesNotExist,
} from '@app/core'
import { DbService } from '@app/db'
import { prismaOffsetPagination } from '@app/utils'
import {
  AddressDTO,
  AllLocalityDTO,
  AllCountryDTO,
  AllStateDTO,
  LocalityDTO,
  CountryDTO,
  StateDTO,
} from './dto'
import { AddressRO } from './interfaces'
import { ErrorHandler } from '@app/core/decorators'
import { ADDRESS_NOT_FOUND } from './address.const'
import { CREATED_AT, DESC } from '@app/user/user.const'
import { Prisma } from '@prisma/client'

@Injectable()
export class AddressService {
  constructor(private readonly db: DbService) {}

  async getAllAddresses(
    options: CursorPagination
  ): Promise<CursorPaginationResultInterface<AddressRO>> {
    try {
      const {
        cursor,
        size = 10,
        buttonNum = 10,
        orderBy = CREATED_AT,
        orderDirection = DESC,
      } = options
      return await prismaOffsetPagination({
        cursor,
        size: Number(size),
        buttonNum: Number(buttonNum),
        orderBy,
        orderDirection,
        model: 'address',
        prisma: this.db,
        where: {
          active: true,
        },
      })
    } catch (error) {
      throw new AppError(error?.meta?.cause || error.message, error.code)
    }
  }

  @ErrorHandler()
  async getAddressesByUser(
    options: CursorPagination,
    userId: string
  ): Promise<CursorPaginationResultInterface<AddressRO>> {
    const {
      cursor,
      size = 10,
      buttonNum = 10,
      orderBy = CREATED_AT,
      orderDirection = DESC,
    } = options
    return await prismaOffsetPagination({
      cursor,
      size: Number(size),
      buttonNum: Number(buttonNum),
      orderBy,
      orderDirection,
      model: 'address',
      prisma: this.db,
      where: {
        userId,
        active: true,
      },
    })
  }

  @ErrorHandler()
  async getAddressById(id: string): Promise<AddressRO> {
    const address = await this.db.address.findUnique({
      where: { id },
    })
    if (!address) {
      throw new AppError(ADDRESS_NOT_FOUND, RecordDoesNotExist)
    }
    return address
  }

  @ErrorHandler()
  async createAddress(userId: string, data: AddressDTO): Promise<AddressRO> {
    const { country, city, state, ...other } = data
    return await this.db.address.create({
      data: {
        ...other,
        userId,
        countryCode: country,
        stateCode: state,
      },
    })
  }

  @ErrorHandler()
  async updateAddress(
    id: string,
    update: AddressDTO,
    userId,
    isAdmin = false
  ): Promise<AddressRO> {
    const { country, city, state, ...other } = update

    if (isAdmin) {
      return await this.db.address.update({
        where: { id },
        data: {
          ...other,
          userId: userId,
        },
      })
    }

    const count = await this.db.address.count({
      where: {
        userId,
        id,
      },
    })
    if (count > 0) {
      return await this.db.address.update({
        where: { id },
        data: {
          ...other,
          userId: userId,
        },
      })
    }
    throw new Error(ADDRESS_NOT_FOUND)
  }

  @ErrorHandler()
  async deleteAddress(id: string): Promise<AddressRO> {
    return await this.db.address.update({
      where: { id },
      data: {
        active: false,
      },
    })
  }

  @ErrorHandler()
  async getAllCountries(
    options: AllCountryDTO
  ): Promise<CursorPaginationResultInterface<CountryDTO>> {
    const {
      cursor,
      size = 100,
      buttonNum = 3,
      orderBy = CREATED_AT,
      orderDirection = DESC,
    } = options

    const whereObj: Prisma.CountryWhereInput = {
      active: true,
    }

    if (options.active) {
      whereObj.active = options.active
    }
    if (options.code) {
      whereObj.code = options.code.trim()
    }
    if (options.currency) {
      whereObj.currency = options.currency.trim()
    }
    if (options.name) {
      whereObj.name = {
        contains: options.name.trim(),
        mode: 'insensitive',
      }
    }

    return await prismaOffsetPagination({
      cursor,
      size: Number(size),
      buttonNum: Number(buttonNum),
      orderBy,
      orderDirection,
      model: 'country',
      prisma: this.db,
      where: whereObj,
    })
  }

  @ErrorHandler()
  async getAllStates(
    options: AllStateDTO
  ): Promise<CursorPaginationResultInterface<CountryDTO>> {
    const {
      cursor,
      size = 100,
      buttonNum = 3,
      orderBy = CREATED_AT,
      orderDirection = DESC,
    } = options

    const whereObj: Prisma.StateWhereInput = {
      active: true,
    }

    if (options.active) {
      whereObj.active = options.active
    }
    if (options.code) {
      whereObj.code = options.code.trim()
    }
    if (options.countryCode) {
      whereObj.countryCode = options.countryCode.trim()
    }
    if (options.name) {
      whereObj.name = {
        contains: options.name.trim(),
        mode: 'insensitive',
      }
    }

    return await prismaOffsetPagination({
      cursor,
      size: Number(size),
      buttonNum: Number(buttonNum),
      orderBy,
      orderDirection,
      model: 'state',
      prisma: this.db,
      where: whereObj,
    })
  }

  @ErrorHandler()
  async getAllLocalities(
    options: AllLocalityDTO
  ): Promise<CursorPaginationResultInterface<CountryDTO>> {
    const {
      cursor,
      size = 100,
      buttonNum = 10,
      orderBy = CREATED_AT,
      orderDirection = DESC,
    } = options

    const whereObj: Prisma.LocalityWhereInput = {
      active: true,
    }

    if (options.active) {
      whereObj.active = options.active
    }
    if (options.code) {
      whereObj.code = options.code.trim()
    }
    if (options.stateCode) {
      whereObj.stateCode = options.stateCode.trim()
    }
    if (options.countryCode) {
      whereObj.countryCode = options.countryCode.trim()
    }
    if (options.name) {
      whereObj.name = {
        contains: options.name.trim(),
        mode: 'insensitive',
      }
    }

    return await prismaOffsetPagination({
      cursor,
      size: Number(size),
      buttonNum: Number(buttonNum),
      orderBy,
      orderDirection,
      model: 'locality',
      prisma: this.db,
      where: whereObj,
    })
  }

  @ErrorHandler()
  async createCountries(userId: string, data: CountryDTO[]): Promise<any> {
    return await this.db.country.createMany({
      data,
    })
  }

  @ErrorHandler()
  async createStates(userId: string, data: StateDTO[]): Promise<any> {
    return await this.db.state.createMany({
      data,
    })
  }

  @ErrorHandler()
  async createLocalities(userId: string, data: LocalityDTO[]): Promise<any> {
    return await this.db.locality.createMany({
      data,
    })
  }
}
