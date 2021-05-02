import { HttpException, HttpStatus, UnauthorizedException as UnauthorizedException_, BadRequestException as BadRequestException_ } from "@nestjs/common";
import { BAD_REQUEST } from "src/constants";
import { errorResponse } from "../error";

export const BadRequestException = (message) => new BadRequestException_(errorResponse(BAD_REQUEST, {message}));
export const UnauthorizedException = (message?: string) => new UnauthorizedException_((errorResponse('Unauthorized', undefined, HttpStatus.UNAUTHORIZED)));
