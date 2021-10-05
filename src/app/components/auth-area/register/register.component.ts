import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import CartModel from 'src/app/models/cart.model';
import { CustomerModel } from 'src/app/models/customer.model';
import { cartAddedAction } from 'src/app/redux/carts-state';
import store from 'src/app/redux/store';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    public firstStep = false;
    public user = new CustomerModel();

    constructor(
        private myAuthService: AuthService,
        private notify: NotifyService,
        private myRouter: Router) { }

    public ngOnInit() {
        if(store.getState().authState.user) {
            this.myRouter.navigateByUrl("/home");
            this.notify.error("משתמש מחובר אינו יכול להירשם");
            return;
        }
    }

    public async firstStepOfRegister() {
        try {
            if(this.user.confirmPassword !== this.user.password) {
                this.notify.error("אישור סיסמא אינו תואם");
                this.firstStep = false;
                return;
            }
            await this.myAuthService.checkDetails(this.user.email, this.user.idNumber);
            delete this.user.confirmPassword;
            this.firstStep = true;
        }
        catch(err) {
            this.notify.error(err);
        }
    }

    public previous() {this.firstStep = false};

    public async register() {
        try {
            await this.myAuthService.register(this.user);
            this.notify.success("נרשמת בהצלחה !");
            this.myRouter.navigateByUrl("/home");
            store.dispatch(cartAddedAction(null));
        }
        catch(err) {
            this.notify.error(err);
        }
    }

}
