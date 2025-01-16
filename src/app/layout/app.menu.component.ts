// app.menu.component.ts
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    styleUrls: [ './layoutstyles.scss' ],
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'DiverseAI',
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'Home',
                        icon: 'material-icons-outlined home',
                        routerLink: ['/'],
                    },
                ],
            },
            {
                label: 'Sample Project',
                icon: 'material-icons-outlined smart_toy',
                items: [
                    {
                        label: 'Project Info',
                        icon: 'material-icons-outlined info',
                        routerLink: ['/info'],
                    },
                    {
                        label: 'Final Result',
                        icon: 'material-icons-outlined chat_info',
                        routerLink: ['/assistant'],
                    },
                ],
            },

        ];
    }
}
