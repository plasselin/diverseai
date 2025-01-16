import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import { AppConfig, LayoutService } from './service/app.layout.service';
import {Actions} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {AppState} from "../app.reducer";
import {AuthActions} from "../components/auth/auth.actions";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styleUrl: './app.topbar.scss',
})
export class AppTopbarComponent {
    @ViewChild('menuButton') menuButton!: ElementRef;
    @ViewChild('mobileMenuButton') mobileMenuButton!: ElementRef;

    config!: AppConfig;

    subscription: any;

    constructor(public layoutService: LayoutService,
                public el: ElementRef,
                private store: Store<AppState>,
               ) {
        this.subscription = this.layoutService.configUpdate$.subscribe(
            (config) => {
                this.config = config;
            }
        );
    }

    onMenuButtonClick() {
        this.layoutService.onMenuToggle();
    }

    protected readonly Actions = Actions;

    logoutUser(): void {
        this.store.dispatch(AuthActions.logout());
        console.log('LOGGING OUT');
    }
}
