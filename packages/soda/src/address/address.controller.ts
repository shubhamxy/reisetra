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
import { CustomException, SuccessResponse } from 'src/common/response'
import {
    CreateAddressDto,
    GetAddressesDto,
    GetAllAddressDto,
    UpdateAddressDto,
} from './dto'
import { AuthenticatedRequest } from 'src/auth/auth.interface'
import { Roles } from 'src/auth/decorator/roles.decorator'

@Controller()
export class AddressController {
    constructor(private readonly address: AddressService) {}
    @Get('addresses')
    async getAddresses(
        @Req() req: AuthenticatedRequest,
        @Query() query: GetAddressesDto
    ): Promise<SuccessResponse> {
        try {
            const { results, ...meta } = await this.address.getAddresses(
                query,
                req.user.id
            )
            return { data: results || [], meta: meta }
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'AddressController.getAllOrders'
            )
        }
    }

    @Get('addresses/all')
    async getAllAddresses(
        @Query() query: GetAllAddressDto
    ): Promise<SuccessResponse> {
        try {
            const { results, ...meta } = await this.address.getAllAddresses(
                query
            )
            return { data: results || [], meta: meta }
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'AddressController.getAllOrders'
            )
        }
    }

    @Get('address/:addressId')
    async getAddress(
        @Param('addressId') addressId: string
    ): Promise<SuccessResponse> {
        try {
            const data = await this.address.getAddress(addressId)
            return { data }
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'AddressController.getOrder'
            )
        }
    }

    @Post('address')
    async createOrder(
        @Req() request: AuthenticatedRequest,
        @Body() body: CreateAddressDto
    ): Promise<SuccessResponse> {
        try {
            const data = await this.address.createAddress(request.user.id, body)
            return { data }
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'AddressController.createOrder'
            )
        }
    }

    @Put('address/:addressId')
    async updateOrder(
        @Param('addressId') addressId: string,
        @Body() body: UpdateAddressDto
    ): Promise<SuccessResponse> {
        try {
            const data = await this.address.updateAddress(addressId, body)
            return { data }
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'AddressController.updateOrder'
            )
        }
    }

    @Roles('ADMIN')
    @Delete('address/:addressId')
    async deleteOrder(
        @Param('addressId') addressId: string
    ): Promise<SuccessResponse> {
        try {
            const data = await this.address.deleteAddress(addressId)
            return { data }
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'AddressController.deleteOrder'
            )
        }
    }
}
