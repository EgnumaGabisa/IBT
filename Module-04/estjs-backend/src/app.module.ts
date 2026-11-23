import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { RequestIdMiddleware } from "./common/middleware/request-id.middleware.js";
import { ApiKeyGuard } from "./common/guards/api-key.guard.js";
import { RolesGuard } from "./common/guards/roles.guard.js";
import { LoggingInterceptor } from "./common/interceptors/logging.interceptor.js";
import { TimeoutInterceptor } from "./common/interceptors/timeout.interceptor.js";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [
    { provide: APP_GUARD, useClass: ApiKeyGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_INTERCEPTOR, useClass: TimeoutInterceptor },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes("*");
  }
}
