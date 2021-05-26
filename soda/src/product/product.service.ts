import { Product } from ".prisma/client";
import { HttpStatus, Injectable } from "@nestjs/common";
import { errorCodes } from "src/common/codes/error";
import {
  CursorPagination,
  CursorPaginationResultInterface,
} from "src/common/pagination";
import { CustomError } from "src/common/response";
import { PrismaService } from "src/common/modules/db/prisma.service";
import { RedisService } from "src/common/modules/redis/redis.service";
import { prismaOffsetPagination } from "src/utils/prisma";
import { CreateProductDto } from "./dto";

@Injectable()
export class ProductService {
  constructor(
    private readonly db: PrismaService,
    private readonly cache: RedisService
  ) {}

  async getAllProducts(
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
        model: "product",
        include: {
          inventory: true,
          images: true,
        },
        prisma: this.db,
      });
      return result;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "ProductService.getAllProducts"
      );
    }
  }

  async getProduct(id: string): Promise<any> {
    const product = await this.db.product.findUnique({
      where: { id },
      include: {
        inventory: true,
        images: true,
      },
    });
    if (!product) {
      throw new CustomError(
        "Product does not exist",
        errorCodes.RecordDoesNotExist
      );
    }
    return product;
  }

  async createProduct(data: CreateProductDto): Promise<any> {
    try {
      const { inventory, ...productData } = data;
      const product = await this.db.product.create({
        data: {
          ...productData,
          inventory: {
            create: inventory,
          },
          images: {
            createMany: {
              data: data.images,
            }
          }
        },
        include: {
          inventory: true,
          images: true,
        },
      });
      return product;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "ProductService.findAllOffset"
      );
    }
  }
  async updateProduct(productId: string, update): Promise<any> {
    try {
      const data = await this.db.product.update({
        where: { id: productId },
        data: update,
        include: {
          inventory: true,
          images: true,
        },
      });
      return data;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "ProductService.findAllOffset"
      );
    }
  }

  async deleteProduct(productId: string): Promise<any> {
    try {
      const data = await this.db.product.delete({
        where: { id: productId },
        include: {
          inventory: true,
          images: true,
        },
      });
      return data;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "ProductService.findAllOffset"
      );
    }
  }
}
