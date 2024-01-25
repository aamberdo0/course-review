import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../services/course.service';
import { CourseInfo } from '../../assets/models/CourseInfo';
import { Review } from '../../assets/models/Review';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'], // corrected typo
})
export class DetailsComponent implements OnInit {
  currentCode!: string;
  courseDetails!: CourseInfo;
  reviews!: Review[];
  evaluation!: any;
  workload!: any;
  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.passRoute();
    this.fetchCredits(this.currentCode, this.currentCode);
  }

  passRoute() {
    this.route.params.subscribe((params) => {
      this.currentCode = params['code'].toString();
    });
  }

  fetchCredits(courseCode: string, code: string) {
    this.courseService.getCourse(code, code).subscribe((results) => {
      const response = results.response[0];
      this.courseDetails = new CourseInfo(
        response.course_code,
        response.course_title,
        response.location,
        response.description,
        (this.evaluation = response.evaluation),
        (this.workload = response.workload)
      );
      this.reviews = response.reviews;

      console.log(this.reviews);
    });
  }
  isEvaluationVisible: boolean = false;
  toggleEvaluationVisibility() {
    this.isEvaluationVisible = !this.isEvaluationVisible;
  }
  thumbsUpCount = 0;
  thumbsDownCount = 0;

  handleThumbsUp(review: Review) {
    review.upvote++;
  }

  handleThumbsDown(review: Review) {
    if (review.downvote === 0) {
      review.downvote++;
    }
  }
}