// src/app/components/auth/email-confirmation/email-confirmation.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-email-confirmation',
    templateUrl: './email-confirmation.component.html',
    styleUrl: './email-confimation.component.scss',
})
export class EmailConfirmationComponent implements OnInit {
    confirmationMessage: string = '';
    isError: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        const uidb64 = this.route.snapshot.paramMap.get('uidb64');
        const token = this.route.snapshot.paramMap.get('token');

        if (uidb64 && token) {
            this.confirmEmail(uidb64, token);
        } else {
            this.isError = true;
            this.confirmationMessage = 'Invalid confirmation URL.';
        }
    }

    confirmEmail(uidb64: string, token: string): void {
        this.authService.confirmEmail(uidb64, token).subscribe({
            next: () => {
                this.confirmationMessage = 'Your email has been confirmed successfully!';
            },
            error: () => {
                this.isError = true;
                this.confirmationMessage = 'The confirmation link is invalid or has expired.';
            },
        });
    }
}
