import {
    Prisma,
    Form as FormModel,
    FormResponse as FormResponseModel,
    Ticket as TicketModel,
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

export class Ticket implements TicketModel {
    constructor(partial: Partial<TicketModel>) {
        Object.assign(this, partial)
    }

    id: string
    data: Prisma.JsonValue
    userId: string
    active: boolean
    createdAt: Date
    updatedAt: Date
}
