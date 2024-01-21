import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from '../../assets/models/result';
import { Observable } from 'rxjs';
import { CourseInfo } from '../../assets/models/CourseInfo';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private api = 'https://hackville-backend.onrender.com/search';

  constructor(private http: HttpClient) {}
  courseCode:string='';
  course_title:string='';
  location:string='';
  description:string='';

  getSearch(searchValue: string): Observable<Result[]> {
    const apiUrl = this.api; // use the base API url
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const body = JSON.stringify({ query: searchValue }); // format the body as a JSON object
    return this.http.post<Result[]>(apiUrl, body, httpOptions);
  }
  
getCourse(query: string, courseCode: string): Observable<any> {
  const apiUrl = this.api; // use the base API url
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  const body = JSON.stringify({ query, course_code: courseCode }); // format the body as a JSON object
  return this.http.post<any>(apiUrl, body, httpOptions);
}


}
