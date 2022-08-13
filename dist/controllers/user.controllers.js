"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleUser = exports.deleteUser = exports.updateUser = exports.getUsets = exports.createUser = void 0;
const User_1 = require("../entities/User");
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { firstName, lastName } = req.body;
            const user = new User_1.User();
            user.firstName = firstName;
            user.lastName = lastName;
            yield user.save();
            console.log(user);
            return res.json(user);
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ message: error.message });
            }
        }
    });
}
exports.createUser = createUser;
function getUsets(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield User_1.User.find();
            return res.json(users);
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({
                    message: error.message,
                });
            }
        }
    });
}
exports.getUsets = getUsets;
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = +req.params.id;
            const { firstName, lastName, active } = req.body;
            const user = yield User_1.User.findOneBy({ id: id });
            if (!user) {
                return res.status(404).json({
                    message: `The user with id '${id}' does not exist.`,
                });
            }
            // user.firstName = firstName;
            // user.lastName = lastName;
            // user.save();
            yield User_1.User.update({ id }, {
                firstName,
                lastName,
                active,
            });
            return res.sendStatus(204);
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({
                    message: error.message,
                });
            }
        }
    });
}
exports.updateUser = updateUser;
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = +req.params.id;
            const result = yield User_1.User.delete({ id });
            if (result.affected == 0) {
                return res.status(404).json({
                    message: 'User not found',
                });
            }
            return res.sendStatus(204);
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({
                    message: error.message,
                });
            }
        }
    });
}
exports.deleteUser = deleteUser;
function getSingleUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = +req.params.id;
            const user = yield User_1.User.findOneBy({ id });
            if (!user) {
                return res.status(404).json({
                    message: 'User does not exist',
                });
            }
            return res.status(200).json(user);
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({
                    message: error.message,
                });
            }
        }
    });
}
exports.getSingleUser = getSingleUser;
