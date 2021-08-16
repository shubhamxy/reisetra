/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { Product } from ".prisma/client";
import { Injectable } from "@nestjs/common";
import { errorCodes } from "src/common/codes/error";
import { CursorPaginationResultInterface } from "src/common/pagination";
import { CustomError } from "src/common/response";
import { PrismaService } from "src/common/modules/db/prisma.service";
import { CacheService } from "src/common/modules/cache/cache.service";
import { prismaOffsetPagination } from "src/utils/prisma";
import urlSlug from "url-slug";
import {
    CreateProductDto,
    ProductSort,
    GetAllProductsDto,
    UpdateProductDto,
    CreateCategoryDto,
    CreateTagDto,
    UpdateTagDto,
    UpdateCategoryDto,
    CreateCompanyDto,
    GetAllTagsDto,
} from "./dto";
import { OrderDirection } from "../common/dto";
import type { Prisma } from ".prisma/client";

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
            const whereObj: Prisma.ProductWhereInput = {};
            let {
                price,
                category,
                tags,
                brands,
                sort,
                cursor,
                size = 10,
                buttonNum = 10,
                orderBy = "createdAt",
                orderDirection = OrderDirection.asc,
                q,
                rating,
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

            if (q) {
                whereObj.OR = [
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
                ];
            }

            if (price) {
                whereObj.price = { gte: +price[0], lte: +price[1] };
            }

            if (tags) {
                whereObj.tags = {
                    some: {
                        OR: Array.isArray(tags)
                            ? tags.map((t) => ({ label: t }))
                            : [{ label: tags }],
                    },
                };
            }

            if (brands) {
                whereObj.brand = {
                    in: brands,
                };
            }

            if (category) {
                whereObj.categories = { some: { label: category } };
            }

            if (rating) {
                whereObj.rating = {
                    gte: +rating,
                };
            }

            const result = await prismaOffsetPagination({
                cursor,
                size: Number(size),
                buttonNum: Number(buttonNum),
                orderBy,
                orderDirection,
                model: "product",
                where: whereObj,
                include: {
                    categories: true,
                    tags: true,
                    inventory: true,
                    images: {
                        select: {
                            url: true,
                        },
                    },
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

    async getRecommendations(
        options: GetAllProductsDto
    ): Promise<CursorPaginationResultInterface<Partial<Product>>> {
        try {
            const whereObj: any = {};
            let {
                price,
                category,
                tags,
                brands,
                sort,
                cursor,
                size = 10,
                buttonNum = 10,
                orderBy = "createdAt",
                orderDirection = OrderDirection.asc,
                q,
                rating,
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

            if (q) {
                whereObj.OR = [
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
                ];
            }

            if (price) {
                whereObj.price = { gte: +price[0], lte: +price[1] };
            }

            if (tags) {
                whereObj.tags = {
                    some: {
                        OR: Array.isArray(tags)
                            ? tags.map((t) => ({ label: t }))
                            : [{ label: tags }],
                    },
                };
            }

            if (brands) {
                whereObj.brand = {
                    in: brands,
                };
            }

            if (category) {
                whereObj.categories = { some: { label: category } };
            }

            if (rating) {
                whereObj.rating = {
                    gte: +rating,
                };
            }

            const result = await prismaOffsetPagination({
                cursor,
                size: Number(size),
                buttonNum: Number(buttonNum),
                orderBy,
                orderDirection,
                model: "product",
                where: whereObj,
                include: {
                    categories: true,
                    tags: true,
                    inventory: true,
                    images: {
                        select: {
                            url: true,
                        },
                    },
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

    async getProduct(slug: string): Promise<any> {
        const product = await this.db.product.findUnique({
            where: { slug },
            include: {
                tags: true,
                categories: true,
                inventory: true,
                images: {
                    select: {
                        url: true,
                    },
                },
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
        const {
            price,
            category,
            tags,
            sort,
            cursor,
            size = 10,
            buttonNum = 10,
            orderBy = "createdAt",
            orderDirection = OrderDirection.asc,
            rating,
            q,
        } = options;

        const whereObj: Prisma.ProductWhereInput = {};
        if (price) {
            whereObj.price = { gte: +price[0], lte: +price[1] };
        }

        if (tags) {
            whereObj.tags = {
                some: {
                    OR: Array.isArray(tags)
                        ? tags.map((t) => ({ label: t }))
                        : [{ label: tags }],
                },
            };
        }

        if (category) {
            whereObj.categories = { some: { label: category } };
        }

        if (q) {
            whereObj.OR = [
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
            ];
        }

        if (rating) {
            whereObj.rating = {
                gt: +rating,
            };
        }

        const products = await this.db.product.findMany({
            where: {
                ...whereObj,
            },
            include: {
                tags: true,
                categories: true,
                inventory: true,
                images: {
                    select: {
                        url: true,
                    },
                },
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
            const {
                inventory,
                brand,
                images,
                categories,
                tags,
                ...productData
            } = data;
            const dataObj: Prisma.XOR<
                Prisma.ProductCreateInput,
                Prisma.ProductUncheckedCreateInput
            > = {
                ...productData,
                inventory: {
                    create: inventory,
                },
                slug: productData.slug || urlSlug(productData.title),
            };

            if (brand) {
                dataObj.company = {
                    connectOrCreate: {
                        create: {
                            name: brand,
                        },
                        where: {
                            name: brand,
                        },
                    },
                };
            }

            if (images.length > 0) {
                dataObj.images = {
                    connectOrCreate: images.map((item) => ({
                        create: {
                            url: item.url,
                            contentType: "image/png",
                            fileType: "images",
                            userId,
                        },
                        where: {
                            url: item.url,
                        },
                    })),
                };
            }

            if (tags.length > 0) {
                dataObj.tags = {
                    connect: tags.map((tag) => ({ label: tag })),
                };
            }

            if (categories.length > 0) {
                dataObj.categories = {
                    connect: categories.map((category) => ({
                        label: category,
                    })),
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
                            meta: true,
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
        slug: string,
        update: UpdateProductDto
    ): Promise<any> {
        try {
            const {
                inventory,
                images,
                tags,
                categories,
                ...productData
            } = update;

            const updateData: any = productData;

                        if (images && images.length > 0) {
                            updateData.images = {
                                connectOrCreate: images.map((item) => ({
                                    create: {
                                        url: item.url,
                                        fileType: item.fileType,
                                        meta: item.meta,
                                        userId,
                                    },
                                    where: {
                                        url: item.url,
                                    },
                                })),
                                update: images.map((item) => ({
                                    data: {
                                        url: item.url,
                                        fileType: item.fileType,
                                        meta: item.meta,
                                        userId,
                                    },
                                    where: {
                                        url: item.url,
                                    },
                                })),
                            };
                        }

            if (inventory) {
                updateData.inventory = {
                    update: inventory,
                };
            }
            if (tags) {
                updateData.tags = {
                    set: tags?.map((tag) => ({ label: tag })),
                };
            }
            if (categories) {
                updateData.categories = {
                    set: categories?.map((category) => ({ label: category })),
                };
            }

            
            const productUpdate: Prisma.XOR<
                Prisma.ProductUpdateArgs,
                Prisma.ProductUncheckedUpdateInput
            > = {
                where: { slug },
                data: updateData,
                include: {
                    categories: true,
                    tags: true,
                    inventory: true,
                    images: {
                        select: {
                            url: true,
                        },
                    },
                },
            };
            const data = await this.db.product.update(productUpdate);
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
                    images: {
                        select: {
                            url: true,
                        },
                    },
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
                            meta: true,
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

    async createCategory(
        userId: string,
        data: CreateCategoryDto
    ): Promise<any> {
        try {
            const { images, ...rest } = data;

            const dataObj: Prisma.XOR<
                Prisma.CategoryCreateInput,
                Prisma.CategoryUncheckedCreateInput
            > = {
                label: rest.label,
                value: rest.value,
            };

            if (images && images.length > 0) {
                dataObj.images = {
                    connectOrCreate: images.map((item) => ({
                        create: {
                            fileType: item.fileType,
                            url: item.url,
                            meta: item.meta,
                            userId,
                        },
                        where: {
                            url: item.url,
                        },
                    })),
                };
            }

            if (data.styles) {
                dataObj.styles = rest.styles;
            }
            const category = await this.db.category.create({
                data: dataObj,
                include: {
                    images: {
                        select: {
                            url: true,
                            meta: true,
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

    async updateCategory(
        userId: string,
        data: UpdateCategoryDto
    ): Promise<any> {
        try {
            const { images, ...rest } = data;

            const dataObj: Prisma.XOR<
                Prisma.CategoryCreateInput,
                Prisma.CategoryUncheckedCreateInput
            > = {
                label: rest.label,
                value: rest.value,
            };
            if (images && images.length > 0) {
                dataObj.images = {
                    connectOrCreate: images.map((item) => ({
                        create: {
                            fileType: item.fileType,
                            url: item.url,
                            meta: item.meta,
                            userId,
                        },
                        where: {
                            url: item.url,
                        },
                    })),
                };
            }
            if (data.styles) {
                dataObj.styles = rest.styles;
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
                            meta: true,
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

    async getAllTags(options: GetAllTagsDto): Promise<any> {
        try {
            const whereObj = {};
            const {
                cursor,
                size = 10,
                buttonNum = 10,
                orderBy = "createdAt",
                orderDirection = OrderDirection.asc,
            } = options;
            const result = await prismaOffsetPagination({
                cursor,
                size: Number(size),
                buttonNum: Number(buttonNum),
                orderBy,
                orderDirection,
                model: "tag",
                where: whereObj,
                include: {
                    label: true,
                    value: true,
                    description: true,
                    styles: true,
                },
                prisma: this.db,
            });
            return result;
        } catch (error) {
            throw new CustomError(
                error?.meta?.cause || error.message,
                error.code,
                "ProductService.getAllTags"
            );
        }
    }

    async getTags(category?: string): Promise<any> {
        try {
            const findObj: Prisma.TagFindManyArgs = {
                take: 20,
                include: {
                    images: {
                        select: {
                            url: true,
                            meta: true,
                        },
                    },
                },
            };
            if (category) {
                findObj.where = {
                    products: {
                        some: {
                            categories: {
                                some: {
                                    label: category,
                                },
                            },
                        },
                    },
                };
            }
            const tags = await this.db.tag.findMany(findObj);
            return tags;
        } catch (error) {
            throw new CustomError(
                error?.meta?.cause || error.message,
                error.code,
                "ProductService.getCategories"
            );
        }
    }

    async createTag(userId, data: CreateTagDto): Promise<any> {
        try {
            if (data.images && data.images.length > 0) {
                data.images = {
                    connectOrCreate: data.images.map((item) => ({
                        create: {
                            fileType: item.fileType,
                            url: item.url,
                            meta: item.meta,
                            userId,
                        },
                        where: {
                            url: item.url,
                        },
                    })),
                } as any;
            }

            const tags = await this.db.tag.create({
                data: data,
            });
            return tags;
        } catch (error) {
            throw new CustomError(
                error?.meta?.cause || error.message,
                error.code,
                "ProductService.createTag"
            );
        }
    }

    async createTags(data: CreateTagDto[]): Promise<any> {
        try {
            const tags = await this.db.tag.createMany({
                data: data,
            });
            return tags;
        } catch (error) {
            throw new CustomError(
                error?.meta?.cause || error.message,
                error.code,
                "ProductService.createTags"
            );
        }
    }

    async updateTags(data: UpdateTagDto[]): Promise<any> {
        try {
            // TODO: find beter way??
            const update = await Promise.all(
                data.map((tag) => {
                    return this.db.tag.update({
                        where: { label: tag.label },
                        data: {
                            label: tag.label,
                            value: tag.value,
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

    async deleteTags(data: UpdateTagDto[]): Promise<any> {
        try {
            const tags = await this.db.tag.deleteMany({
                where: {
                    label: { in: data.map((item) => item.label) },
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

    async getBrands(category?: string): Promise<any> {
        try {
            const findObj: Prisma.CompanyFindManyArgs = {
                take: 10,
            };
            if (category) {
                findObj.where = {
                    products: {
                        some: {
                            categories: {
                                some: {
                                    label: category,
                                },
                            },
                        },
                    },
                };
            }
            const companies = await this.db.company.findMany(findObj);
            return companies;
        } catch (error) {
            throw new CustomError(
                error?.meta?.cause || error.message,
                error.code,
                "ProductService.getCategories"
            );
        }
    }

    async createBrand(data: CreateCompanyDto): Promise<any> {
        try {
            const brand = await this.db.company.create({
                data: data,
            });
            return brand;
        } catch (error) {
            throw new CustomError(
                error?.meta?.cause || error.message,
                error.code,
                "ProductService.createBrand"
            );
        }
    }

    async updateBrand(data: CreateCompanyDto): Promise<any> {
        try {
            const brand = await this.db.company.update({
                where: {
                    name: data.name,
                },
                data: data,
            });
            return brand;
        } catch (error) {
            throw new CustomError(
                error?.meta?.cause || error.message,
                error.code,
                "ProductService.createBrand"
            );
        }
    }

    async deleteBrand(data: CreateCompanyDto): Promise<any> {
        try {
            const brand = await this.db.company.delete({
                where: {
                    name: data.name,
                },
            });
            return brand;
        } catch (error) {
            throw new CustomError(
                error?.meta?.cause || error.message,
                error.code,
                "ProductService.deleteBrand"
            );
        }
    }
}
