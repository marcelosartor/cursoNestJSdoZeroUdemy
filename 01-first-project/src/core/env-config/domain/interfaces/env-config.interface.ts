export interface EnvConfig {
  getAppPort(): number;
  getNodeEnv(): string;

  getJwtSecret(): string;
  getJwtExpiresInSeconds(): number;

  getDbHost(): string;
  getDbPort(): number;
  getDbName(): string;
  getDbUser(): string;
  getDbPassword(): string;
}
