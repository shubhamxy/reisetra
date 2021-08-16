import { Injectable } from "@nestjs/common";
import { CustomError } from "src/common/response";
import { CreateSupportTicketDto } from "./dto";
import { sendEmail, supportEmail, supportEmailAck } from "src/utils";
import { nanoid } from "nanoid";
import { PrismaService } from "src/common/modules/db/prisma.service";

@Injectable()
export class SupportService {
    constructor(private readonly db: PrismaService) {}
    async getFormData(formId: string): Promise<any> {
        try {
            return this.db.form.findFirst({ where: { id: formId } });
        } catch (error) {
            throw new CustomError(
                error?.meta?.cause || error.message,
                error.code,
                "SupportService.getFormData"
            );
        }
    }

    async createFormData(formId: string, data: any): Promise<any> {
        try {
            return this.db.formResponse.create({
                data: {
                    formId,
                    data,
                },
            });
        } catch (error) {
            throw new CustomError(
                error?.meta?.cause || error.message,
                error.code,
                "SupportService.createFormData"
            );
        }
    }

    async createSupportTicket(
        userId: string,
        email: string,
        data: CreateSupportTicketDto
    ): Promise<any> {
        try {
            const ticketId = data.ticketId || nanoid();
            const results = await Promise.all([
                sendEmail(
                    supportEmailAck({
                        id: userId,
                        subject: data.subject,
                        email,
                        ticketId,
                    })
                ),
                sendEmail(
                    supportEmail({
                        id: userId,
                        email,
                        ticketId,
                        orderId: data.orderId,
                        subject: data.subject,
                        description: data.description,
                    })
                ),
            ]);
            return results;
        } catch (error) {
            throw new CustomError(
                error?.meta?.cause || error.message,
                error.code,
                "SupportService.createSupportTicket"
            );
        }
    }
}
