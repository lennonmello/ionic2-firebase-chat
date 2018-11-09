import { Message } from './../../models/message.model';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from "../base/base.service";


/*
  Generated class for the MessageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MessageService extends BaseService {

  constructor(public http: HttpClient,public fireDataBase:AngularFireDatabase) {
    super();
  }

  getMessages(userId1:string,userId2:string): FirebaseListObservable<Message[]>{
    return <FirebaseListObservable<Message[]>> this.fireDataBase.list(`/messages/${userId1}-${userId2}`,{
      query:{
        orderByChild: 'timeStamp',
        limitToLast: 30
      }
    }).catch(this.handleObservableError);
  }

  create(message:Message,listMessages:FirebaseListObservable<Message[]>) : firebase.Promise<void> {
    return listMessages.push(message)
    .catch(this.handlePromiseError)
  }

}
