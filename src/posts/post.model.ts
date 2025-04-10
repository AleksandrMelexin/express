export interface IPost {
    id: string;
    author: string;
    title: string;
    text: string;
}

export class Post implements IPost {
    id: string;
    author: string;
    title: string;
    text: string;

    constructor(id: string, author: string, title: string, text: string,) {
        this.id = id;
        this.author = author;
        this.title = title;
        this.text = text;
    }
}