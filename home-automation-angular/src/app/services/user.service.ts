import User from '../models/user.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';


//RxJS operator for mapping the observable
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  api_url = 'http://localhost:3000';
  userUrl = `${this.api_url}/api/users`;

  constructor(
    private http: HttpClient
  ) { }


  //Create user, takes a user Object
  createUser(user: User): Observable<any>{
    //returns the observable of http post request 
    return this.http.post(`${this.userUrl}`, user);
  }

  //Read todo, takes no arguments
  getUsers(): Observable<User[]>{
    return this.http.get(this.userUrl)
    .map(res  => {
      //Maps the response object sent from the server
        
      return res["data"].docs as User[];
    })
  }
  //Update todo, takes a ToDo Object as parameter
  editUser(user:User){
    let editUrl = `${this.userUrl}`
    //returns the observable of http put request 
    return this.http.put(editUrl, user);
  }

  deleteUser(id:string):any{
    //Delete the object by the id
    let deleteUrl = `${this.userUrl}/${id}`
    return this.http.delete(deleteUrl)
    .map(res  => {
      return res;
    })
  }

  //Default Error handling method.
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}