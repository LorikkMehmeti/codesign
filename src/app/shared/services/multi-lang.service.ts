import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MultiLangService {

  /**
   * Default language.
   */
  private defaultLanguage = 'en';

  /**
   * @param translate TranslateService
   */
  constructor(private translate: TranslateService) {
  }

  /**
   * Init default language.
   */
  public initLanguage() {
    const currentLanguage = localStorage.getItem('currentLanguage');

    if (currentLanguage) {
      this.translate.use(currentLanguage);
      return;
    }
    this.setLanguage(this.getLanguage());
  }
  /**
   * @param language as string.
   */
  public setLanguage(language: string): void {
    const translate = this.translate;
    translate.setDefaultLang(language);
    translate.use(language);
    localStorage.setItem('currentLanguage', language);
  }

  /**
   * @return Selected language or default language.
   */
  public getLanguage(): string {
    return localStorage.getItem('currentLanguage') || this.defaultLanguage;
  }
}
