import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Chat } from './../../models/chat.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from "../base/base.service";
import * as firebase from 'firebase/app';


@Injectable()
export class ChatService extends BaseService {

  chats: FirebaseListObservable<Chat[]>;

  constructor(public http: HttpClient,public af: AngularFireDatabase,public fireAuth:AngularFireAuth) {
    super();
    this.setChats();
  }

  private setChats():void {
    this.fireAuth.authState
    .subscribe((authState:firebase.User )=>{
      if(authState){
        this.chats = <FirebaseListObservable<Chat[]>> this.af.list(`/chats/${authState.uid}`,{
          query:{
            orderByChild: 'timestamp'
          }
        }).map((chats:Chat[])=>{
          return chats.reverse();
        }).catch(this.handleObservableError);
      }
    });
  }

  create(chat: Chat,userId1:string,userId2:string): firebase.Promise<void> {
    return this.af.object(`/chats/${userId1}/${userId2}`)
    .set(chat)
    .catch(this.handlePromiseError);
  }

  getDeepChat(userId1:string,userId2:string) : FirebaseObjectObservable<Chat> {
     return <FirebaseObjectObservable<Chat>> this.af.object(`/chats/${userId1}/${userId2}`)
     .catch(this.handlePromiseError);
  }

  updatePhoto(chat: FirebaseObjectObservable<Chat>,chatPhoto: string,recipientUserPhoto: string) : firebase.Promise<boolean>{
    if(chatPhoto != recipientUserPhoto){
      return chat.update({
        photo: recipientUserPhoto
      })
      .then(() =>{
        return true;
      }).catch(this.handlePromiseError);
    }
    return Promise.resolve(false);
  }

}
