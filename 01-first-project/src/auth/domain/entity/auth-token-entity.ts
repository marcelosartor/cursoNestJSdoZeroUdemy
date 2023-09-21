export class AuthTokenEntity {
  constructor(
    private readonly client: string = '',
    private readonly accessToken: string = '',
  ) {
    client = client;
    accessToken = accessToken;
  }
}
