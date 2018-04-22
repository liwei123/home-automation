import { Response } from '@angular/http';
import { UserService } from './services/user.service';
import User from './models/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app';

  constructor(
    //Private todoservice will be injected into the component by Angular Dependency Injector
    private userService: UserService
  ) { }

  //Declaring the new todo Object and initilizing it
  public newUser: User = new User()

  //An Empty list for the visible users list
  usersList: User[];
  editUsers: User[] = [];

  ngOnInit(): void {

    //At component initialization the 
    this.userService.getUsers()
      .subscribe(users => {
        //assign the todolist property to the proper http response
        this.usersList = users
        console.log(users)
      })
  }

  create() {
    this.userService.createUser(this.newUser)
      .subscribe((res) => {
        this.usersList.push(res.data)
        this.newUser = new User()
      })
  }

  editUser(user: User) {
    console.log(user)
    if(this.usersList.includes(user)){
      if(!this.editUsers.includes(user)){
        this.editUsers.push(user)
      }else{
        this.editUsers.splice(this.editUsers.indexOf(user), 1)
        this.userService.editUser(user).subscribe(res => {
          console.log('Update Succesful')
        }, err => {
          this.editUser(user)
          console.error('Update Unsuccesful')
        })
      }
    }
  }

  deleteUser(user: User) {
  	console.log("index is " + this.usersList.indexOf(user));	
    this.userService.deleteUser(user._id).subscribe(res => {	
      this.usersList.splice(this.usersList.indexOf(user), 1);
    })
  }

  submitTodo(event, user:User){
    if(event.keyCode ==13){
      this.editUser(user)
    }
  }
}
