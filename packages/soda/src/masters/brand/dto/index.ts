import { Company } from '../entity'

type Excluded = 'id' | 'active' | 'createdAt' | 'updatedAt' | 'extra'

export class CreateCompanyDTO implements Omit<Company, Excluded> {
    id: string
    name: string
}
