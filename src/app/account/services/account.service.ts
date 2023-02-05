import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, of, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAddress } from 'src/app/shared/models/address';
import { IUser } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {  
  baseUrl = environment.baseUrl;
  private currenUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currenUserSource.asObservable();

  constructor(private http: HttpClient,
              private router: Router) 
  { }

  loadCurrenyUser(token: string){
    if(token === null){
      this.currenUserSource.next(null);
      return of(null);
    }

    return this.http.get(this.baseUrl + 'account/getCurrentUser')
    .pipe(
      map((user: IUser) => {
        if(user){
          localStorage.setItem("token",user.token);
          this.currenUserSource.next(user);
        }
      })
    );
  }

  login(user: any){
    return this.http.post(this.baseUrl + 'account/login', user)
        .pipe(
          map((user: IUser) => {
            if(user){
              localStorage.setItem("token",user.token);
              this.currenUserSource.next(user);
            }
          })
        );
  }

  register(user: any){
    return this.http.post(this.baseUrl + 'account/register', user)
        .pipe(
          map((user: IUser) => {
            if(user){
              localStorage.setItem("token",user.token);
              this.currenUserSource.next(user);
            }
          })
        );
  }

  logout(){
    localStorage.removeItem('token');
    this.currenUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExsist(email: string){
    return this.http.get(this.baseUrl + 'account/emailExsist?email='+ email);
  }

  getUserAddress(){
    return this.http.get<IAddress>(this.baseUrl + 'account/getUserAddress');
  }

  updateUserAddress(address: IAddress){
    return this.http.put(this.baseUrl + 'account/updateUserAddress', address);
  }

  getMyProfile(){
    return this.http.get(this.baseUrl + 'account/getMyProfile');
  }

  
  updateMyProfile(user: any){
    return this.http.post(this.baseUrl + 'account/updateMyProfile', user);
  }
}
