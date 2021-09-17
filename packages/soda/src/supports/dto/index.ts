import { Allow } from 'class-validator'
import { CursorPaginationDTO } from 'src/core/dto'

export class AllTicketsDTO extends CursorPaginationDTO {}

export class TicketsDTO extends CursorPaginationDTO {}

export class TicketDTO {
    @Allow()
    subject: string

    @Allow()
    description: string

    @Allow()
    orderId?: string

    @Allow()
    ticketId?: string
}

export class GetFormDataDTO {
    @Allow()
    formId: string
}

export class CreateFormDataDTO {}

export class BounceDTO {
    @Allow()
    Message: string

    @Allow()
    Token: string
}
