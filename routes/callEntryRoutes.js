import express from 'express';
import {
  getCallEntries,
  postCallEntries,
} from '../controllers/callEntryController.js';
import { getStats } from '../controllers/stats.js';

const router = express.Router({});

router.route('/callentries').get(getCallEntries).post(postCallEntries);
router.route('/stats').get(getStats);
export default router;
