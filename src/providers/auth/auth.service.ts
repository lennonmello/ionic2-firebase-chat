import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { BaseService } from "../base/base.service";


@Injectable()
export class AuthService extends BaseService {

  constructor(public http: HttpClient,public fireAuth:AngularFireAuth) {
    super();
    console.log('Hello AuthProvider Provider');
  }

createAuthUser(user: {email: string, password: string}): firebase.Promise<firebase.User> {
    return this.fireAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
    .catch(this.handlePromiseError);
}

siginWithEmail(user: {email:string,password:string}): firebase.Promise<boolean>{
    return this.fireAuth.auth.signInWithEmailAndPassword(user.email,user.password)
    .then((algumaCoisa:Promise<any>) =>{
      return algumaCoisa != null;
    }).catch(this.handlePromiseError)
}

  logout(): firebase.Promise<any>{
    return this.fireAuth.auth.signOut();
  }

  get autenticated(): Promise<boolean>{
    return new Promise((resolve,reject)=>{
      this.fireAuth.authState
      .first()
      .subscribe((authState: firebase.User  ) =>{
        (authState) ? resolve(true) : reject(false);
      })
    })
  }


}
