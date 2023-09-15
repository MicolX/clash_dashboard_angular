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

export interface LogData {
  type: string,
  payload: string
}

export interface Proxy {
  name: string,
  type: string,
  udp: boolean,
  history: [History],
  all?: [string],
  now?: string
}

export interface Provider {
    [name: string]: {
      name: string,
      proxies: [Proxy],
      type: string,
      updatedAt: string,
      vehicleType: string
    }
}

export interface History {
  time: Date,
  delay: number
}

export const TITLE = 'clash-dashboard-angular';