import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  files: File[] = [];

  public imagePath;
  imgURL: any;


  constructor() {
  }

  ngOnInit() {
  }

  preview(event) {
    this.onRemove(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

}
