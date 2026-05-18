import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <app-hero></app-hero>
    <app-about></app-about>
    <app-experience></app-experience>
    <app-projects></app-projects>
    <app-blog-list></app-blog-list>
    <app-contact></app-contact>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class HomeComponent {}
