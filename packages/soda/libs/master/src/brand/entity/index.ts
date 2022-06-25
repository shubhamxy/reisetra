import { Company as CompanyModel } from '@prisma/client'

export class Company implements CompanyModel {
  constructor(partial: Partial<CompanyModel>) {
    Object.assign(this, partial)
  }

  id: string
  name: string
}
