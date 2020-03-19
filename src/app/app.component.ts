import {Component, OnInit} from '@angular/core';
import {MultiLangService} from './shared/services/multi-lang.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'codesign';
  dropdownlang = false;
  getLanguage;
  getInlinedSVG;
  /**
   * @param multiLang as MultiLangService.
   */
  constructor(private multiLang: MultiLangService) {
  }

  ngOnInit(): void {
    this.multiLang.initLanguage();
    this.getLang();

    this.getInlinedSVG = localStorage.getItem('draft_project');
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
