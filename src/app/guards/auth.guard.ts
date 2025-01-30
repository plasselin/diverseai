import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { isAuthenticated } from '../components/auth/auth.selector';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private store: Store, private router: Router) {}

    canActivate(): Observable<boolean | UrlTree> {
        const currentUrl = this.router.url;

        // Bypass AuthGuard for API paths
        if (currentUrl.startsWith('https://diverseai.ca/data/')) {
            return of(true); // Wrap boolean in Observable
        }

        return this.store.pipe(
            select(isAuthenticated),
            take(1),
            map(authenticated => {
                if (authenticated) {
                    return true;
                } else {
                    return this.router.createUrlTree(['/auth/login']);
                }
            })
        );
    }
}
