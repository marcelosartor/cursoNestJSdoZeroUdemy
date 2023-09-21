export class AuthTokenEntity {
  constructor(
    private readonly pClient: string = '',
    private readonly pAccessToken: string = '',
  ) {
    (this.client = pClient), (this.accessToken = pAccessToken);
  }
  client: string;
  accessToken: string;
}
