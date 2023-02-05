import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent implements OnInit {
  baseUrl = environment.baseUrl;
  validationErrors: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  get500Error(){
    this.http.get(this.baseUrl + 'Buggy/serverError').subscribe(response => {
      console.log(response);
    }, err => {
      console.log(err);
    });
  }

  get400Error(){
    this.http.get(this.baseUrl + 'Buggy/badRequest').subscribe(response => {
      console.log(response);
    }, err => {
      console.log(err);
    });
  }

  get404Error(){
    this.http.get(this.baseUrl + 'product/3434').subscribe(response => {
      console.log(response);
    }, err => {
      console.log(err);
    });
  }

  get400ValidationError(){
    this.http.get(this.baseUrl + 'Product/getProduct/dfdfdf').subscribe(response => {
      console.log(response);
    }, err => {
      console.log(err);
      this.validationErrors = err.errors;
    });
  }

}
