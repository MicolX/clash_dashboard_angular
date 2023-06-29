import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class ConfigData {
    private _port: number | undefined;
    public get port(): number | undefined {
        return this._port;
    }
    public set port(value: number | undefined) {
        this._port = value;
    }
    private _socksPort: number | undefined;
    public get socksPort(): number | undefined {
        return this._socksPort;
    }
    public set socksPort(value: number | undefined) {
        this._socksPort = value;
    }
    private _redirPort: number | undefined;
    public get redirPort(): number | undefined {
        return this._redirPort;
    }
    public set redirPort(value: number | undefined) {
        this._redirPort = value;
    }
    private _tproxyPort: number | undefined;
    public get tproxyPort(): number | undefined {
        return this._tproxyPort;
    }
    public set tproxyPort(value: number | undefined) {
        this._tproxyPort = value;
    }
    private _allowLan: boolean | undefined;
    public get allowLan(): boolean | undefined {
        return this._allowLan;
    }
    public set allowLan(value: boolean) {
        this._allowLan = value;
    }
    private _mode: string | undefined;
    public get mode(): string | undefined {
        return this._mode;
    }
    public set mode(value: string) {
        this._mode = value;
    }
    private _logLevel: string | undefined;
    public get logLevel(): string | undefined {
        return this._logLevel;
    }
    public set logLevel(value: string) {
        this._logLevel = value;
    }
    private _ipv6: boolean | undefined;
    public get ipv6(): boolean | undefined {
        return this._ipv6;
    }
    public set ipv6(value: boolean) {
        this._ipv6 = value;
    }
}
