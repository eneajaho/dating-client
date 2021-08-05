import { API_URL } from '@core/tokens';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
})
export class ErrorsComponent implements OnInit {

  constructor(@Inject(API_URL) private api: string, private http: HttpClient) { }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  get401Error(): void {
    this.http.get(`${this.api}/buggy/auth`).subscribe({
      next: res => console.log(res),
      error: err => console.log(err)
    });
  }

  get400Error(): void {
    this.http.get(`${this.api}/buggy/bad-request`).subscribe({
      next: res => console.log(res),
      error: err => console.log(err)
    });
  }


  get404Error(): void {
    this.http.get(`${this.api}/buggy/not-found`).subscribe({
      next: res => console.log(res),
      error: err => console.log(err)
    });
  }

  get500Error(): void {
    this.http.get(`${this.api}/buggy/server-error`).subscribe({
      next: res => console.log(res),
      error: err => console.log(err)
    });
  }

  get400ValidationError(): void {
    this.http.post(`${this.api}/buggy/validation`, {}).subscribe({
      next: res => console.log(res),
      error: err => console.log(err)
    });
  }

}
