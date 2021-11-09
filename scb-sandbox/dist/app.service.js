"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let AppService = class AppService {
    getHello() {
        return 'Hello World!';
    }
    async refreshToken(accessToken) {
        var refreshTokenJSON = {
            accessToken: "",
            expiresAt: BigInt(0)
        };
        try {
            const data = await axios_1.default.post(process.env.SCB_REFRESH_TOKEN, {
                applicationKey: process.env.SCB_KEY,
                applicationSecret: process.env.SCB_SECRET,
                refreshToken: accessToken
            }, {
                headers: {
                    "content-type": "application/json",
                    resourceOwnerId: process.env.RESOURCE_OWER_ID,
                    requestUId: process.env.REQUEST_ID,
                    "accept-language": "EN",
                }
            });
            refreshTokenJSON.accessToken = data.data.data.accessToken;
            refreshTokenJSON.expiresAt = data.data.data.accessToken;
            return refreshTokenJSON;
        }
        catch (e) {
            console.log(e);
        }
    }
};
AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map