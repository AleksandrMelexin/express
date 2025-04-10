import { Request, Router, Response } from "express";
import { IPost, Post } from "./post.model";
import { useValidateMiddleware } from "../middlewares/validate.middleware";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { v4 as uuid } from "uuid";
import { PostService } from "./posts.service";
import { ConfigService } from "../common/config.service";
import { LoggerService } from "../common/logger.service";

export class PostsController {
    private _router: Router;
    private _postsService: PostService;
    private _configService: ConfigService;
    private _loggerService: LoggerService

    constructor(loggerService: LoggerService, configService: ConfigService) {
        this._router = Router();
        this._postsService = new PostService();
        this._configService = configService;
        this.bindRoutes();
    }

    bindRoutes() {
        this._router.get('/', this.getPosts.bind(this));
        this._router.post('/create', useValidateMiddleware(CreatePostDto), this.createPost.bind(this));
        this._router.get('/:id', this.getPostById.bind(this));
        this._router.put('/update/:id', useValidateMiddleware(UpdatePostDto), this.updatePostById.bind(this));
        this._router.delete('/delete/:id', this.deletePostById.bind(this));
    }

    get router() {
        return this._router;
    }

    async getPosts (req: Request, res: Response) {
        const posts = this._postsService.getPosts();
        res.json(posts);
    }

    async createPost (req: Request<{},{},CreatePostDto>, res: Response) {
        const post = this._postsService.createPost(new Post(uuid()+this._configService.get('POSTS_SALT'), req.body.author, req.body.title, req.body.text));
        res.status(201).json(post);
    }

    async getPostById (req: Request, res: Response) {
        const post = this._postsService.getPostById(req.params.id);
        res.json(post);
    }

    async deletePostById (req: Request, res: Response) {
        this._postsService.deletePostById(req.params.id);
        res.sendStatus(200);
    }

    async updatePostById (req: Request, res: Response) {
        const post = this._postsService.updatePostById(req.params.id, new Post(req.params.id, req.body.author, req.body.title, req.body.text));
        res.json(post);
    }
}
