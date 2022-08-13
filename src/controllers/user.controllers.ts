import { Request, Response } from 'express';
import { User } from '../entities/User';

async function createUser(req: Request, res: Response) {
    try {
        const { firstName, lastName } = req.body;

        const user = new User();
        user.firstName = firstName;
        user.lastName = lastName;

        await user.save();

        console.log(user);

        return res.json(user);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

async function getUsets(req: Request, res: Response) {
    try {
        const users = await User.find();

        return res.json(users);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    }
}

async function updateUser(req: Request, res: Response) {
    try {
        const id = +req.params.id;
        const { firstName, lastName, active } = req.body;

        const user = await User.findOneBy({ id: id });

        if (!user) {
            return res.status(404).json({
                message: `The user with id '${id}' does not exist.`,
            });
        }

        // user.firstName = firstName;
        // user.lastName = lastName;

        // user.save();

        await User.update(
            { id },
            {
                firstName,
                lastName,
                active,
            }
        );

        return res.sendStatus(204);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    }
}

async function deleteUser(req: Request, res: Response) {
    try {
        const id = +req.params.id;

        const result = await User.delete({ id });

        if (result.affected == 0) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        return res.sendStatus(204);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    }
}

async function getSingleUser(req: Request, res: Response) {
    try {
        const id = +req.params.id;
        const user = await User.findOneBy({ id });

        if (!user) {
            return res.status(404).json({
                message: 'User does not exist',
            });
        }

        return res.status(200).json(user);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    }
}

export { createUser, getUsets, updateUser, deleteUser, getSingleUser };
