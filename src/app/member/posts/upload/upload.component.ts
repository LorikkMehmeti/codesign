import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {TitleService} from '../../../shared/services/title.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  files: File[] = [];

  public imagePath;
  imgURL: any;
  people = [
    'Adobe XD', 'Illustrator', 'Sketch', 'Figma', 'Invision',
    'Photoshop', 'Affinity', 'Inkscape', 'Other tool'];
  peopleLoading = false;
  createShot: any;
  activeToast: any;
  showModal = false;
  drafts: any;
  selectedItem = -1;

  constructor(private title: TitleService, private toast: ToastrService) {
  }

  ngOnInit() {
    const footer = document.querySelectorAll('.cd-footer-grid')[0] as HTMLElement;
    footer.style.display = 'none';
    this.initForm();

    this.title.setTitle('Create a project :: Codesign');

    if (localStorage.getItem('draft_project')) {
      const draftsStorage = localStorage.getItem('draft_project');
      this.drafts = JSON.parse(draftsStorage);
      setTimeout(() => {
        this.showModal = true;
      }, 1500);
    }
  }

  clickProject(i) {
    if (this.selectedItem === -1) {
      this.activeToast = this.toast.show(`Please select a draft project`, 'Error');
      this.activeToast.toastRef.componentInstance.type = 'error';
      this.activeToast.toastRef.componentInstance.toastActive = true;
    }

    if (localStorage.getItem('draft_project')) {
      this.updateForm(i);
      const draftsStorage = localStorage.getItem('draft_project');
      let draftStr = JSON.parse(draftsStorage);
      draftStr = draftStr.filter((item, index) => {
        return index !== i;
      });
      localStorage.setItem('draft_project', JSON.stringify(draftStr));
      this.activeToast = this.toast.show(`Project is now deleted from draft`, 'Draft project');
      this.activeToast.toastRef.componentInstance.type = 'success';
      this.activeToast.toastRef.componentInstance.toastActive = true;
    }
  }

  updateForm(index: number) {
    const project = localStorage.getItem('draft_project');
    const projectParsed = JSON.parse(project);
    this.createShot.patchValue({
      title_project: projectParsed[index].title_project,
      desc_project: projectParsed[index].desc_project,
      selected_tool: projectParsed[index].selected_tool
    });

    this.showModal = false;
  }

  initForm() {
    this.createShot = new FormGroup({
      title_project: new FormControl(null, [Validators.required]),
      desc_project: new FormControl(null, [Validators.required]),
      selected_tool: new FormControl(null, [Validators.required])
    });
  }

  get titleProject() {
    return this.createShot.get('title_project');
  }

  get descProject() {
    return this.createShot.get('desc_project');
  }

  get selected_tool() {
    return this.createShot.get('selected_tool');
  }


  preview(event) {
    this.onRemove(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  saveToDraft() {
    if (this.createShot.invalid) {
      this.activeToast = this.toast.show(`Title, description and tool are required to save a project on draft`, 'Error');
      this.activeToast.toastRef.componentInstance.type = 'error';
      this.activeToast.toastRef.componentInstance.toastActive = true;

      return;
    }

    const body = {
      title_project: this.titleProject.value,
      desc_project: this.descProject.value,
      selected_tool: this.selected_tool.value
    };

    if (localStorage.getItem('draft_project')) {
      const project = JSON.parse(localStorage.getItem('draft_project'));
      project.push(body);
      localStorage.setItem('draft_project', JSON.stringify(project));
    } else {
      const arrayDraft = [];
      arrayDraft.push(body);
      localStorage.setItem('draft_project', JSON.stringify(arrayDraft));
    }

    this.activeToast = this.toast.show(`Project is saved on draft`, 'Success');
    this.activeToast.toastRef.componentInstance.type = 'success';
    this.activeToast.toastRef.componentInstance.toastActive = true;

  }
}
