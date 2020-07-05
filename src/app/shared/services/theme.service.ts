import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  /**
   * Default theme.
   */
  constructor() {
    this.initTheme();
  }

  /**
   * Init default theme.
   */
  public initTheme() {
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
      this.setTheme(currentTheme);
      return;
    }

    this.setTheme(this.detectTheme());
  }

  /**
   * Set default theme.
   *
   * @param theme as string.
   */
  public setTheme(theme: string): void {
    localStorage.setItem('theme', theme);
    document.body.setAttribute('data-theme', theme);
  }

  public detectTheme(): string {
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (darkMode) {
      return 'dark';
    }

    return 'light';
  }

  /**
   * @return Selected language or default language.
   */
  public getTheme(): string {
    return localStorage.getItem('theme') || this.detectTheme();
  }
}
