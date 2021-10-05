import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import store from '../redux/store';
import { NotifyService } from './notify.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    public constructor(private notify: NotifyService, private myRouter: Router) { }

    public canActivate(): boolean {

        if (store.getState().authState.user)
            return true;

        this.notify.error("רק משתמש מחובר יכול לגשת לעמוד זה");
        this.myRouter.navigateByUrl("/home");
        return false; 
    }

}
