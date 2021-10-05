import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import store from '../redux/store';
import { NotifyService } from './notify.service';

@Injectable({
    providedIn: 'root'
})

export class AdminGuard implements CanActivate {

    public constructor(private notify: NotifyService, private myRouter: Router) { }

    public canActivate(): boolean {

        if (store.getState().authState.user?.isAdmin)
            return true; 

        this.notify.error("אתה חייב להיות מנהל כדי לגשת לדף זה !");
        this.myRouter.navigateByUrl("/home");
        return false; 
    }

}
