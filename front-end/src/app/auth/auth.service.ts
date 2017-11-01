import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {AppSettings} from '../app.settings';

@Injectable()
export class AuthService {
  private url= AppSettings.BACK_END_URL+'get_client';
  constructor(private _http:Http) { }

  get_client_id () {
      return this._http.get(this.url)
    .map((response:Response)=>response.json());
  }

}
