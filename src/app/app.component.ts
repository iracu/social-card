import { Component, OnInit } from '@angular/core';
import { DataBaseService } from './database.service';
import { Response } from '@angular/http';
import { NgForm } from '@angular/forms';

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
  likeCounts = 0;
  postData;
  commentData;

  // Injection data base serive
  constructor( private dataBase: DataBaseService) {}

  ngOnInit() {
      // Get post data on app init
      this.dataBase.getPostData()
          .subscribe((response: Response) => {
              this.postData = response;
              this.likeCounts = response[0].likeValue;
          });
      // Get comment data on app init
      this.dataBase.getCommentData()
          .subscribe((response: Response) => {
              this.commentData = response;
          });
  }

  // Add new comment method
  addNewComment( commentForm: NgForm ) {
      this.dataBase.addComment( commentForm.value.commentAuthor, commentForm.value.commentContent )
          .subscribe( ( comment ) => {
              this.commentData.push(comment);
              commentForm.reset();
          });
  }

  // Set like count in post data
  setLikeCount( post, likeCount ) {
      this.like = !this.like;
      this.dataBase.changeLikeCount( post, likeCount )
          .subscribe( (data) => {
              this.likeCounts = data.likeValue;
          });
  }

}
