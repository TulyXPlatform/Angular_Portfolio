import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-layout-wrapper',
  templateUrl: './layout-wrapper.component.html',
  styleUrls: ['./layout-wrapper.component.scss']
})
export class LayoutWrapperComponent implements OnInit {
  theme$;

  constructor(private themeService: ThemeService) {
    this.theme$ = this.themeService.theme$;
  }

  ngOnInit(): void {
    // Attempt to load remote config without reloading page
    this.themeService.loadTheme().subscribe({
      error: () => console.log('Using default client themes, API isolated or unavailable')
    });
  }

  toggleTheme() {
    this.themeService.toggleMode();
  }
}
