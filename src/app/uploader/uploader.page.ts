import { Component, OnInit, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import uploadcareApi from './uploadcare';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase/app';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.page.html',
  styleUrls: ['./uploader.page.scss'],
})
export class UploaderPage implements OnInit {

  constructor(
    public http: HttpClient,
    public afStore: AngularFirestore,
    public user: UserService,
  ) { }

  uploadedImage: string;
  imageDescription: string;

  ngOnInit() {
  }

  fileChanged(event) {
    const files = event.target.files;
    if (files[0] === null) {
      return
    }

    //uploadcare requires information when uploading: your key, whether to store it, and the file, 
    //https://uploadcare.com/docs/api_reference/upload/request_based/
    const data = new FormData();
    data.append('UPLOADCARE_PUB_KEY', uploadcareApi);
    data.append('UPLOADCARE_STORE', '1');
    data.append('file', files[0]);


    this.http.post('https://upload.uploadcare.com/base/', data)
      .subscribe(event => {
        //compiler doesn't like event.file, so we set a new var with type any as a workaround 
        let imgSource: any = event;
        this.uploadedImage = imgSource.file
        console.log(this.uploadedImage)
      })
  }

  createPost() {
    const uploadedImage = this.uploadedImage;
    const imageDescription = this.imageDescription;

    //do update cause if post it would delete old info with new info, we just want to add/update current info
    this.afStore.doc(`users/${this.user.getUID()}`).update({
      posts: firestore.FieldValue.arrayUnion({
        uploadedImage,
        imageDescription
      })
    })
  }

}
