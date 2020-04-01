import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {TitleService} from '../../../shared/services/title.service';
import {DesignService} from '../../../shared/services/design/design.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  files: File[] = [];

  public imagePath;
  imgURL: any;
  tools = [
    {name: 'Adobe XD', extension: 'adobe-xd'},
    {name: 'Figma', extension: 'figma'},
    {name: 'Sketch', extension: 'sketch'},
    {name: 'Photoshop', extension: 'photoshop'},
    {name: 'Other tools', extension: 'other'},
  ];
  peopleLoading = false;
  createShot: any;
  activeToast: any;
  showModal = false;
  drafts: any;
  selectedItem = -1;
  imagePreview;
  imagetoPreview;

  uploadedProgress = 0;

  constructor(private design: DesignService, private title: TitleService, private toast: ToastrService) {
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

    // if (localStorage.getItem('draft_project')) {
    //   this.updateForm(i);
    //   const draftsStorage = localStorage.getItem('draft_project');
    //   let draftStr = JSON.parse(draftsStorage);
    //   draftStr = draftStr.filter((item, index) => {
    //     return index !== i;
    //   });
    //   localStorage.setItem('draft_project', JSON.stringify(draftStr));
    //   this.activeToast = this.toast.show(`Project is now deleted from draft`, 'Draft project');
    //   this.activeToast.toastRef.componentInstance.type = 'success';
    //   this.activeToast.toastRef.componentInstance.toastActive = true;
    // }
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
    console.log(event);
    this.files.push(...event.addedFiles);
  }


  previewCover(event) {
    if (this.imagePreview) {
      console.log('e paske njo');
      this.imagePreview = null;
    }

    this.imagePreview = event.addedFiles[0];

    const reader = new FileReader();
    reader.readAsDataURL(this.imagePreview);
    reader.onload = () => {
      this.imagetoPreview = reader.result;
    };
  }

  onRemove(event) {
    this.imagePreview = null;
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
      selected_tool: this.selected_tool.value.name
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

  onSubmit() {
    if (this.createShot.invalid || !this.imagePreview) {
      this.activeToast = this.toast.show(`All fields are required to create a project`, 'Error');
      this.activeToast.toastRef.componentInstance.type = 'error';
      this.activeToast.toastRef.componentInstance.toastActive = true;
      return;
    }


    const formData = new FormData();
    formData.append('title_project', this.titleProject.value);
    formData.append('desc_project', this.descProject.value);
    formData.append('tool_project', this.selected_tool.value.name);
    formData.append('slug_tool', this.selected_tool.value.extension);
    formData.append('cover_image', this.imagePreview);
    for (let i = 0; i < this.files.length; i++) {
      formData.append('files[]', this.files[i]);
    }

    this.design.createDesign(formData).subscribe((res: any) => {
      this.uploadedProgress = res.message;
      // this.activeToast = this.toast.show(`We are uploading your design`, 'Uploading');
      // this.activeToast.toastRef.componentInstance.type = 'warning';
      // this.activeToast.toastRef.componentInstance.toastActive = true;
      // this.activeToast = this.toast.show(`Projekti u krijua`, 'Success');
      // this.activeToast.toastRef.componentInstance.type = 'success';
      // this.activeToast.toastRef.componentInstance.toastActive = true;

    }, error => {
      console.log('idk');
    });

  }



  getExtension(f) {
    return f.name.split('.').pop();
  }

  getFileName(f) {
    return f.name.replace(/\..+$/, '');
  }

}
