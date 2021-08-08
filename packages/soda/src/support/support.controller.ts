import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
} from "@nestjs/common";
import { SupportService } from "./support.service";
import { CustomException, SuccessResponse } from "src/common/response";
import { CreateSupportTicketDto } from "./dto";
import { AuthenticatedRequest } from "src/auth/auth.interface";
@Controller()
export class SupportController {
  constructor(private readonly support: SupportService) {}
  @Post("support")
  async createOrder(
    @Req() request: AuthenticatedRequest,
    @Body() body: CreateSupportTicketDto
  ): Promise<SuccessResponse> {
    try {
      const data = await this.support.createSupportTicket(request.user.id, request.user.email, body);
      return { data };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "SupportController.createOrder"
      );
    }
  }
}
