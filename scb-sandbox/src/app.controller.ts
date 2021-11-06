import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import axios from 'axios';
import { AppService } from './app.service';

var accessToken: string = ""
var expiresAt: bigint

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(@Req() req, @Res() res): void {
    console.log(process.env.AUTORIZATION_URL);
    res.send({
      "hello": 5,
      "sdfg": 2
    })
  }


  @Get('/autorization')
  getAutorization(@Req() req, @Res() res): void {
    const data1 = async () => {
      const data = await axios.get(process.env.AUTORIZATION_URL, {
        headers: {
          apikey: process.env.SCB_KEY,
          apisecret: process.env.SCB_SECRET,
          resourceOwnerId: process.env.SCB_KEY,
          requestUId: process.env.REQUEST_ID,
          "response-channel": "mobile",
          endState: "mobile_app",
          "accept-language": "EN",
        }
      })
      res.send(data.data)
    }
    data1()
  }

  @Get('/get-token')
  async getToken(@Req() req, @Res() res): Promise<void> {
    // if (expiresAt < Date.now()) {
    //   var token = await this.appService.refreshToken(accessToken)
    //   accessToken = token.accessToken
    //   expiresAt = token.expiresAt
    //   res.send({ token: token.accessToken })
    // }
    const data = await axios.post(process.env.SCB_GET_TOKEN, {
      applicationKey: process.env.SCB_KEY,
      applicationSecret: process.env.SCB_SECRET,
    }, {
      headers: {
        "content-type": "application/json",
        resourceOwnerId: process.env.RESOURCE_OWER_ID,
        requestUId: process.env.REQUEST_ID,
        "accept-language": "EN",
      }
    })
    accessToken = data.data.data.accessToken
    expiresAt = data.data.data.expiresAt
    console.log(expiresAt);

    res.send({ token: data.data.data.accessToken })

  }

  @Get('/create-qr')
  async createQr(@Req() req, @Res() res): Promise<void> {
    // if (expiresAt < Date.now()) {
    //   var token = await this.appService.refreshToken(accessToken)
    //   accessToken = token.accessToken
    //   expiresAt = token.expiresAt
    // }

    try {
      const createdQr = await axios.post(process.env.CREATE_QR_URL, {
        qrType: "PP",
        amount: "100",
        ppType: "BILLERID",
        ppId: process.env.BILLER_ID,
        ref1: "12345678",
        ref2: "123456778",
        ref3: "KMP"
      }, {
        headers: {
          "content-type": "application/json",
          resourceOwnerId: process.env.SCB_KEY,
          requestUId: process.env.REQUEST_ID,
          authorization: `Bearer ${accessToken}`,
        }
      })
      console.log(createdQr);
      res.send(createdQr.data)
    } catch (e) {
      console.log(e);
    }
  }
}
