import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  backgroundType: 'color' | 'image' | 'video';
  backgroundValue: string;
  fontFamily: string;
  mode: 'light' | 'dark';
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private apiUrl = `${environment.apiUrl}/settings`;
  
  private themeSubject = new BehaviorSubject<ThemeSettings>({
    primaryColor: '#1976d2',
    secondaryColor: '#ffffff',
    backgroundType: 'color',
    backgroundValue: '#f4f6f8',
    fontFamily: 'Inter',
    mode: 'light'
  });
  
  public theme$ = this.themeSubject.asObservable();
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  loadTheme(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      tap(response => {
        if (response && response.data && response.data.theme) {
          const themeFromApi = response.data.theme;
          // Merge API theme with active mode
          const currentMode = this.themeSubject.value.mode;
          this.applyTheme({ ...themeFromApi, mode: currentMode });
        }
      })
    );
  }

  applyTheme(theme: ThemeSettings) {
    if (this.isBrowser) {
      const root = document.documentElement;
      root.style.setProperty('--primary-color', theme.primaryColor);
      root.style.setProperty('--secondary-color', theme.secondaryColor);
      root.style.setProperty('--font-family', theme.fontFamily);
      
      if (theme.backgroundType === 'color') {
        root.style.setProperty('--bg-value', theme.backgroundValue);
      }

      if (theme.mode === 'dark') {
         root.classList.add('dark-mode');
         root.classList.remove('light-mode');
         root.style.setProperty('--text-primary', '#e2e8f0');
         root.style.setProperty('--text-secondary', '#94a3b8');
         root.style.setProperty('--bg-value', '#0f172a'); // Override for default dark
      } else {
         root.classList.add('light-mode');
         root.classList.remove('dark-mode');
         root.style.setProperty('--text-primary', '#1e293b');
         root.style.setProperty('--text-secondary', '#64748b');
         // If no custom color was forced, set standard light bg
         if (theme.backgroundType === 'color') {
           root.style.setProperty('--bg-value', theme.backgroundValue || '#ffffff');
         }
      }
    }
    this.themeSubject.next(theme);
  }

  toggleMode() {
    const currentTheme = this.themeSubject.value;
    const newMode = currentTheme.mode === 'light' ? 'dark' : 'light';
    this.applyTheme({ ...currentTheme, mode: newMode });
  }

  updatePrimaryColor(color: string) {
    const currentTheme = this.themeSubject.value;
    this.applyTheme({ ...currentTheme, primaryColor: color });
  }
}
