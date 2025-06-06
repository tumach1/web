import { Component } from '@angular/core';
import {CommonModule, DatePipe, NgIf} from '@angular/common';
import { Post } from '../../interfaces/post';
import { Media } from '../../interfaces/media';
import { PostsService } from '../../services/posts-service';
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

  constructor(
    private postsService: PostsService
  ) {}

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts() {
    this.postsService.getFollowingPosts().subscribe(post => {
      this.posts.push(post);
    });
    console.log(this.posts);
  }

  searchUsers() {
    alert('Szukaj użytkownika: ' + this.searchQuery);
  }


}
