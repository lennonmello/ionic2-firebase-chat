import { HomePage } from './../home/home';
import { AuthService } from './../../providers/auth/auth.service';
import { SignupPage } from './../signup/signup';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  signForm: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {


    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.signForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])]
    })

  }

  onSignup(): void {
    this.navCtrl.push(SignupPage);
  }

  onSubmit(): void {

    let loading: Loading = this.showLoading();

    this.authService.siginWithEmail(this.signForm.value)
      .then((isLogged: boolean) => {
        if(isLogged){
          this.navCtrl.setRoot(HomePage);
          loading.dismiss();
        }
      }).catch((error:any) =>{
        console.error(error);
        loading.dismiss();
        this.showAlert(error);
      })
  }


  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    return loading;
  }

  private showAlert(message: string): void {
    this.alertCtrl.create({
      message: message,
      buttons: ['OK']
    }).present();
  }

  onHomePage(): void {
    this.navCtrl.push(HomePage)
    .then((hasAcess: boolean) =>{
      console.log('Autorizado',hasAcess);
    }).catch(err =>{
      console.log(err);
    });
  }

  onLogout() : void{
    this.authService.logout();
  }


}
