import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {User} from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userMeUrl = "http://127.0.0.1:8082/users/me";
  private userByUsernameUrl = "http://127.0.0.1:8082/users/username/";
  private searchUserUrl = "http://127.0.0.1:8082/users/search/";

  constructor(private  http: HttpClient) {

  }

  getUserMe(): Observable<User> {
    try {
      return this.http.get<User>(this.userMeUrl, {withCredentials: true});
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  }

  getUserByUsername(username: string): Observable<User> {
    try {
      return this.http.get<User>(`${this.userByUsernameUrl}${username}`, {withCredentials: true});
    } catch (error) {
      console.error("Error fetching user by username:", error);
      throw error;

    }
  }

  searchUsers(query: string): Observable<User[]> {
    try {
      return this.http.get<User[]>(`${this.searchUserUrl}${query}`, {withCredentials: true});
    } catch (error) {
      console.error("Error searching users:", error);
      throw error;
    }
  }

}
