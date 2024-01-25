import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from '../../assets/models/result';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private api = 'https://hackville-backend.onrender.com/search';

  constructor(private http: HttpClient) {}

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
