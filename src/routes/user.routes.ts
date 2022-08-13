import { request, Router } from 'express';

import {
    createUser,
    deleteUser,
    getSingleUser,
    getUsets,
    updateUser,
} from '../controllers/user.controllers';

const router = Router();

router.get('/users/:id', getSingleUser);
router.get('/users', getUsets);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
