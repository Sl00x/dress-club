import { ArgumentsHost, Catch, HttpException, HttpStatus } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Response } from "express";
import { QueryFailedError } from "typeorm";

export const CodeError = {
  "23502": "Need to fill all fields",
  "23503": "Primary key not matching with parent table",
  "23505": "Data already exist in table",
  "23514": "Failed to update data",
  "22P02": "Data type is not valid",
  "42703": "Column not define",
  "42P01": "Table not exist in database",
  "42P02": "Missing parameters",
};

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = "Internal server error";
    let data: string | object | null = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
      data = exception.getResponse();
    } else if (exception instanceof QueryFailedError) {
      status = HttpStatus.CONFLICT;
      message = CodeError[exception.driverError.code];
    }

    if (exception instanceof QueryFailedError || status === HttpStatus.INTERNAL_SERVER_ERROR) {
      console.error(exception);
    }

    response.status(status).json({
      statusCode: status,
      message,
      data,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
