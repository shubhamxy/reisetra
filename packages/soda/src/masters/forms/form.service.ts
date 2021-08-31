import { Injectable } from '@nestjs/common'
import { CustomError } from 'src/core/response'
import { PrismaService } from 'src/core/modules/db/prisma.service'

@Injectable()
export class FormService {
    constructor(private readonly db: PrismaService) {}

    async getFormData(formId: string): Promise<any> {
        try {
            return this.db.form.findFirst({ where: { id: formId } })
        } catch (error) {
            throw new CustomError(
                error?.meta?.cause || error.message,
                error.code,
                'SupportService.getFormData'
            )
        }
    }

    async createFormData(formId: string, data: any): Promise<any> {
        try {
            return this.db.formResponse.create({
                data: {
                    formId,
                    data,
                },
            })
        } catch (error) {
            throw new CustomError(
                error?.meta?.cause || error.message,
                error.code,
                'SupportService.createFormData'
            )
        }
    }
}
