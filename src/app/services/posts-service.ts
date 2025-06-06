import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DOCUMENT, Inject, Injectable} from '@angular/core';
import {Post} from '../interfaces/post';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  token = '';
  localStorage: Storage | null = null;

  private followingPostsUrl = "http://127.0.0.1:8082/posts/following";
  constructor(private http: HttpClient,
              @Inject(DOCUMENT) private document: Document,) {
    const localStorage = this.document.defaultView?.localStorage;
    this.localStorage = localStorage || null;
    this.token = localStorage ? localStorage.getItem('token') || '' : '';
    console.log("Token from localStorage:", this.token);
  }

  getFollowingPosts(): Observable<any> {
    this.token = localStorage ? localStorage.getItem('token') || '' : '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    console.log("rjfdj: "+this.token)
    try {
      return this.http.get(this.followingPostsUrl, {headers, withCredentials: true});
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  }

}
