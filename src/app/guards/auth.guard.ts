// src/app/guards/auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { isAuthenticated } from '../components/auth/auth.selector';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private store: Store, private router: Router) {}

    canActivate(): Observable<boolean> {
        return this.store.pipe(
            select(isAuthenticated),
            take(1),
            map(authenticated => {
                if (authenticated) {
                    return true;
                } else {
                    this.router.navigate(['/auth/login']);
                    return false;
                }
            })
        );
    }
}
