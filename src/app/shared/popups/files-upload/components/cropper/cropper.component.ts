import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ImageCroppedEvent} from "ngx-image-cropper";
import {dataURLtoFile} from "@app/shared/popups/files-upload/utils";

@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.scss']
})
export class CropperComponent implements OnInit {

  @Input() imageFile: File;
  @Output() changed= new EventEmitter<File>();

  croppedImage: string;
  constructor() { }

  ngOnInit(): void {
  }

  onCrop(): void{
    const file = dataURLtoFile(this.croppedImage, this.imageFile.name);
    this.changed.emit(file);
  }

  imageCropped(event: ImageCroppedEvent){
    this.croppedImage = event.base64;
  }


}
