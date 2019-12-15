import {Component, OnInit} from '@angular/core';
import {MultiLangService} from './shared/services/multi-lang.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'codesign';

  /**
   * @param multiLang as MultiLangService.
   */
  constructor(private multiLang: MultiLangService) {
  }

  ngOnInit(): void {
    console.log(window.document.body.attributes);
    this.multiLang.initLanguage();
  }
}
