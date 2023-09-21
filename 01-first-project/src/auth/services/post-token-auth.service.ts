import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EnvConfigService } from 'src/core/env-config/services/env-config.service';
import { AuthTokenEntity } from '../domain/entity/auth-token-entity';
import { Request } from 'express';
import { ClientCredentialDto } from '../domain/dto/client-credential-dto';
import { AuthClient } from '../domain/enum/auth-client';

@Injectable()
export class PostTokenAuthService {
  constructor(
    private jwtService: JwtService,
    private configService: EnvConfigService,
  ) {}

  //async generateJwt(response: any): Promise<AuthTokenEntity> {
  async generateJwt(pHeaders, pBody): Promise<any> {
    const clientCredendial = ClientCredentialDto.factoryByBasic(
      pHeaders,
      pBody,
    );

    if (
      clientCredendial.clientPassword !== AuthClient[clientCredendial.client]
    ) {
      throw new HttpException(
        `[PR01]-Acesso não autorizado`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = { client: clientCredendial.client };
    const options = {};
    const accessToken = await this.jwtService.signAsync(payload, options);
    console.log(accessToken);
    //const token = new AuthTokenEntity('', accessToken);

    return { accessToken };
  }
}
