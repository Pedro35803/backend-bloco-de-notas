import { Router } from "express";

import * as userController from "./controller/user.js";
import * as notepadController from "./controller/notepad.js";

import refreshAccessToken from "./middleware/refreshAccessToken.js";
import isAuttenticate from "./middleware/isAuttenticate.js";
import login from "./middleware/login.js";

const router = Router();

router.post("/refresh-token", refreshAccessToken);
router.post("/register", userController.create);
router.post("/login", login);

router
    .route("/user/me")
    .get(isAuttenticate, userController.get)
    .patch(isAuttenticate, userController.update);

router
    .route("/user/me/notepads")
    .post(isAuttenticate, notepadController.create)
    .get(isAuttenticate, notepadController.getByUser);

router
    .route("/user/me/notepads/:id")
    .get(isAuttenticate, notepadController.get)
    .patch(isAuttenticate, notepadController.update)
    .delete(isAuttenticate, notepadController.del);

export default router;
