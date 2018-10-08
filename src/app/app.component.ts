import {Component, OnInit} from '@angular/core';
import { DataBaseService } from './database.service';
import { Response } from '@angular/http';

@Component({
  selector: 'sc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  // Property declaration
  readMore = false;
  comment = false;
  like = false;
  optionBox = false;
  postLink = window.location.href;
  likeCount = 0;
  postData;
  commentData;
  newComment: string = '';
  commentAuthor: string = '';

  // Injection data base serive
  constructor( private dataBase: DataBaseService) {}

  ngOnInit() {
      // Get post data on app init
      this.dataBase.getPostData()
          .subscribe((response: Response) => {
              this.postData = response;
              this.likeCount = response[0].likeCount;
              console.log(response);
          });
      // Get comment data on app init
      this.dataBase.getCommentData()
          .subscribe((response: Response) => {
              this.commentData = response;
          });
  }

  // Add new comment method
  addNewComment() {
      this.dataBase.addComment( this.commentAuthor, this.newComment )
          .subscribe((comment: CommentData) => {
              this.commentData.push(comment);
          });
  }

  // Set like count in post data
  setLikeCount( post, likeCount ) {
      this.like = !this.like;
      this.dataBase.changeLikeCount( post, likeCount )
          .subscribe( (data) => {
              this.likeCount = data.likeCount;
          });
  }

}
