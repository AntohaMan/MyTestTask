import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ValidationPipe } from './pipes/validation.pipe';

async function start() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('MyTestProject')
    .setDescription('Documentation REST API')
    .setVersion('1.0.0')
    .addTag('Antoha_Man')
    .build();
  const documet = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, documet);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  await app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
}
start();
