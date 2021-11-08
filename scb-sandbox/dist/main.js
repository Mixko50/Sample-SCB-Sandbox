"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
require('dotenv').config();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: ["https://scb-sandbox.mixkoap.com", "http://localhost:3000"],
        credentials: true
    });
    await app.listen(8080);
}
bootstrap();
//# sourceMappingURL=main.js.map