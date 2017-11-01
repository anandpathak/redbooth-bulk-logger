import { Component, OnInit } from '@angular/core';
import {AuthService} from './auth.service';
import {AppSettings} from '../app.settings';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  data={};
  url= AppSettings.FRONT_END_URL+'verified';
  constructor(private authService: AuthService) { }

  ngOnInit() {

    this.authService.get_client_id()
      .subscribe((DATA) => {
        console.log(DATA);
        this.data =DATA;
        window.location.href='https://redbooth.com/oauth2/authorize?client_id='+DATA.client_id+
              '&response_type=code&redirect_uri='+this.url;
      });
  }

}
