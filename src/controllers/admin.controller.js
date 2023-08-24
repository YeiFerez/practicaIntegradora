import { Router } from 'express';
import passportCall from '../utils/passportCall.utils';
import authorization from './role.controller';


const router = Router();

router.get('/private', passportCall("jwt"), authorization('admin'), (req, res) => {
	res.json({ message: 'Private route' });
});

export default router;
