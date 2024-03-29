import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent {

  @Input() uploading = false;

  @Output() uploaded = new EventEmitter<FileList>();

  uploadIcon = faCloudUploadAlt as IconProp;

  isHovering = false;

  handleFileInput(files: FileList): void {
    this.uploaded.emit(files);
  }

  toggleHover(event: boolean): void {
    this.isHovering = event;
  }

  onDrop(files: FileList): void {
    this.uploaded.emit(files);
  }

}
