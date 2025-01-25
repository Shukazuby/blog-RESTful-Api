import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import * as csurf from 'csurf';
import { AppModule } from './app.module';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';

dotenv.config();

async function bootstrap() {
  const port = process.env.PORT ?? 9595;
  const app = await NestFactory.create(AppModule, { cors: { origin: '*' } });

  const config = new DocumentBuilder()
    .setTitle('BLOG API')
    .setDescription(`The API for BLOG API`)
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'JWT',
    )
    .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(port);
  app.use(helmet());
  app.use(csurf());
  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.enableCors();
}
bootstrap();



