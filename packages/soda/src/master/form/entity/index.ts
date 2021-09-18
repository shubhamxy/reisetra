import {
  Form as FormModel,
  FormResponse as FormResponseModel,
  Prisma,
} from '.prisma/client'

export class Form implements FormModel {
  constructor(partial: Partial<FormModel>) {
    Object.assign(this, partial)
  }

  id: string
  data: Prisma.JsonValue

  active: boolean
  createdAt: Date
  updatedAt: Date
}

export class FormResponse implements FormResponseModel {
  constructor(partial: Partial<FormModel>) {
    Object.assign(this, partial)
  }

  id: string
  data: Prisma.JsonValue
  formId: string

  active: boolean
  createdAt: Date
  updatedAt: Date
}
