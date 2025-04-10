import { IPost } from "./post.model";

export class PostService {
    private _posts: IPost[] = []

    getPosts() {
        return this._posts;
    }

    createPost(post: IPost) {
        this._posts.push(post);
        return post;
    }

    getPostById(id: string) {
        return this._posts.find(p => p.id === id);
    }

    deletePostById(id: string) {
        this._posts = this._posts.filter(p => p.id !== id);
    }

    updatePostById(id: string, post: IPost) {
        this._posts = this._posts.map(p => p.id === id ? post : p);
        return post;
    }
}