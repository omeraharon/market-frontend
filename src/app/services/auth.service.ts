import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CredentialsModel } from '../models/credentials.model';
import { CustomerModel } from '../models/customer.model';
import { userLoggedInAction, userLoggedOutAction, userRegisteredAction } from '../redux/auth-state';
import store from '../redux/store';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }

    public async register(user: CustomerModel) {
        const addedUser = await this.http.post<CustomerModel>(environment.registerUrl, user).toPromise();
        store.dispatch(userRegisteredAction(addedUser));
        return addedUser;
    }

    public async login(credentials: CredentialsModel) {
        const loggedInUser = await this.http.post<CustomerModel>(environment.loginUrl, credentials).toPromise();
        store.dispatch(userLoggedInAction(loggedInUser));
        return loggedInUser;
    }

    public async checkDetails(email: string, idNumber: string) {
        return await this.http.post(environment.checkUrl, {email, idNumber}).toPromise();
    }

    public logout() {
        store.dispatch(userLoggedOutAction());
    }
    
}
