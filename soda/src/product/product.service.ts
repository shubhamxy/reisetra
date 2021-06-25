import { Product } from ".prisma/client";
import { HttpStatus, Injectable } from "@nestjs/common";
import { errorCodes } from "src/common/codes/error";
import {
  CursorPagination,
  CursorPaginationResultInterface,
} from "src/common/pagination";
import { CustomError } from "src/common/response";
import { PrismaService } from "src/common/modules/db/prisma.service";
import { CacheService } from "src/common/modules/cache/cache.service";
import { prismaOffsetPagination } from "src/utils/prisma";
import {
  CreateProductDto,
  ProductSort,
  GetAllProductsDto,
  UpdateProductDto,
  CreateCategoryDto,
  CreateTagDto,
  UpdateTagDto,
  UpdateCategoryDto,
} from "./dto";
import { OrderDirection } from "../common/dto";
@Injectable()
export class ProductService {
  constructor(
    private readonly db: PrismaService,
    private readonly cache: CacheService
  ) {}

  async getAllProducts(
    options: GetAllProductsDto
  ): Promise<CursorPaginationResultInterface<Partial<Product>>> {
    try {
      let {
        price,
        category,
        tags,
        sort,
        cursor,
        size = 10,
        buttonNum = 10,
        orderBy = "createdAt",
        orderDirection = OrderDirection.asc,
        q,
      } = options;

      switch (sort) {
        case ProductSort.new: {
          orderBy = "updatedAt";
          orderDirection = OrderDirection.asc;
          break;
        }
        case ProductSort.bestSelling: {
          orderBy = "updatedAt";
          orderDirection = OrderDirection.desc;
          break;
        }
        case ProductSort.relevant: {
          orderBy = "updatedAt";
          orderDirection = OrderDirection.desc;
          break;
        }
        case ProductSort.trending: {
          orderBy = "updatedAt";
          orderDirection = OrderDirection.desc;
          break;
        }
      }

      const result = await prismaOffsetPagination({
        cursor,
        size: Number(size),
        buttonNum: Number(buttonNum),
        orderBy,
        orderDirection,
        model: "product",
        where: {
          ...(price ? { price: { gte: +price[0], lte: +price[1] } } : {}),
          ...(category ? { categories: { some: { value: category } } } : {}),
          ...(tags
            ? {
                tags: {
                  some: {
                    OR: Array.isArray(tags)
                      ? tags.map((t) => ({ value: t }))
                      : [{ value: tags }],
                  },
                },
              }
            : {}),
          ...(q
            ? {
                OR: [
                  {
                    title: {
                      contains: q,
                      mode: "insensitive",
                    },
                  },
                  {
                    description: {
                      contains: q,
                      mode: "insensitive",
                    },
                  },
                ],
              }
            : {}),
        },
        include: {
          categories: true,
          tags: true,
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
        tags: true,
        categories: true,
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

  async getProducts(options: GetAllProductsDto): Promise<any> {
    let {
      price,
      category,
      tags,
      sort,
      cursor,
      size = 10,
      buttonNum = 10,
      orderBy = "createdAt",
      orderDirection = OrderDirection.asc,
    } = options;
    const products = await this.db.product.findMany({
      where: {
        ...(price ? { price: { gte: +price[0], lte: +price[1] } } : {}),
        ...(category ? { categories: { some: { value: category } } } : {}),
        ...(tags
          ? {
              tags: {
                some: {
                  OR: Array.isArray(tags)
                    ? tags.map((t) => ({ value: t }))
                    : [{ value: tags }],
                },
              },
            }
          : {}),
      },
      include: {
        tags: true,
        categories: true,
        inventory: true,
        images: true,
      },
    });
    if (!products) {
      throw new CustomError(
        "Product does not exist",
        errorCodes.RecordDoesNotExist
      );
    }
    return products;
  }

  async createProduct(userId: string, data: CreateProductDto): Promise<any> {
    try {
      const { inventory, images, categories, tags, ...productData } = data;
      const dataObj = {
        ...productData,
        inventory: {
          create: inventory,
        },
      };
      if (images.length > 0) {
        dataObj["images"] = {
          createMany: {
            data: images.map((item) => ({
              id: item.id,
              url: item.url,
              userId,
              contentType: item.contentType,
              fileType: item.fileType,
              active: true,
            })),
          },
        };
      }
      if (tags.length > 0) {
        dataObj["tags"] = {
          connect: tags.map((tag) => ({ value: tag })),
        };
      }

      if (categories.length > 0) {
        dataObj["categories"] = {
          connect: categories.map((category) => ({ label: category })),
        };
      }
      const product = await this.db.product.create({
        data: dataObj,
        include: {
          categories: true,
          tags: true,
          inventory: true,
          images: {
            select: {
              url: true,
              contentType: true,
            },
          },
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

  async updateProduct(
    userId: string,
    productId: string,
    update: UpdateProductDto
  ): Promise<any> {
    try {
      const { inventory, images, tags, categories, ...productData } = update;
      const updateData = productData;
      if (images && images.length > 0) {
        updateData["images"] = {
          createMany: {
            data: images?.map((item) => ({ ...item, userId })),
          },
        };
      }
      if (inventory) {
        updateData["inventory"] = {
          update: inventory,
        };
      }
      if (tags) {
        updateData["tags"] = {
          set: tags?.map((tag) => ({ value: tag })),
        };
      }
      if (categories) {
        updateData["categories"] = {
          set: categories?.map((category) => ({ value: category })),
        };
      }

      const data = await this.db.product.update({
        where: { id: productId },
        data: updateData,
        include: {
          categories: true,
          tags: true,
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
  async getCategories(): Promise<any> {
    try {
      const categories = await this.db.category.findMany({
        include: {
          images: {
            select: {
              url: true,
              contentType: true,
            },
          },
        },
        take: 20,
      });
      return categories;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "ProductService.getCategories"
      );
    }
  }

  async createCategory(userId: string, data: CreateCategoryDto): Promise<any> {
    try {
      const { images, ...rest } = data;

      const dataObj = {
        label: rest.label,
        value: rest.value,
      };
      if (images && images.length > 0) {
        dataObj["images"] = {
          createMany: {
            data: images.map((item) => ({
              fileType: item.fileType,
              id: item.id,
              contentType: item.contentType,
              url: item.url,
              userId,
            })),
          },
        };
      }
      if (data.styles) {
        dataObj["styles"] = rest.styles;
      }
      const category = await this.db.category.create({
        data: dataObj,
        include: {
          images: {
            select: {
              url: true,
              contentType: true,
            },
          },
        },
      });
      return category;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "ProductService.findAllOffset"
      );
    }
  }

  async createCategories(
    userId: string,
    data: CreateCategoryDto[]
  ): Promise<any> {
    try {
      const results = await Promise.all(
        data.map((item) => this.createCategory(userId, item))
      );
      return results;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "ProductService.findAllOffset"
      );
    }
  }

  async updateCategory(userId: string, data: UpdateCategoryDto): Promise<any> {
    try {
      const { images, ...rest } = data;

      const dataObj = {
        label: rest.label,
        value: rest.value,
      };
      if (images && images.length > 0) {
        dataObj["images"] = {
          createMany: {
            data: images.map((item) => ({
              fileType: item.fileType,
              id: item.id,
              contentType: item.contentType,
              url: item.url,
              userId,
            })),
          },
        };
      }
      if (data.styles) {
        dataObj["styles"] = rest.styles;
      }
      const category = await this.db.category.update({
        where: {
          label: data.label,
        },
        data: dataObj,
        include: {
          images: {
            select: {
              url: true,
              contentType: true,
            },
          },
        },
      });
      return category;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "ProductService.findAllOffset"
      );
    }
  }

  async updateCategories(
    userId: string,
    data: UpdateCategoryDto
  ): Promise<any> {
    try {
      const { images, ...rest } = data;
      const imageData = images.map((item) => ({ ...item, userId }));
      const categories = await this.db.category.update({
        where: { label: data.label },
        data: {
          ...rest,
          images: {
            createMany: { data: imageData },
          },
        },
      });
      return categories;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "ProductService.updateCategories"
      );
    }
  }

  async deleteCategories(
    userId: string,
    data: CreateCategoryDto
  ): Promise<any> {
    try {
      const deleted = await this.db.category.update({
        where: {
          label: data.label,
        },
        data: {
          active: false,
        },
      });
      return deleted;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "ProductService.deleteTags"
      );
    }
  }

  async getTags(): Promise<any> {
    try {
      const tags = await this.db.tag.findMany({});
      return tags;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "ProductService.getCategories"
      );
    }
  }

  async createTags(data: CreateTagDto): Promise<any> {
    try {
      const tags = await this.db.tag.createMany({
        data: data.data,
      });
      return tags;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "ProductService.findAllOffset"
      );
    }
  }

  async updateTags(data: UpdateTagDto): Promise<any> {
    try {
      // TODO: find beter way??
      const update = await Promise.all(
        data.data.map((tag) => {
          return this.db.tag.update({
            where: { value: tag.value },
            data: {
              label: tag.label,
            },
          });
        })
      );
      return update;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "ProductService.findAllOffset"
      );
    }
  }

  async deleteTags(data: UpdateTagDto): Promise<any> {
    try {
      const tags = await this.db.tag.deleteMany({
        where: {
          value: { in: data.data.map((item) => item.value) },
        },
      });
      return tags;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "ProductService.deleteTags"
      );
    }
  }
}
