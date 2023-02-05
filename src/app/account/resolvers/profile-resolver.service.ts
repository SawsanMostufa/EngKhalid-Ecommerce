import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolverService implements Resolve<any[]>{

  constructor(private accountService: AccountService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
    return this.accountService.getMyProfile().pipe(
      catchError(error => {
        this.accountService.logout();
        this.router.navigate(['/login']);
          return of(null);
        })
      )
    }
  }
