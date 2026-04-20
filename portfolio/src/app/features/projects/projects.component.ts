import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [
    {
      id: '1',
      title: 'Skyline Commercial Tower',
      category: 'COMMERCIAL',
      media: [{ url: 'assets/p1.jpg', type: 'image' }]
    },
    {
      id: '2',
      title: 'Riverfront Auto-Bridge',
      category: 'INFRASTRUCTURE',
      media: [{ url: 'assets/p2.jpg', type: 'image' }]
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // Fetch via ProjectService
  }

  trackById(index: number, item: any): string {
    return item.id;
  }

  viewProject(project: any) {
    // Open dialog or navigate to details
    console.log('Viewing project:', project.title);
  }
}
