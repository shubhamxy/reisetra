import { Allow } from 'class-validator'
import { CursorPaginationDTO } from '@app/core'

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
