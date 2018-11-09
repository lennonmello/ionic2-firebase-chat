import { AngularFireAuth } from 'angularfire2/auth';
import { User } from './../../models/user.model';
import { AngularFireDatabase,FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from "rxjs/Observable";
import * as firebase from 'firebase/app';
import { BaseService } from "../base/base.service";
import 'rxjs/add/operator/map';


@Injectable()
export class UserService extends BaseService {

  users: FirebaseListObservable<User[]>;
  currentUser: FirebaseObjectObservable<User>;

  constructor(public af: AngularFireDatabase,
              public http: HttpClient,
              public afAuth:AngularFireAuth,
              @Inject(FirebaseApp) public firebaseApp: any) {
    super();
    //this.users = this.af.list(`/users`);
    this.listenAuthState();
  }

  private listenAuthState(): void{
    this.afAuth.authState.subscribe((authState)=>{
      if(authState){
        this.currentUser = this.af.object(`/users/${authState.uid}`);
        this.setUsers(authState.uid)
      }
    })
  }

  create(user:User, uid:string): firebase.Promise<void>{
 //   let userSalvo = this.users.push(user);
 //   let promiseUser = Promise.resolve(userSalvo)
 //   return promiseUser;

    return this.af.object(`/users/${uid}`)
    .set(user)
    .catch(this.handlePromiseError);
  }

  userExists(username:string): Observable<boolean>{
     return this.af.list(`/users`,{
       query:{
         orderByChild: 'username',
         equalTo: username
       }
     }).map((users: User[])=>{
       return users.length > 0;
     }).catch(this.handleObservableError);
    
  }

  private setUsers(uidToExclude:string){
    this.users = <FirebaseListObservable<User[]>> this.af.list(`/users`,{
      query:{
        orderByChild: 'name'
      }
    }).map((users: User[])=>{
      return users.filter((user:User)=> user.$key !== uidToExclude)
    });
  }

  getUser(userId: string) : FirebaseObjectObservable<User>{
    return <FirebaseObjectObservable<User>> this.af.object(`/users/${userId}`)
    .catch(this.handleObservableError);
  }

  edit(user: {name:string, username:string, photo:string}) : firebase.Promise<void>{
    return this.currentUser
    .update(user)
    .catch(this.handlePromiseError);
  }

  uploadPhoto(file:File,userId:string): firebase.storage.UploadTask{
    return this.firebaseApp
    .storage()
    .ref()
    .child(`/users/${userId}`)
    .put(file);
  }

}
