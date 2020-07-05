import {Component, OnInit} from '@angular/core';
import {MultiLangService} from './shared/services/multi-lang.service';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {SafeHtml, DomSanitizer} from '@angular/platform-browser';
import {withCache} from '@ngneat/cashew';
import {ThemeService} from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'codesign';
  dropdownlang = false;
  getLanguage;
  getInlineSVG: SafeHtml;

  /**
   * @param themeService;
   * @param multiLang as MultiLangService.;
   * @param http;
   * @param sanitizer;
   */
  constructor(private themeService: ThemeService, private multiLang: MultiLangService, private http: HttpClient, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.multiLang.initLanguage();
    this.getLang();

    const theme = this.themeService.getTheme();

    if (theme) {
      document.body.setAttribute('data-theme', theme);
    }


    this.http.get('./assets/images/icons/icons.html', {responseType: 'text'}).pipe(map((res: any) => {
      localStorage.setItem('inline_svg', res);
    }, withCache())).subscribe((res) => {
      this.getInlineSVG = this.sanitizer.bypassSecurityTrustHtml(localStorage.getItem('inline_svg'));
    });
  }

  getLang() {
    this.getLanguage = this.multiLang.getLanguage().toLowerCase();
  }
}
