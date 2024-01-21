import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Result } from '../../assets/models/result';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  searchForm!: FormGroup;
  searchResult: Result[] = [];
  constructor(private fb: FormBuilder,
    private courseService:CourseService,
     private http: HttpClient) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchValue: '',
    });
    this.searchForm
      .get('searchValue')
      ?.valueChanges.pipe(
        debounceTime(300), // 300 milliseconds debounce time
        distinctUntilChanged(), // Only emit when the value has changed,
       
      )
      .subscribe(() => {
        this.fetchData();
      });
    this.fetchData();
  }

  fetchData(): void {
    const searchValue = this.searchForm.value.searchValue;
    this.courseService.getSearch(searchValue).subscribe((data:any)=>{
      this.searchResult = data.response;
      
      console.log(this.searchResult);
    },(error) => {
      console.error('Error fetching data:', error);
      // Handle the error or log it for further investigation
    });
  }
  displayFn(result: Result): string {
    return result ? result.course_title : '';
  }
  onSearchSubmit(): void {
    this.fetchData();
  }
}
