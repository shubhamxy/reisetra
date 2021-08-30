// require this to be on top
import { setupNestApp, nestOptions } from './setupNestApp'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'

async function bootstrap() {
    try {
        console.log('🦺 Bootstrapping Nest App')
        const app = await NestFactory.create<NestExpressApplication>(
            AppModule,
            nestOptions
        )
        const config = setupNestApp(app)
        await app.listen(config.port)
    } catch (error) {
        console.log('🤪 Error Bootstrapping Nest App', error)
    }
}

bootstrap()
