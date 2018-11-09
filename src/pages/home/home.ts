import { Chat } from './../../models/chat.model';
import { ChatService } from './../../providers/chat/chat.service';
import { ChatPage } from './../chat/chat';
import { AuthService } from './../../providers/auth/auth.service';
import { UserService } from './../../providers/user/user.service';
import { User } from './../../models/user.model';
import { FirebaseListObservable } from 'angularfire2/database';
import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: FirebaseListObservable<User[]>;
  view: string = 'chats';
  chats: FirebaseListObservable<Chat[]>;

  constructor(
    public navCtrl: NavController,
    public userService: UserService,
    public authService: AuthService,
    public chatService: ChatService,
    public menuCtrl:MenuController) {

  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.autenticated;
  }

  ionViewDidLoad() {
    this.chats = this.chatService.chats;
    this.users = this.userService.users;

    this.menuCtrl.enable(true,'user-menu');
  }

  onSignup(): void {
    this.navCtrl.push(SignupPage);
  }

  onChatCreate(recipientUser: User): void {

    this.userService.currentUser
      .first()
      .subscribe((currentUser: User) => {
        this.chatService.getDeepChat(currentUser.$key, recipientUser.$key)  // users/id1/id2/chat
          .first()
          .subscribe((chat: Chat) => {
            console.log(Chat, chat);

            if (chat.hasOwnProperty('$value')) {
              let timeStamp: Object = firebase.database.ServerValue.TIMESTAMP;

              let chat1 = new Chat('', timeStamp, recipientUser.name, '');
              this.chatService.create(chat1, currentUser.$key, recipientUser.$key);

              let chat2 = new Chat('', timeStamp, currentUser.name, '');
              this.chatService.create(chat2, recipientUser.$key, currentUser.$key);
            }


          });
      });

    this.navCtrl.push(ChatPage, {
      recipientUser: recipientUser
    })
  }

  onChatOpen(chat: Chat): void {
    let recipientUserId: string = chat.$key;

    this.userService.getUser(recipientUserId)
      .first()
      .subscribe((user: User) => {
        this.navCtrl.push(ChatPage, {
          recipientUser: user
        })

      })
  }

  filterItens(event: any): void{
    let searchItem: string = event.target.value;

    this.chats = this.chatService.chats;
    this.users = this.userService.users;

    if(searchItem){
      switch(this.view){

        case 'chats':
          this.chats = <FirebaseListObservable<Chat[]>> this.chats
          .map((chats: Chat[]) =>{
            return chats.filter((chat: Chat) =>{
              return (chat.title.toLowerCase().indexOf(searchItem.toLocaleLowerCase()) > -1);
            });
          });
          break;
        case 'users':
          this.users = <FirebaseListObservable<User[]>> this.users
          .map((users: User[]) =>{
            return users.filter((user: User) =>{
              return (user.name.toLowerCase().indexOf(searchItem.toLocaleLowerCase()) > -1);
            });
          });
          break;
    }

    console.log('Busca',searchItem);
  }

}
}
