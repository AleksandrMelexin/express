import { Request, Router, Response } from "express";
import { IUser, User } from "./user.model";
import { useValidateMiddleware } from "../middlewares/validate.middleware";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { v4 as uuid } from "uuid";
import { UserService } from "./users.service";
import { ConfigService } from "../common/config.service";
import { LoggerService } from "../common/logger.service";

export class UsersController {
    private _router: Router;
    private _usersService: UserService;
    private _configService: ConfigService;
    private _loggerService: LoggerService

    constructor(loggerService: LoggerService, configService: ConfigService) {
        this._router = Router();
        this._usersService = new UserService();
        this._configService = configService;
        this.bindRoutes();
    }

    bindRoutes() {
        this._router.get('/', this.getUsers.bind(this));
        this._router.post('/create', useValidateMiddleware(CreateUserDto), this.createUser.bind(this));
        this._router.get('/:id', this.getUserById.bind(this));
        this._router.put('/update/:id', useValidateMiddleware(UpdateUserDto), this.updateUserById.bind(this));
        this._router.delete('/delete/:id', this.deleteUserById.bind(this));
    }

    get router() {
        return this._router;
    }

    async getUsers (req: Request, res: Response) {
        const users = this._usersService.getUsers();
        res.json(users);
    }

    async createUser (req: Request<{},{},CreateUserDto>, res: Response) {
        const user = this._usersService.createUser(new User(uuid()+this._configService.get('USERS_SALT'), req.body.login, req.body.password, req.body.email, req.body.phone, req.body.age));
        res.status(201).json(user);
    }

    async getUserById (req: Request, res: Response) {
        const user = this._usersService.getUserById(req.params.id);
        res.json(user);
    }

    async deleteUserById (req: Request, res: Response) {
        this._usersService.deleteUserById(req.params.id);
        res.sendStatus(200);
    }

    async updateUserById (req: Request, res: Response) {
        const user = this._usersService.updateUserById(req.params.id, new User(req.params.id, req.body.login, req.body.password, req.body.email, req.body.phone, req.body.age));
        res.json(user);
    }
}
