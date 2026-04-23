import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <app-hero></app-hero>
    <section class="featured-projects-section container">
      <div class="section-header">
        <h2 class="section-title">CORE_OPERATIONS.FEATURED_PROJECTS</h2>
        <div class="line-deco"></div>
      </div>
      <app-projects></app-projects>
    </section>
  `,
  styles: [`
    .featured-projects-section {
      padding: 100px 0;
    }
    .section-header {
      margin-bottom: 50px;
    }
  `]
})
export class HomeComponent {}
