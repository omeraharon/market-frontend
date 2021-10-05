import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialsModel } from 'src/app/models/credentials.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    public credentials = new CredentialsModel();

    constructor(
        private myAuthService: AuthService,
        private notify: NotifyService,
        private myRouter: Router) { }

    public async login() {
        try {
            await this.myAuthService.login(this.credentials);
            this.notify.success("התחברת בהצלחה !");
        }
        catch(err) {
            this.notify.error(err);
        }
    }

}
