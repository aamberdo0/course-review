import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../services/course.service';
import { CourseInfo } from '../../assets/models/CourseInfo';
import { Review } from '../../assets/models/Review';
import { Location } from '@angular/common';

 
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
  upvote!:string;
  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute, 
    private location:Location
  ) {}

// Assuming you have an array to store star ratings
starRatings: string[] = [];

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

    // Clear the starRatings array before populating it
    this.starRatings = [];

    // Populate the starRatings array
    this.reviews.forEach(review => {
      const upvote = Math.round(review.rating);
      this.upvote= '★'.repeat(upvote);
      
  
    });

    console.log(this.reviews);
  });
}

  ngOnInit(): void {
    this.passRoute();
    this.fetchCredits(this.currentCode, this.currentCode);
  }

  passRoute() {
    this.route.params.subscribe((params) => {
      this.currentCode = params['code'].toString();
    });
  }

  
  isWorkload : boolean = false;
  isEvaluationVisible: boolean = false;
  toggleEvaluationVisibility() {
    this.isEvaluationVisible = !this.isEvaluationVisible;
    
  }
  toggleWorkloadVisibility() {
    this.isWorkload = !this.isWorkload;
    
  }
  thumbsUpCount = 0;
  thumbsDownCount = 0;

  handleThumbsUp(review: Review) {
    const upvote = document.getElementById('upvote');
    if(upvote){
      upvote.style.color='green'
    }

    review.upvote++;
  }
return(){
  this.location.back();
}
  handleThumbsDown(review: Review) {
    const downvote = document.getElementById('downvote');
    if(downvote){
      downvote.style.color='red'
    }

    review.downvote++;
  }
}