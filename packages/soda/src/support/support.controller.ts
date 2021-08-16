import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    Post,
    Req,
} from "@nestjs/common";
import { SupportService } from "./support.service";
import { CustomException, SuccessResponse } from "src/common/response";
import { CreateSupportTicketDto } from "./dto";
import { AuthenticatedRequest } from "src/auth/auth.interface";
import { Public } from "src/auth/decorator/public.decorator";

@Controller()
export class SupportController {
    constructor(private readonly support: SupportService) {}
    @Public()
    @Get("form/:formId")
    async getFormData(@Param("formId") formId): Promise<SuccessResponse> {
        try {
            const data = await this.support.getFormData(formId);
            return { data };
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                "SupportController.getFormData"
            );
        }
    }

    @Public()
    @Post("form/:formId")
    async createFormData(
        @Param("formId") formId,
        @Body() body
    ): Promise<SuccessResponse> {
        try {
            const data = await this.support.createFormData(formId, body);
            return { data };
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                "SupportController.createFormData"
            );
        }
    }

    @Post("support")
    async createTicket(
        @Req() request: AuthenticatedRequest,
        @Body() body: CreateSupportTicketDto
    ): Promise<SuccessResponse> {
        try {
            const data = await this.support.createSupportTicket(
                request.user.id,
                request.user.email,
                body
            );
            return { data };
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                "SupportController.createTicket"
            );
        }
    }
}
