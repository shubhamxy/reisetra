import { Tag as TagModel } from '@prisma/client'

export class Tag implements TagModel {
  constructor(partial: Partial<TagModel>) {
    Object.assign(this, partial)
  }

  id: string
  styles: string[]
  active: boolean
  createdAt: Date
  updatedAt: Date
  label: string
  value: string
  description: string
}
