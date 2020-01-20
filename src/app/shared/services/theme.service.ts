import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  /**
   * Default theme.
   */
  private defaultTheme = 'dark';

  constructor() {
  }

  /**
   * Init default theme.
   */
  public initLanguage() {

  }

  /**
   * Set default theme.
   *
   * @param theme as string.
   */
  public setLanguage(theme: string): void {

  }

  /**
   * @return Selected language or default language.
   */
  // public getLanguage(): string {
  //
  // }
}
