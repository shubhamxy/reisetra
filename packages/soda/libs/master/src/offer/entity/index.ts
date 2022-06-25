import { Offer as OfferModel } from '@prisma/client'

export class Offer implements OfferModel {
  constructor(partial: Partial<OfferModel>) {
    Object.assign(this, partial)
  }

  id: string

  label: string
  value: string
  type: string
  description: string
  active: boolean
  createdAt: Date
  updatedAt: Date
}
