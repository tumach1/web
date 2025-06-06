import { Component } from '@angular/core';
import {CommonModule, DatePipe, NgIf} from '@angular/common';
import { Post } from '../../interfaces/post';
import { Media } from '../../interfaces/media';
import { User } from '../../interfaces/user';
import { PostsService } from '../../services/posts-service';
import {UserService } from '../../services/user-service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [
    DatePipe,
    FormsModule,
    NgIf,
    CommonModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  posts: Post[] = [];
  mediaMap: { [postId: string]: Media[] } = {};
  searchQuery = '';
  foundUsers: User[] = [];

  constructor(
    private postsService: PostsService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts() {
      this.postsService.getFollowingPosts().subscribe({
      next: (data: Post[]) => {
        this.posts = data;

        for (const post of this.posts) {

        }
      },
      error: (error) => {
        console.error("Error fetching posts:", error);
      }
    });
    }

  searchUsers() {
    if (!this.searchQuery.trim()) {
      this.foundUsers = [];
      return;
    }
    this.userService.searchUsers(this.searchQuery).subscribe(users => {
      this.foundUsers = users;
    });
  }

}
