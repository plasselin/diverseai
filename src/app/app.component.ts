import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './app.reducer';
import { AuthState } from './components/auth/auth.state';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig,
                private store: Store<AppState>) {
        this.authState$ = this.store.select('auth');
    }

    authState$: Observable<AuthState>;

    ngOnInit(): void {
        this.primengConfig.ripple = true;

        this.authState$.subscribe((authState) => {
            console.log('Auth State:', authState);
        });
    }

}
