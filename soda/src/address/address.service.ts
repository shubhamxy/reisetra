import { Product } from ".prisma/client";
import { Injectable } from "@nestjs/common";
import { errorCodes } from "src/common/codes/error";
import {
  CursorPagination,
  CursorPaginationResultInterface,
} from "src/common/pagination";
import { CustomError } from "src/common/response";
import { PrismaService } from "src/common/modules/db/prisma.service";
import { RedisService } from "src/common/modules/redis/redis.service";
import { prismaOffsetPagination } from "src/utils/prisma";
import { CreateAddressDto } from "./dto";

@Injectable()
export class AddressService {
  constructor(
    private readonly db: PrismaService,
    private readonly cache: RedisService
  ) {}

  async getAddresses(
    options: CursorPagination,
    userId: string
  ): Promise<CursorPaginationResultInterface<Partial<Product>>> {
    try {
      const {
        cursor,
        size = 10,
        buttonNum = 10,
        orderBy = "createdAt",
        orderDirection = "desc",
      } = options;
      const result = await prismaOffsetPagination({
        cursor,
        size: Number(size),
        buttonNum: Number(buttonNum),
        orderBy,
        orderDirection,
        model: "address",
        prisma: this.db,
        where: {
          userId,
          active: true,
        }
      });
      return result;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "AddressService.getAddresses"
      );
    }
  }

  async getAllAddresses(
    options: CursorPagination
  ): Promise<CursorPaginationResultInterface<Partial<Product>>> {
    try {
      const {
        cursor,
        size = 10,
        buttonNum = 10,
        orderBy = "createdAt",
        orderDirection = "desc",
      } = options;
      const result = await prismaOffsetPagination({
        cursor,
        size: Number(size),
        buttonNum: Number(buttonNum),
        orderBy,
        orderDirection,
        model: "address",
        prisma: this.db,
        where: {
          active: true,
        }
      });
      return result;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "AddressService.getAllAddresss"
      );
    }
  }

  async getAddress(id: string): Promise<any> {
    const product = await this.db.address.findUnique({
      where: { id },
    });
    if (!product) {
      throw new CustomError(
        "Address does not exist",
        errorCodes.RecordDoesNotExist
      );
    }
    return product;
  }

  async createAddress(userId: string, data: CreateAddressDto): Promise<any> {
    try {
      const product = await this.db.address.create({
        data: {
          ...data,
          userId: userId,
        },
      });
      return product;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "AddressService.createAddress"
      );
    }
  }
  async updateAddress(addressId: string, update): Promise<any> {
    try {
      const data = await this.db.address.update({
        where: { id: addressId },
        data: update,
      });
      return data;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "AddressService.updateAddress"
      );
    }
  }

  async deleteAddress(addressId: string): Promise<any> {
    try {
      const data = await this.db.address.update({
        where: { id: addressId },
        data: {
          active: false,
        }
      });
      return data;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "AddressService.deleteAddress"
      );
    }
  }
}
