import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import fastifyHelmet, { type FastifyHelmetOptions } from '@fastify/helmet'
import fastifyCors, { type FastifyCorsOptions } from '@fastify/cors'
import type { FastifyPluginCallback } from 'fastify'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({ logger: true }))

  await app.register<FastifyHelmetOptions>(fastifyHelmet as unknown as FastifyPluginCallback<FastifyHelmetOptions>, {
    contentSecurityPolicy: false
  })

  const config = app.get(ConfigService)
  const allowedOrigins = config.get<string>('corsOrigin', '*')

  await app.register<FastifyCorsOptions>(fastifyCors as unknown as FastifyPluginCallback<FastifyCorsOptions>, {
    origin:
      allowedOrigins === '*'
        ? true
        : allowedOrigins.split(',').map((origin: string) => origin.trim()),
    credentials: true
  })

  app.setGlobalPrefix('api', { exclude: ['health'] })
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  )

  const host = config.get<string>('host', '0.0.0.0')
  const port = config.get<number>('port', 4000)

  await app.listen({ port, host })
  console.info(`API ready at http://${host}:${port}`)
}

bootstrap().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Failed to bootstrap API', error)
  process.exit(1)
})
