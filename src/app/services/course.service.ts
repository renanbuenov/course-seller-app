import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {RequestBaseService} from "./request-base.service";
import {AuthenticationService} from "./authentication.service";
import {HttpClient} from "@angular/common/http";
import {Course} from "../models/course.model";
import {Observable} from "rxjs";

const API_URL = environment.BASE_URL + '/gateway/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends RequestBaseService{

  constructor(authenticationService: AuthenticationService, http: HttpClient) {
    super(authenticationService, http);
  }

  saveCourse(course: Course): Observable<any> {
    return this.http.post(API_URL, course, {headers: this.getHeaders});
  }

  deleteCourse(course: Course): Observable<any> {
    return this.http.delete(API_URL + '/' + course.id, {headers: this.getHeaders});
  }

  getAllCourses(): Observable<any> {
    return this.http.get(API_URL);
  }
}
