import { File } from 'src/master/file/entity'
import { Category } from '../entity'

type Excluded =
  | 'id'
  | 'active'
  | 'createdAt'
  | 'updatedAt'
  | 'extra'
  | 'slug'
  | 'inventoryId'

export class CreateCategoryDTO implements Omit<Category, Excluded> {
  label: string
  value: string
  styles: string[]
  description: string
  images: Omit<File, 'userId'>[]
}

export class UpdateCategoryDTO implements Omit<Category, Excluded> {
  label: string
  value: string
  styles: string[]
  description: string
  images: Omit<File, 'userId'>[]
}
