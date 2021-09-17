import { nestOptions, setupNestApp } from './core/setupNestApp'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'

async function bootstrap() {
    try {
        const app = await NestFactory.create<NestExpressApplication>(
            AppModule,
            nestOptions
        )
        const config = setupNestApp(app)

        console.log(
            `Starting ${config.name} version ${config.version} on ${config.apiUrl} 🦺`
        )

        await app.listen(config.port)
    } catch (error) {
        console.log('Error Starting App', error)
    }
}

bootstrap()
