import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common'
import { AddressService } from './address.service'
import { CustomException, ROUTES, SuccessResponse } from '@app/core'
import { AddressDTO, AddressesDTO, AllAddressDTO } from './dto'
import { AuthenticatedRequest, isAdmin, Role, Roles } from '@app/auth'

@Controller(ROUTES.addresses)
export class AddressController {
  constructor(private readonly address: AddressService) {}

  @Roles(Role.ADMIN)
  @Get(ROUTES.addresses_all)
  async getAllAddresses(
    @Query() query: AllAddressDTO
  ): Promise<SuccessResponse> {
    try {
      const { results, ...meta } = await this.address.getAllAddresses(query)
      return { data: results || [], meta: meta }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'AddressController.getAllAddresses'
      )
    }
  }

  @Post()
  async createAddress(
    @Req() request: AuthenticatedRequest,
    @Body() body: AddressDTO
  ): Promise<SuccessResponse> {
    try {
      const data = await this.address.createAddress(request.user.id, body)
      return { data }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'AddressController.createAddress'
      )
    }
  }

  @Get()
  async getAddresses(
    @Req() req: AuthenticatedRequest,
    @Query() query: AddressesDTO
  ): Promise<SuccessResponse> {
    try {
      const { results, ...meta } = await this.address.getAddressesByUser(
        query,
        req.user.id
      )
      return { data: results || [], meta: meta }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'AddressController.getAddresses'
      )
    }
  }

  @Get(ROUTES.addresses_by_addressId)
  async getAddress(
    @Param('addressId') addressId: string
  ): Promise<SuccessResponse> {
    try {
      const data = await this.address.getAddressById(addressId)
      return { data }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'AddressController.getAddress'
      )
    }
  }

  @Put(ROUTES.addresses_by_addressId)
  async updateAddress(
    @Req() request: AuthenticatedRequest,
    @Param('addressId') addressId: string,
    @Body() body: AddressDTO
  ): Promise<SuccessResponse> {
    try {
      const data = await this.address.updateAddress(
        addressId,
        body,
        request.user.id,
        isAdmin(request.user.roles)
      )
      return { data }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'AddressController.updateAddress'
      )
    }
  }

  @Roles(Role.ADMIN)
  @Delete(ROUTES.addresses_by_addressId)
  async deleteAddress(
    @Param('addressId') addressId: string
  ): Promise<SuccessResponse> {
    try {
      const data = await this.address.deleteAddress(addressId)
      return { data }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'AddressController.deleteAddress'
      )
    }
  }
}
