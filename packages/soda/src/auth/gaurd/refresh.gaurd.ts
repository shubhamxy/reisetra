import { HttpStatus, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { errorCodes, errorTypes } from "../../common/codes/error";
import { CustomException, Exception } from "../../common/response";

@Injectable()
export default class JwtRefreshGuard extends AuthGuard("jwt-refresh-token") {
  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (err || !user) {
      throw new CustomException(
        {
          message: "Authentication Failed",
          code: errorCodes.RefreshAuthFailed,
          context: "JwtRefreshGuard.handleRequest",
          type: errorTypes[errorCodes.RefreshAuthFailed],
        },
        HttpStatus.UNAUTHORIZED
      );
    }
    return user;
  }
}
