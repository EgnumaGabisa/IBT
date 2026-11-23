import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { Request } from "express";
import { Observable, tap } from "rxjs";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger("HTTP");
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = ctx.switchToHttp().getRequest<Request>();
    const started = Date.now();
    const requestId = req.headers["x-request-id"];
    const handler = ctx.getClass().name + "." + ctx.getHandler().name;
    return next.handle().pipe(tap({
      next: () => this.logger.log("[" + requestId + "] " + req.method + " " + req.url + " -> " + handler + " (ok) " + (Date.now() - started) + "ms"),
      error: (err: Error) => this.logger.error("[" + requestId + "] " + req.method + " " + req.url + " -> " + handler + " (" + err.name + ") " + (Date.now() - started) + "ms"),
    }));
  }
}
