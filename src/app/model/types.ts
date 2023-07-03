export interface ConfigData {
    port: number,
    socksPort: number,
    redirPort: number,
    tproxyPort: number,
    mixedPort: number,
    allowLan: boolean,
    bindAddress: string,
    mode: string,
    logLevel: string,
    ipv6: boolean
  }

export interface Version {
    premium: boolean,
    version: string
}

export interface LoginData {
  address: string,
  port: number,
  secret?: string;
}

export const TITLE = 'clash-dashboard-angular';