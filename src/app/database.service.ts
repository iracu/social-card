import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataBaseService {

    // Injection HttpClient
    constructor( private http: HttpClient ) {}

    // Get post data use http get method
    getPostData() {
        return this.http.get( 'http://localhost:3333/post' );
    }

    // Get comment data use http get method
    getCommentData() {
        return this.http.get( 'http://localhost:3333/comment' );
    }

    // Add new comment use http post method
    addComment( author: string, content: string ) {
        const data = {
            author: author,
            avatar: 'https://cdn0.iconfinder.com/data/icons/iconshock_guys/512/andrew.png',
            content: content
        };
        return this.http.post( 'http://localhost:3333/comment', data );
    }

    // Update new comment use http put method
    changeLikeCount( post: any, likes: number ) {
        post.likeValue = likes;
        return this.http.put( `http://localhost:3333/post/${post.id}`, post );
    }
}
