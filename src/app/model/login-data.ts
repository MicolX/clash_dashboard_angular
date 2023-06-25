import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class LoginData {
    private _ip: string | undefined;
    public get ip(): string | undefined {
        return this._ip;
    }
    public set ip(value: string | undefined) {
        this._ip = value;
    }
    private _port: number | undefined;
    public get port(): number | undefined {
        return this._port;
    }
    public set port(value: number | undefined) {
        this._port = value;
    }
    private _secret: string | undefined;
    public get secret(): string | undefined {
        return this._secret;
    }
    public set secret(value: string | undefined) {
        this._secret = value;
    }
}
