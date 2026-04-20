import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  aboutData = {
    description: 'Senior structural engineer with over 10 years of experience designing and analyzing complex civil infrastructures...',
    skills: ['Structural Analysis', 'Load Testing', 'Seismic Design', 'Project Management'],
    tools: ['AutoCAD', 'Revit', 'ETABS', 'SAP2000', 'STAAD.Pro'],
    resumeUrl: '/assets/resume.pdf'
  };

  constructor() { }

  ngOnInit(): void {
    // Fetch from API via AboutService
  }
}
