import { Injectable } from '@nestjs/common'
import { errorCodes } from 'src/core/codes/error'
import {
    CursorPagination,
    CursorPaginationResultInterface,
} from 'src/core/pagination'
import { CustomError } from 'src/core/response'
import { PrismaService } from 'src/core/modules/db/prisma.service'
import { CacheService } from 'src/core/modules/cache/cache.service'
import { prismaOffsetPagination } from 'src/utils/prisma'
import { AddressDTO } from './dto'
import { AddressRO } from './interfaces'

@Injectable()
export class AddressService {
    constructor(
        private readonly db: PrismaService,
        private readonly cache: CacheService
    ) {}

    async getAllAddresses(
        options: CursorPagination
    ): Promise<CursorPaginationResultInterface<AddressRO>> {
        try {
            const {
                cursor,
                size = 10,
                buttonNum = 10,
                orderBy = 'createdAt',
                orderDirection = 'desc',
            } = options
            const result = await prismaOffsetPagination({
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
            return result
        } catch (error) {
            throw new CustomError(
                error?.meta?.cause || error.message,
                error.code,
                'AddressService.getAllAddresss'
            )
        }
    }

    async getAddressesByUser(
        options: CursorPagination,
        userId: string
    ): Promise<CursorPaginationResultInterface<AddressRO>> {
        try {
            const {
                cursor,
                size = 10,
                buttonNum = 10,
                orderBy = 'createdAt',
                orderDirection = 'desc',
            } = options
            const result = await prismaOffsetPagination({
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
            return result
        } catch (error) {
            throw new CustomError(
                error?.meta?.cause || error.message,
                error.code,
                'AddressService.getAddresses'
            )
        }
    }

    async getAddressById(id: string): Promise<AddressRO> {
        const address = await this.db.address.findUnique({
            where: { id },
        })
        if (!address) {
            throw new CustomError(
                'Address does not exist',
                errorCodes.RecordDoesNotExist
            )
        }
        return address
    }

    async createAddress(userId: string, data: AddressDTO): Promise<AddressRO> {
        try {
            const product = await this.db.address.create({
                data: {
                    ...data,
                    userId: userId,
                },
            })
            return product
        } catch (error) {
            throw new CustomError(
                error?.meta?.cause || error.message,
                error.code,
                'AddressService.createAddress'
            )
        }
    }

    async updateAddress(
        id: string,
        update: AddressDTO,
        userId,
        isAdmin = false
    ): Promise<AddressRO> {
        try {
            if (isAdmin) {
                const data = await this.db.address.update({
                    where: { id },
                    data: update,
                })

                return data
            } else {
                const count = await this.db.address.count({
                    where: {
                        userId,
                        id,
                    },
                })

                if (count > 0) {
                    const data = await this.db.address.update({
                        where: { id },
                        data: update,
                    })
                    return data
                } else {
                    throw new Error('Address Not found')
                }
            }
        } catch (error) {
            throw new CustomError(
                error?.meta?.cause || error.message,
                error.code,
                'AddressService.updateAddress'
            )
        }
    }

    async deleteAddress(id: string): Promise<AddressRO> {
        try {
            const data = await this.db.address.update({
                where: { id },
                data: {
                    active: false,
                },
            })
            return data
        } catch (error) {
            throw new CustomError(
                error?.meta?.cause || error.message,
                error.code,
                'AddressService.deleteAddress'
            )
        }
    }
}
