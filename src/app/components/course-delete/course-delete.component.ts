import {Component, EventEmitter, OnInit, Output} from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-course-delete',
  templateUrl: './course-delete.component.html',
  styleUrls: ['./course-delete.component.css']
})
export class CourseDeleteComponent implements OnInit {

  @Output() confirmed = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  deleteCourse() {
    this.confirmed.emit();
    $('#deleteModal').modal('hide');
  }

  showDeleteModal() {
    $('#deleteModal').modal('show');
  }

}
