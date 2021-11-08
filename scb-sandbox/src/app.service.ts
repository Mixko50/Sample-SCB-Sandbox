import { Injectable, Post } from '@nestjs/common';
import axios from 'axios';
import RefreshToken from './interfaces/refreshToken';

@Injectable()
export class AppService {


  getHello(): string {
    return 'Hello World!';
  }

  async refreshToken(accessToken: string): Promise<RefreshToken> {
    var refreshTokenJSON: RefreshToken = {
      accessToken: "",
      expiresAt: BigInt(0)
    }
    try {
      const data = await axios.post(process.env.SCB_REFRESH_TOKEN, {
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
      })
      refreshTokenJSON.accessToken = data.data.data.accessToken
      refreshTokenJSON.expiresAt = data.data.data.accessToken

      return refreshTokenJSON
    } catch (e) {
      console.log(e);

    }
  }
}
