import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenService implements CanActivateChild {

  constructor(private router: Router) {}
  canActivateChild(): Observable<boolean> {
    if(!localStorage.getItem('userInfo')){
      this.router.navigate(['login']);
    }
    return of(!!localStorage.getItem('userInfo'));
  }

}
