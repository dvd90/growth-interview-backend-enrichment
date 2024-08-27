import express from 'express';
import { EnrichController } from '../controllers/enrich.controller';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.post('/enrich', EnrichController.create);
router.get('/enrich', EnrichController.get);
router.delete('/enrich/:companyName', EnrichController.delete);

export default router;
