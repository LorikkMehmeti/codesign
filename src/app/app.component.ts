import {Component, OnInit} from '@angular/core';
import {MultiLangService} from './shared/services/multi-lang.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'codesign';
  hehe = false;

  /**
   * @param multiLang as MultiLangService.
   */
  constructor(private multiLang: MultiLangService) {
  }

  ngOnInit(): void {
    this.multiLang.initLanguage();
  }

  setLanguage(lang) {
    this.multiLang.setLanguage(lang);
  }
}
