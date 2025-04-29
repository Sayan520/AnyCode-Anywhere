import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ThemeService {
  private readonly storageKey = 'isDarkMode';
  private darkModeSubject: BehaviorSubject<boolean>;

  public isDarkMode$;

  constructor() {
    const savedMode = localStorage.getItem(this.storageKey);
    const initialMode = savedMode === 'true'; // 'true' string from localStorage
    this.darkModeSubject = new BehaviorSubject<boolean>(initialMode);
    this.isDarkMode$ = this.darkModeSubject.asObservable();

    // Apply the class immediately on app load
    document.body.classList.toggle('dark-mode', initialMode);
  }

  toggleTheme(): void {
    const current = this.darkModeSubject.value;
    const next = !current;
    this.darkModeSubject.next(next);
    document.body.classList.toggle('dark-mode', next);
    localStorage.setItem(this.storageKey, String(next)); // save as string
  }

  setDarkMode(isDark: boolean): void {
    this.darkModeSubject.next(isDark);
    document.body.classList.toggle('dark-mode', isDark);
    localStorage.setItem(this.storageKey, String(isDark));
  }
}
