export class CourseInfo {
    course_code!: string;
    course_title!: string;
    location!: string;
    description!: string;
    evaluation!: string[];
    workload!: string[];
  
    constructor(
      course_code: string,
      course_title: string,
      location: string,
      description: string,
      evaluation: string[],
      workload: string[]
    ) {
      this.course_code = course_code;
      this.course_title = course_title;
      this.location = location;
      this.description = description;
      this.evaluation = evaluation;
      this.workload = workload;
    }
  }