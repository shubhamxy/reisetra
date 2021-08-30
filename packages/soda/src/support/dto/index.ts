import { Allow } from 'class-validator'

export class CreateSupportTicketDto {
    @Allow()
    subject: string

    @Allow()
    description: string

    @Allow()
    orderId?: string

    @Allow()
    ticketId?: string
}

export class GetFormDataDto {
    @Allow()
    formId: string
}

export class CreateFormDataDto {}
