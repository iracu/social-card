import {Component, OnInit} from '@angular/core';
import { DataBaseService } from './database.service';
import { Response } from '@angular/http';

interface PostData {
  id: number;
  author: string;
  avatar: string;
  title: string;
  likeCount: number;
  content: string;
  thumbnail: string;
}

interface CommentData {
  id: number;
  author: string;
  avatar: string;
  content: string;
}

@Component({
  selector: 'sc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  readMore = false;
  comment = false;
  like = false;
  optionBox = false;
  postLink = window.location.href;
  likeCount: number;
  postData: PostData[] = [];
  commentData: CommentData[] = [];
  newComment: string = '';

  constructor( private dataBase: DataBaseService) {}

  ngOnInit() {
      this.dataBase.getPostData()
          .subscribe((response: Response) => {
            this.postData = response;
            this.likeCount = response[0].likeCount;
          });
      this.dataBase.getCommentData()
          .subscribe((response: Response) => {
            this.commentData = response;
          });
  }

  commentChange() {
    this.comment = !this.comment;
  }

  readMoreChange() {
    this.readMore = !this.readMore;
  }

  optionBoxChange() {
    this.optionBox = !this.optionBox;
  }

  addNewComment() {
    this.dataBase.addComment( this.newComment )
        .subscribe((comment: CommentData) => {
          this.commentData.push(comment);
        });
    this.carName = '';
  }

  setLikeCount( post, likeCount ) {
    this.like = !this.like;
    this.dataBase.changeLikeCount( post, likeCount )
        .subscribe( (data) => {
          this.likeCount = data.likeCount;
        });
  }

}
