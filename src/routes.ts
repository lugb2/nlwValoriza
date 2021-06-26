import { Router } from "express";

// import middlewares
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

// import controllers
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController";
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUsersController } from "./controllers/ListUsersController";

const router = Router();

// controllers
const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();
const listUserSendComplimentsController = new ListUserSendComplimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

// requisição cadastro de usuário
router.post("/users", createUserController.handle);

// consulta usuários
router.get("/users", ensureAuthenticated, listUsersController.handle);

// requisição cadastro de tag
router.post(
    "/tags",
    ensureAuthenticated,
    ensureAdmin,
    createTagController.handle
);

// consulta tags
router.get("/tags", ensureAuthenticated, listTagsController.handle);

// requisição para autenticação / login
router.post("/login", authenticateUserController.handle);

// requisição cadastro de elogio
router.post(
    "/compliments",
    ensureAuthenticated,
    createComplimentController.handle
);

// consulta de elogios enviados para o usuário
router.get("/users/compliments/receive", ensureAuthenticated, listUserReceiveComplimentsController.handle);

// consulta de elogios que o usuário enviou
router.get("/users/compliments/send", ensureAuthenticated, listUserSendComplimentsController.handle);

export { router };