import { Injectable } from "@nestjs/common";
import { CustomError } from "src/common/response";
import { PrismaService } from "src/common/modules/db/prisma.service";
import { CacheService } from "src/common/modules/cache/cache.service";
import { CreateSupportTicketDto } from "./dto";
import { createParams, sendEmail, supportEmail, supportEmailAck } from "src/utils";
import { ConfigService } from "@nestjs/config";
import { nanoid } from "nanoid";

@Injectable()
export class SupportService {
  constructor(
  ) {}

  async createSupportTicket(userId: string, email: string, data: CreateSupportTicketDto): Promise<any> {
    try {
      const ticketId = data.ticketId || nanoid();
      const results = await Promise.all([sendEmail(supportEmailAck(
        {
          id: userId,
          subject: data.subject,
          email,
          ticketId,
        }
      )),
      sendEmail(supportEmail(
        {
          id: userId,
          email,
          ticketId,
          orderId: data.orderId,
          subject: data.subject,
          description: data.description,
        }
      ))]);
      return results;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "SupportService.createSupport"
      );
    }
  }
}
