import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from '../../assets/models/result';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private api = 'https://hackville-backend.onrender.com/search/null';
  
  constructor(private http: HttpClient) {}
   
  getSearch(searchValue: string): Observable<Result[]> {
    const apiUrl = searchValue ? this.api.replace("null", searchValue) : this.api;
    return this.http.get<Result[]>(apiUrl);
  }
}
