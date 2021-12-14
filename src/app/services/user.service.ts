import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {RequestBaseService} from "./request-base.service";
import {AuthenticationService} from "./authentication.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const API_URL = environment.BASE_URL + '/api/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends RequestBaseService{

  constructor(authenticationService: AuthenticationService, http: HttpClient) {
    super(authenticationService, http);
  }

  changeRole(newRole: string): Observable<any> {
    return this.http.put(API_URL + '/change/' + newRole, {}, {headers: this.getHeaders});
  }
}
