/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common'
import { CustomError } from '@app/core'
import { DbService } from '@app/db'
import { CacheService } from '@app/cache'
import { CreateCompanyDTO } from './dto'
import type { Prisma } from '.prisma/client'

@Injectable()
export class BrandService {
  constructor(
    private readonly db: DbService,
    private readonly cache: CacheService
  ) {}

  async getBrands(category?: string): Promise<any> {
    try {
      const findObj: Prisma.CompanyFindManyArgs = {
        take: 10,
      }
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
        }
      }
      const companies = await this.db.company.findMany(findObj)
      return companies
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'ProductService.getCategories'
      )
    }
  }

  async createBrand(data: CreateCompanyDTO): Promise<any> {
    try {
      const brand = await this.db.company.create({
        data: data,
      })
      return brand
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'ProductService.createBrand'
      )
    }
  }

  async updateBrand(data: CreateCompanyDTO): Promise<any> {
    try {
      const brand = await this.db.company.update({
        where: {
          name: data.name,
        },
        data: data,
      })
      return brand
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'ProductService.createBrand'
      )
    }
  }

  async deleteBrand(data: CreateCompanyDTO): Promise<any> {
    try {
      const brand = await this.db.company.delete({
        where: {
          name: data.name,
        },
      })
      return brand
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'ProductService.deleteBrand'
      )
    }
  }
}
