import { Router } from "express";

import * as userController from "./controller/user.js";
import * as notepadController from "./controller/notepad.js";

import refreshAccessToken from "./middleware/refreshAccessToken.js";
import isAuttenticate from "./middleware/isAuttenticate.js";

const router = Router();

router.post("/refresh-token", isAuttenticate, refreshAccessToken);
router.post("/register", userController.create);
router.post("/login", userController.login);

router
    .route("/user/me")
    .get(isAuttenticate, userController.get)
    .patch(isAuttenticate, userController.update);

router
    .route("user/me/notepad")
    .post(isAuttenticate, notepadController.create)
    .get(isAuttenticate, notepadController.get);

router
    .route("/user/me/notepad/:id")
    .patch(isAuttenticate, notepadController.update)
    .delete(isAuttenticate, notepadController.del);

export default router;
