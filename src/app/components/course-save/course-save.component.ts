import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Course} from "../../models/course.model";
import {CourseService} from "../../services/course.service";

declare var $: any;

@Component({
  selector: 'app-course-save',
  templateUrl: './course-save.component.html',
  styleUrls: ['./course-save.component.css']
})
export class CourseSaveComponent implements OnInit {

  errorMessage: string = "";

  @Input() course: Course = new Course();
  @Output() save = new EventEmitter<any>();
  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
  }

  saveCourse() {
    this.courseService.saveCourse(this.course).subscribe(data => {
      this.save.emit(data);
      $('#courseModal').modal('hide');

    }, err => {
      this.errorMessage = 'Unexpected error occurred.';
      console.log(err);
    });
  }

  showCourseModal() {
    $('#courseModal').modal('show');
  }

}
