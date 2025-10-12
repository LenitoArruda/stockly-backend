import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";
import { AlreadyExistsError } from "../errors";

@Catch(AlreadyExistsError)
export class AlreadyExistsErrorFilter implements ExceptionFilter {
    catch(exception: AlreadyExistsError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        response.status(409).json({
            statusCode: 409,
            message: exception.message,
        });
    }
};