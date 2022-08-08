import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styles: [
    ` 
      li{
        cursor: pointer;
      }
      li.focus{
        background: lightblue;
      }
    `
  ]
  
})
export class ErrorPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
