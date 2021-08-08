import { OrderStatus } from ".prisma/client";
import { Allow } from "class-validator";
import { CursorPaginationDTO } from "src/common/dto";

export class CreateSupportTicketDto {
  @Allow()
  subject: string;
  @Allow()
  description: string;
  @Allow()
  orderId?: string;
  @Allow()
  ticketId?: string;
}
