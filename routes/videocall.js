import express from 'express';
import {videolink} from '../controllers/videocall.js';

const router = express.Router();

router.get('/', videolink);

export default router;