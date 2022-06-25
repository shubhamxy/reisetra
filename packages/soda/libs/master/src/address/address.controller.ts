import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common'
import { AddressService } from './address.service'
import { Message, Routes, SuccessResponse } from '@app/core'
import {
  AddressDTO,
  AddressesDTO,
  AllAddressDTO,
  AllLocalityDTO,
  AllCountryDTO,
  AllStateDTO,
  LocalityDTO,
  CountryDTO,
  StateDTO,
} from './dto'
import { AuthenticatedRequest, isAdmin, Public, Role, Roles } from '@app/auth'
import { ExceptionHandler } from '@app/core/decorators'
import { ADDRESS_ID } from './address.const'

@Controller(Routes.addresses)
export class AddressController {
  constructor(private readonly address: AddressService) {}

  @Roles(Role.ADMIN)
  @Get(Routes.addresses_all)
  @ExceptionHandler()
  async getAllAddresses(
    @Query() query: AllAddressDTO
  ): Promise<SuccessResponse> {
    const { results, ...meta } = await this.address.getAllAddresses(query)
    return { data: results || [], meta: meta, message: Message.success }
  }

  @Post()
  @ExceptionHandler()
  async createAddress(
    @Req() request: AuthenticatedRequest,
    @Body() body: AddressDTO
  ): Promise<SuccessResponse> {
    const data = await this.address.createAddress(
      request.user.id as string,
      body
    )
    return { data, message: Message.created }
  }

  @Public()
  @Get(Routes.countries)
  @ExceptionHandler()
  async getAllCountries(
    @Query() query: AllCountryDTO
  ): Promise<SuccessResponse> {
    const { results, ...meta } = await this.address.getAllCountries(query)
    return { data: results || [], meta: meta, message: Message.success }
  }

  @Public()
  @Get(Routes.localities)
  @ExceptionHandler()
  async getAllLocalities(
    @Query() query: AllLocalityDTO
  ): Promise<SuccessResponse> {
    const { results, ...meta } = await this.address.getAllLocalities(query)
    return { data: results || [], meta: meta, message: Message.success }
  }

  @Public()
  @Get(Routes.states)
  @ExceptionHandler()
  async getAllStates(@Query() query: AllStateDTO): Promise<SuccessResponse> {
    const { results, ...meta } = await this.address.getAllStates(query)
    return { data: results || [], meta: meta, message: Message.success }
  }

  @Post(Routes.countries)
  @Roles(Role.ADMIN)
  @ExceptionHandler()
  async createCountries(
    @Req() request: AuthenticatedRequest,
    @Body() body: CountryDTO[]
  ): Promise<SuccessResponse> {
    const data = await this.address.createCountries(
      request.user.id as string,
      body
    )
    return { data, message: Message.created }
  }

  @Post(Routes.states)
  @Roles(Role.ADMIN)
  @ExceptionHandler()
  async createStates(
    @Req() request: AuthenticatedRequest,
    @Body() body: StateDTO[]
  ): Promise<SuccessResponse> {
    const data = await this.address.createStates(
      request.user.id as string,
      body
    )
    return { data, message: Message.created }
  }

  @Post(Routes.localities)
  @Roles(Role.ADMIN)
  @ExceptionHandler()
  async createLocalities(
    @Req() request: AuthenticatedRequest,
    @Body() body: LocalityDTO[]
  ): Promise<SuccessResponse> {
    const data = await this.address.createLocalities(
      request.user.id as string,
      body
    )

    return { data, message: Message.created }
  }

  @Get()
  @ExceptionHandler()
  async getAddresses(
    @Req() req: AuthenticatedRequest,
    @Query() query: AddressesDTO
  ): Promise<SuccessResponse> {
    const { results, ...meta } = await this.address.getAddressesByUser(
      query,
      req.user.id
    )
    return { data: results || [], meta: meta, message: Message.success }
  }

  @Get(Routes.addresses_by_addressId)
  @ExceptionHandler()
  async getAddress(
    @Param(ADDRESS_ID) addressId: string
  ): Promise<SuccessResponse> {
    const data = await this.address.getAddressById(addressId)
    return { data, message: Message.success }
  }

  @Put(Routes.addresses_by_addressId)
  @ExceptionHandler()
  async updateAddress(
    @Req() request: AuthenticatedRequest,
    @Param(ADDRESS_ID) addressId: string,
    @Body() body: AddressDTO
  ): Promise<SuccessResponse> {
    const data = await this.address.updateAddress(
      addressId,
      body,
      request.user.id,
      isAdmin(request.user.roles)
    )
    return { data, message: Message.success }
  }

  @Roles(Role.ADMIN)
  @Delete(Routes.addresses_by_addressId)
  @ExceptionHandler()
  async deleteAddress(
    @Param(ADDRESS_ID) addressId: string
  ): Promise<SuccessResponse> {
    const data = await this.address.deleteAddress(addressId)
    return { data, message: Message.success }
  }
}
