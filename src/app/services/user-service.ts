import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DOCUMENT, Inject, Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {User} from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userMeUrl = "http://127.0.0.1:8082/users/me";
  private userByUsernameUrl = "http://127.0.0.1:8082/users/username/";
  private searchUserUrl = "http://127.0.0.1:8082/users/search/";
  private localStorage: Storage | null = null;

  constructor(private  http: HttpClient,
              @Inject(DOCUMENT) private document: Document)
    {
      const localStorage = this.document.defaultView?.localStorage;
      this.localStorage = localStorage || null;

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
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      return this.http.get<User[]>(`${this.searchUserUrl}${query}`, {headers, withCredentials: true});
    } catch (error) {
      console.error("Error searching users:", error);
      throw error;
    }
  }

}
