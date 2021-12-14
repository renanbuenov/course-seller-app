import { Component, OnInit } from '@angular/core';
import {faLaptopCode, faUserGraduate} from '@fortawesome/free-solid-svg-icons';
import {Course} from "../../models/course.model";
import {AuthenticationService} from "../../services/authentication.service";
import {CourseService} from "../../services/course.service";
import {PurchaseService} from "../../services/purchase.service";
import {Purchase} from "../../models/purchase.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  courseList: Array<Course> = [];
  faLaptopCode = faLaptopCode;
  errorMessage: string = "";
  infoMessage: string = "";

  constructor(private authenticationService: AuthenticationService,
              private courseService: CourseService,
              private purchaseService: PurchaseService) { }

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe(data => {
      this.courseList = data;
    });
  }

  purchase(item: Course) {
    if (!this.authenticationService.currentUserValue?.id) {
      this.errorMessage = 'You should login to buy a course';
      return;
    }

    const purchase = new Purchase(this.authenticationService.currentUserValue.id, item.id, item.title, item.price);

    this.purchaseService.savePurchase(purchase).subscribe(data => {
      this.infoMessage = 'Mission is completed';
    }, err => {
      this.errorMessage = 'Unexpected error occurred.';
      console.log(err);
    });
  }

}
