"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController = require('./../controllers/userController');
router
    .post('/users', userController.createUser); // Create a new user
router
    .route('/users/:userId')
    .get(userController.getUser) // Get a user by ID
    .patch(userController.updateUser) // Update a user by ID
    .delete(userController.deleteUser); // Delete a user by ID
module.exports = router;
