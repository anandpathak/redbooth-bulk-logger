import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {AppSettings} from '../app.settings';

@Injectable()
export class VerifiedService {
  private url= AppSettings.BACK_END_URL;
  private headers;
  constructor( private http:Http) {
     this.headers = new Headers();
   }

  save_code(code){
    let options = new RequestOptions({headers: this.headers, withCredentials: true });
    return this.http.post(this.url+'store_ccode', {code:code} , options)
    .map((response:Response)=>{
      if(response.status==200)
        return {data:response}
      else
        return {data:'error'}
    });
  }
  process(data){
    let options = new RequestOptions({headers: this.headers,  withCredentials: true });
    return this.http.post(this.url+'process',{data:data}, options)
          .map((response:Response)=>{
            if(response.status ==200)
              return {data:response.text()}
            else
              return {data:'error'};
          });
  }
}
