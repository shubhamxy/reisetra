import { Prisma } from '@prisma/client'
import { Category } from '../entity'
export type CategoryRO = Partial<
    Category & { images: { meta?: Prisma.JsonValue; url: string }[] }
>
export type CategoriesRO = CategoryRO[]
