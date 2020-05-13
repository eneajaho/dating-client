import { Component, EventEmitter, Output } from '@angular/core';
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent {

  @Output() uploaded = new EventEmitter<FileList>();

  uploadIcon = faCloudUploadAlt;

  isHovering: boolean;

  handleFileInput(files: FileList) {
    this.uploaded.emit(files);
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    this.uploaded.emit(files);
  }

}
