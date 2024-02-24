import express from 'express';
import { getCallEntries, postCallEntries } from '../controllers/callEntryController.js';

const router = express.Router({});

router.route('/callentries').get(getCallEntries)
                            .post(postCallEntries);

export default router;  