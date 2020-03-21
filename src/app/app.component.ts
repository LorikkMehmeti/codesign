import {Component, OnInit} from '@angular/core';
import {MultiLangService} from './shared/services/multi-lang.service';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {SafeHtml, DomSanitizer} from '@angular/platform-browser';
import {withCache} from '@ngneat/cashew';

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
   * @param multiLang as MultiLangService.
   */
  constructor(private multiLang: MultiLangService, private http: HttpClient, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.multiLang.initLanguage();
    this.getLang();

    this.http.get('./assets/images/icons/icons.html', {responseType: 'text'}).pipe(map((res: any) => {
      localStorage.setItem('inline_svg', res);
    }, withCache())).subscribe((res) => {
      this.getInlineSVG = this.sanitizer.bypassSecurityTrustHtml(localStorage.getItem('inline_svg'));
    });
  }

  getLang() {
    this.getLanguage = this.multiLang.getLanguage().toLowerCase();
  }

  toggleLang() {
    this.dropdownlang = !this.dropdownlang;
  }

  setLanguage(lang) {
    this.multiLang.setLanguage(lang);
    this.toggleLang();
  }
}
