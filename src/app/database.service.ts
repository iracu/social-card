import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataBaseService {
    constructor( private http: HttpClient ) {}

    getPostData() {
        return this.http.get( 'http://localhost:3333/post' );
    }

    getCommentData() {
        return this.http.get( 'http://localhost:3333/comment' );
    }

    addComment( content: string ) {
        const data = {
            author: 'Jon Don',
            avatar: 'https://cdn0.iconfinder.com/data/icons/iconshock_guys/512/andrew.png',
            content: content
        };
        return this.http.post( 'http://localhost:3333/comment', data );
    }

    changeLikeCount( post: any, likes: number ) {
        post.likeCount = likes;
        return this.http.put( `http://localhost:3333/post/${post.id}`, post );
    }
}
