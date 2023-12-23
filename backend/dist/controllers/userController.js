var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const User = require('./../models/userModel');
exports.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        // Check if user with email exists
        const existingUser = yield User.findOne({ email });
        if (existingUser) {
            res.status(200).json({
                status: 'success',
                data: {
                    user: existingUser,
                },
            });
        }
        else {
            const newUser = yield User.create(req.body);
            res.status(201).json({
                status: 'success',
                data: {
                    user: newUser,
                },
            });
        }
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
});
exports.getUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const user = yield User.findById(userId);
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found',
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                user,
            },
        });
    }
    catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
});
exports.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const updatedUser = yield User.findByIdAndUpdate(userId, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedUser) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found',
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                user: updatedUser,
            },
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid data sent!',
        });
    }
});
exports.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const deletedUser = yield User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found',
            });
        }
        res.status(204).json({
            status: 'success',
            data: null,
        });
    }
    catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
});
