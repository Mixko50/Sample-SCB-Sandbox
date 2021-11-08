"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const app_service_1 = require("./app.service");
var accessToken = "";
var expiresAt;
var request;
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello(req, res) {
        console.log(process.env.AUTORIZATION_URL);
        res.send({
            "hello": 5,
            "mixko": 2
        });
    }
    getAutorization(req, res) {
        const data1 = async () => {
            const data = await axios_1.default.get(process.env.AUTORIZATION_URL, {
                headers: {
                    apikey: process.env.SCB_KEY,
                    apisecret: process.env.SCB_SECRET,
                    resourceOwnerId: process.env.SCB_KEY,
                    requestUId: process.env.REQUEST_ID,
                    "response-channel": "mobile",
                    endState: "mobile_app",
                    "accept-language": "EN",
                }
            });
            res.send(data.data);
        };
        data1();
    }
    async getToken(req, res) {
        const data = await axios_1.default.post(process.env.SCB_GET_TOKEN, {
            applicationKey: process.env.SCB_KEY,
            applicationSecret: process.env.SCB_SECRET,
        }, {
            headers: {
                "content-type": "application/json",
                resourceOwnerId: process.env.RESOURCE_OWER_ID,
                requestUId: process.env.REQUEST_ID,
                "accept-language": "EN",
            }
        });
        accessToken = data.data.data.accessToken;
        expiresAt = data.data.data.expiresAt;
        res.send({ token: data.data.data.accessToken });
    }
    async createQr(req, res) {
        try {
            const createdQr = await axios_1.default.post(process.env.CREATE_QR_URL, {
                qrType: "PP",
                amount: "100",
                ppType: "BILLERID",
                ppId: process.env.BILLER_ID,
                ref1: "SANGONOMIYA",
                ref2: "KOKOMI",
                ref3: "KMP"
            }, {
                headers: {
                    "content-type": "application/json",
                    resourceOwnerId: process.env.SCB_KEY,
                    requestUId: process.env.REQUEST_ID,
                    authorization: `Bearer ${accessToken}`,
                }
            });
            res.send(createdQr.data);
        }
        catch (e) {
            console.log(e);
        }
    }
    callback(req, res) {
        request = req.body;
        res.status(200).send("");
    }
    getStatus(req, res) {
        res.send({ request });
    }
    getClear(req, res) {
        request = {
            clear: true
        };
        res.send({ request });
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('/autorization'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getAutorization", null);
__decorate([
    (0, common_1.Get)('/get-token'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getToken", null);
__decorate([
    (0, common_1.Get)('/create-qr'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createQr", null);
__decorate([
    (0, common_1.Post)('/callback'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "callback", null);
__decorate([
    (0, common_1.Get)('/status'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getStatus", null);
__decorate([
    (0, common_1.Get)('/clear'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getClear", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map