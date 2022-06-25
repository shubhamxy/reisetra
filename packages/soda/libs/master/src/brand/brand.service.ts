import { Injectable } from '@nestjs/common'
import { DbService } from '@app/db'
import { CreateCompanyDTO } from './dto'
import type { Prisma } from '@prisma/client'
import { ErrorHandler } from '@app/core/decorators'

@Injectable()
export class BrandService {
  constructor(private readonly db: DbService) {}

  @ErrorHandler()
  async getBrands(category?: string): Promise<any> {
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
    return await this.db.company.findMany(findObj)
  }

  @ErrorHandler()
  async createBrand(data: CreateCompanyDTO): Promise<any> {
    return await this.db.company.create({
      data: data,
    })
  }

  @ErrorHandler()
  async updateBrand(data: CreateCompanyDTO): Promise<any> {
    return await this.db.company.update({
      where: {
        name: data.name,
      },
      data: data,
    })
  }

  @ErrorHandler()
  async deleteBrand(data: CreateCompanyDTO): Promise<any> {
    return await this.db.company.delete({
      where: {
        name: data.name,
      },
    })
  }
}
