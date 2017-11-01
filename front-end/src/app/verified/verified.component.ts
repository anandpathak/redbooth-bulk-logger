import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {VerifiedService} from './verified.service';

@Component({
  selector: 'app-verified',
  templateUrl: './verified.component.html',
  styleUrls: ['./verified.component.css']
})
export class VerifiedComponent implements OnInit {
  code ="";
  file;
  message="";
  constructor(private route: ActivatedRoute,private verified_service: VerifiedService ) { }

  upload(){
    this.message="loading..."
    this.verified_service.process(this.file).subscribe(DATA=>{
        this.message="All data loaded except following... \n"+DATA.data;

    });
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['code']) {
        this.code=params['code'];
        this.verified_service.save_code(this.code).subscribe(DATA=>{
          console.log(DATA);
        });
      }
    });
  }

}
