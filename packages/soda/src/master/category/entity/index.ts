import { Category as CategoryModel } from '.prisma/client'

export class Category implements CategoryModel {
    constructor(partial: Partial<CategoryModel>) {
        Object.assign(this, partial)
    }

    id: string
    label: string
    value: string
    styles: string[]
    active: boolean
    createdAt: Date
    updatedAt: Date
    description: string
}
