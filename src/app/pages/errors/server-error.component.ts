import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface ApiException {
  statusCode: number;
  message: string;
  details: string;
}

@Component({
  selector: 'app-server-error',
  template: `
    <div class="p-5 text-white bg-dark d-flex justify-content-center flex-column"
         style="min-height: 100vh; height: 100%;">
      <a href="/" class="btn btn-primary" style="width: 200px">🏠 Go home</a>
      <h3 class="text-danger mt-5">Internal Server Error 💀</h3>
      <h5>Refreshing 🔄️ the page will make the error disappear!</h5>

      <p>Note: If you are seeing this then Angular 🅰️ is probably not to blame!</p>

      <p>What to do next? 🤔</p>

      <ol>
        <li>Open DevTools.</li>
        <li>Inspect the network tab.</li>
        <li>Check the failing request.</li>
        <li>Examine the request URL - make sure it's correct.</li>
        <li>Reproduce the error in Postman, if you see the same response, then the issue is not in Angular.</li>
      </ol>

      <ng-container *ngIf="error">
        <h6 class="mt-3 text-warning">Error message: </h6>
        <div class="text-danger mt-2 code">{{ error?.message }}</div>
        <p class="text-warning mt-4">
          Following is the stack trace ⚠️ - this is where your investigation should start! 🚀
        </p>
        <div *ngIf="error" class="d-flex justify-content-start flex-column mt-2">
          <div [innerHtml]="error.details | safeHtml" class="code"></div>
        </div>
      </ng-container>

    </div>
  `,
  styles: [ `
    :host { height: 100% }
    .text-white { color: white; }
    .code {
      background-color: black;
      color: #0bac00;
      font-family: monospace;
      padding: 15px 20px;
      border-radius: 5px;
    }
  `]
})
export class ServerErrorComponent implements OnInit {

  error?: ApiException;

  constructor(private router: Router) {
    const navigation = router.getCurrentNavigation();
    this.error = navigation?.extras?.state?.error as ApiException;
  }

  ngOnInit(): void {
    if (this.error === undefined) {
      this.router.navigateByUrl('errors');
    }
  }

}
