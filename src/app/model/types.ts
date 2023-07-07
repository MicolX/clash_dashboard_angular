export interface ConfigData {
    port: number,
    'socks-port': number,
    'redir-port': number,
    'tproxy-port': number,
    'mixed-port': number,
    'allow-lan': boolean,
    'bind-address': string,
    mode: string,
    'log-level': string,
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

export const TITLE = 'clash-dashboard-angular';