import { UserService } from './../../providers/user/user.service';
import { User } from './../../models/user.model';
import { AuthService } from './../../providers/auth/auth.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  currentUser: User;
  canEdit: boolean = false;
  private filePhoto: File;
  uploadProgress: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authService:AuthService,
              public userService:UserService) {
  }

  ionViewDidLoad() {
    this.userService.currentUser
    .subscribe((user:User) =>{
      this.currentUser = user;
    })
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.autenticated;
  }

  onSubmit():void {
    if(this.filePhoto){
      let uploadTask = this.userService.uploadPhoto(this.filePhoto,this.currentUser.$key);
      uploadTask.on('state_changed',
      (snapshot) =>{

        this.uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

      },(error:Error) =>{
        console.log(error.message);
      },() =>{
        this.editUser(uploadTask.snapshot.downloadURL);
      })
    }else{
      this.editUser();
    }
  }

  private editUser(photoUrl?: string): void{
    this.userService.edit({
      name: this.currentUser.name,
      username: this.currentUser.username,
      photo: photoUrl || this.currentUser.photo || ''
    }).then(()=>{
      this.canEdit = false;
      this.filePhoto = undefined;
      this.uploadProgress = 0;
    });
  }

  onPhoto(event): void {
    console.log(event.target.files);
    this.filePhoto = event.target.files[0];
  }

}
