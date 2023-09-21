export class ClientCredentialDto {
  constructor(
    pClient: string,
    pClientPassword: string,
    pUserName,
    pUserPassword: string,
    pGrantType: string,
  ) {
    this.client = pClient;
    this.clientPassword = pClientPassword;
    this.userName = pUserName;
    this.userPassword = pUserPassword;
    this.grantType = pGrantType;
  }
  client: string;
  clientPassword: string;
  userName: string;
  userPassword: string;
  grantType: string;

  static factoryByBasic(pHeaders, pBody): ClientCredentialDto {
    const basic = pHeaders['authorization'].split(' ')[1];

    return new ClientCredentialDto(
      pBody['client'],
      basic,
      pBody['username'],
      pBody['password'],
      pBody['grant_type'],
    );
  }
}
