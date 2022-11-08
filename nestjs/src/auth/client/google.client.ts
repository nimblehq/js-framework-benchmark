import { HttpService } from '@nestjs/axios';

export class AuthGoogleClient {
  constructor(
    private readonly acccessToken: string,
    private readonly httpService: HttpService,
  ) {}

  async getUserInfo() {
    return this.get('https://www.googleapis.com/oauth2/v2/userinfo');
  }

  private async get(endpointUrl) {
    const requestOptions = {
      headers: {
        Authorization: 'Bearer ' + this.acccessToken,
      },
    };

    return this.httpService.get(endpointUrl, requestOptions);
  }
}
