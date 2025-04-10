import express from 'express';
import { PostsController } from './posts/posts.controller';
import { ConfigService } from './common/config.service';
import { LoggerService } from './common/logger.service';
import { UsersController } from './users/users.controller';

async function startApp() {
    const app = express();
    const loggerService = new LoggerService();
    const configService = new ConfigService(loggerService);
    const postsController = new PostsController(loggerService, configService);
    const usersController = new UsersController(loggerService, configService);
    app.use(express.json());
    app.use('/posts', postsController.router);
    app.use('/users', usersController.router);
    const PORT = configService.get('PORT');
    app.listen(PORT, () => loggerService.infoLog(`Сервер запущен на порту ${PORT}`));
}

startApp();

