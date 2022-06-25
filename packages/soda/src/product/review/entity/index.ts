import { Review as ReviewModal } from '@prisma/client'

export class Review implements ReviewModal {
  id: string
  rating: number
  title: string
  description: string
  productId: string

  constructor(partial: Partial<ReviewModal>) {
    Object.assign(this, partial)
  }

  userId: string
  active: boolean
  published: boolean
  createdAt: Date
  updatedAt: Date
}
