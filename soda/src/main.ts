require("dotenv").config();

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { setupNestApp, nestOptions } from "./setupNestApp";

async function bootstrap() {
  try {
    console.log("🦺 Bootstrapping Nest App");
    const app = await NestFactory.create(AppModule, nestOptions);
    const config = setupNestApp(app);
    await app.listen(config.port);
  } catch (error) {
    console.log("🤪 Error Bootstrapping Nest App", error);
  }
}

bootstrap();
